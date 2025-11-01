import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs-extra';
import { join } from 'path';
import https from 'https';

const BASE_URL = 'https://bolpatra.gov.np/egp';
const SEARCH_URL = `${BASE_URL}/searchOpportunity`;
const OUTPUT_FILE = join(__dirname, 'tenders.json');

function cleanText(text: string): string {
  return text.replace(/[\n\r\t]+/g, ' ').trim();
}

function formatDate(dateStr: string): string {
  try {
    const [day, month, year, time] = dateStr.split(/[-\s]/);
    const [hours, minutes] = (time || '00:00').split(':');
    return new Date(
      parseInt(year), 
      parseInt(month) - 1, 
      parseInt(day), 
      parseInt(hours || '0'), 
      parseInt(minutes || '0')
    ).toISOString();
  } catch (error) {
    console.error('Error parsing date:', dateStr);
    return new Date().toISOString();
  }
}

async function fetchHTML(url: string, retries = 3): Promise<string> {
  try {
    const response = await axios.get(url, {
      timeout: 15000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${retries} attempts left)`);
      await new Promise(resolve => setTimeout(resolve, 2000));
      return fetchHTML(url, retries - 1);
    }
    throw error;
  }
}

interface Document {
  name: string;
  url: string;
}

interface Contact {
  officeContact: string;
  email: string;
}

interface TenderBase {
  id: string;
  title: string;
  office: string;
  publishDate: string;
  deadline: string;
  procurementType: string;
  documents: Document[];
  rawHtmlUrl: string;
}

interface TenderDetail {
  description: string;
  budget: string;
  location: string;
  contact: Contact;
  additionalDocuments: Document[];
}

interface Tender extends TenderBase {
  description: string;
  budget: string;
  location: string;
  status: string;
  contact: Contact;
  documents: Document[];
  keyPoints: string[];
  requiredDocumentsChecklist: string[];
  procedureChecklist: string[];
}

async function fetchTenders(): Promise<Tender[]> {
  console.log('🔍 Fetching tenders from bolpatra.gov.np...');
  const html = await fetchHTML(SEARCH_URL);
  const $ = load(html);
  const tenders: Tender[] = [];

  // Find all tables
  const tables = $('table').filter((_, table) => {
    const headers = $(table).find('th').map((_, el) => $(el).text().trim()).get();
    return headers.some(h => 
      h.toLowerCase().includes('ifb') || 
      h.toLowerCase().includes('bid') ||
      h.toLowerCase().includes('notice') ||
      h.toLowerCase().includes('project')
    );
  });

  if (tables.length === 0) {
    throw new Error('No tender tables found');
  }

  // Process each row in the first matching table
  const rows = tables.first().find('tbody tr');
  console.log(`📑 Found ${rows.length} tenders`);

  for (let i = 0; i < rows.length; i++) {
    try {
      const $tr = $(rows[i]);
      const cells = $tr.find('td');

      if (cells.length >= 6) {
        const id = cleanText($(cells[0]).text());
        const title = cleanText($(cells[2]).text());
        const office = cleanText($(cells[1]).text());
        const publishDate = cleanText($(cells[3]).text());
        const deadline = cleanText($(cells[4]).text());
        const procurementType = cleanText($(cells[5]).text());

        if (id && title) {
          const documents: Document[] = $tr.find('a[href*="/egp/download"]')
            .map((_, link) => {
              const $link = $(link);
              const href = $link.attr('href');
              return href ? {
                name: cleanText($link.text()) || 'Tender Document',
                url: new URL(href, BASE_URL).toString()
              } : null;
            })
            .get()
            .filter((doc): doc is Document => doc !== null);

          const tenderUrl = `${BASE_URL}/invitation/notice/${id}`;
          
          // Fetch and parse detail page
          console.log(`📄 (${i + 1}/${rows.length}) ${title}`);
          const detailHtml = await fetchHTML(tenderUrl);
          const $detail = load(detailHtml);

          const additionalDocs = $detail('.document-list a[href*="/egp/download"], .attachments a[href*="/egp/download"]')
            .map((_, link) => {
              const $link = $(link);
              const href = $link.attr('href');
              return href ? {
                name: cleanText($link.text()) || 'Additional Document',
                url: new URL(href, BASE_URL).toString()
              } : null;
            })
            .get()
            .filter((doc): doc is Document => doc !== null);

          const deadlineDate = new Date(formatDate(deadline));
          const isOpen = deadlineDate > new Date();

          const tender: Tender = {
            id,
            title,
            office,
            publishDate: formatDate(publishDate),
            deadline: formatDate(deadline),
            procurementType,
            documents: [...documents, ...additionalDocs],
            rawHtmlUrl: tenderUrl,
            description: cleanText($detail('.tender-description, .description, .details').first().text()),
            budget: cleanText($detail('.estimated-cost, .budget, .cost').first().text()) || 'Contact office for details',
            location: cleanText($detail('.tender-location, .location').first().text()) || 'Nepal',
            status: isOpen ? 'Open' : 'Closed',
            contact: {
              officeContact: cleanText($detail('.office-contact, .contact').first().text()),
              email: cleanText($detail('.office-email, .email').first().text())
            },
            keyPoints: [
              `E-Bid closing: ${deadlineDate.toLocaleString()}`,
              'Submission via e-GP required',
              `Status: ${isOpen ? 'Open' : 'Closed'}`
            ],
            requiredDocumentsChecklist: [
              'Company registration',
              'Tax clearance',
              'Bid Security (bank guarantee)',
              'Technical proposal'
            ],
            procedureChecklist: [
              'Register on e-GP portal',
              'Download bidding documents',
              'Prepare documents as per requirements',
              'Submit bid online before deadline'
            ]
          };

          tenders.push(tender);
        }
      }
    } catch (error) {
      console.error(`Error processing tender at index ${i}:`, error);
    }
  }

  return tenders;
}

async function saveTenders(tenders: Tender[]): Promise<void> {
  try {
    // Load existing tenders if available
    let existingTenders: Tender[] = [];
    if (await fs.pathExists(OUTPUT_FILE)) {
      existingTenders = await fs.readJSON(OUTPUT_FILE);
    }

    // Merge existing and new tenders, handling duplicates
    const merged = [...existingTenders];
    let added = 0;
    let updated = 0;

    for (const newTender of tenders) {
      const index = merged.findIndex(t => t.id === newTender.id);

      if (index === -1) {
        merged.push(newTender);
        added++;
      } else {
        // Update if changed
        const oldTender = merged[index];
        if (
          oldTender.deadline !== newTender.deadline ||
          oldTender.budget !== newTender.budget ||
          oldTender.status !== newTender.status
        ) {
          merged[index] = { ...oldTender, ...newTender };
          updated++;
        }
      }
    }

    // Sort by publish date (newest first)
    merged.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

    // Save to file
    await fs.writeJSON(OUTPUT_FILE, merged, { spaces: 2 });
    console.log(`✅ Saved ${merged.length} tenders → ${OUTPUT_FILE} (added ${added}, updated ${updated})`);
  } catch (error) {
    console.error('Error saving tenders:', error);
    throw error;
  }
}

export async function main(): Promise<void> {
  try {
    const tenders = await fetchTenders();
    await saveTenders(tenders);
  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main().catch(error => {
    console.error('Unhandled error:', error);
    process.exit(1);
  });
}