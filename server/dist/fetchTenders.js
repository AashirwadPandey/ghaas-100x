import axios from 'axios';
import { load } from 'cheerio';
import fs from 'fs-extra';
import { join } from 'path';
const BASE_URL = 'https://bolpatra.gov.np/egp';
const SEARCH_URL = `${BASE_URL}/searchOpportunity`;
const OUTPUT_FILE = join(__dirname, 'tenders.json');
// --- Helper: Fetch HTML with retry logic ---
async function fetchHTML(url, retries = 3) {
    try {
        const response = await axios.get(url, {
            timeout: 15000,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
            },
            httpsAgent: new (require('https').Agent)({
                rejectUnauthorized: false
            })
        });
        return response.data;
    }
    catch (error) {
        if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            await new Promise(resolve => setTimeout(resolve, 2000));
            return fetchHTML(url, retries - 1);
        }
        throw error;
    }
}
// --- Helper: Format date ---
function formatDate(dateStr) {
    try {
        const [day, month, year, time] = dateStr.split(/[-\s]/);
        const [hours, minutes] = (time || '00:00').split(':');
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours || '0'), parseInt(minutes || '0')).toISOString();
    }
    catch (error) {
        console.error('Error parsing date:', dateStr);
        return new Date().toISOString();
    }
}
// --- Helper: Clean text ---
function cleanText(text) {
    return text.replace(/[\n\r\t]+/g, ' ').trim();
}
// --- Parse the tender list page ---
async function parseListPage(html) {
    const $ = load(html);
    const tenders = [];
    // Find the main tender table
    const tables = $('table').filter((_, table) => {
        const headers = $(table).find('th').map((_, el) => $(el).text().trim()).get();
        return headers.some(h => h.toLowerCase().includes('ifb') ||
            h.toLowerCase().includes('bid') ||
            h.toLowerCase().includes('notice') ||
            h.toLowerCase().includes('project'));
    });
    if (tables.length === 0) {
        throw new Error('No tender tables found');
    }
    // Process each row in the first matching table
    tables.first().find('tbody tr').each((_, tr) => {
        const $tr = $(tr);
        const cells = $tr.find('td');
        if (cells.length >= 6) {
            const id = cleanText($(cells[0]).text());
            const title = cleanText($(cells[2]).text());
            const office = cleanText($(cells[1]).text());
            const publishDate = cleanText($(cells[3]).text());
            const deadline = cleanText($(cells[4]).text());
            const procurementType = cleanText($(cells[5]).text());
            if (id && title) {
                const documents = $tr.find('a[href*="/egp/download"]')
                    .map((_, link) => {
                    const $link = $(link);
                    const href = $link.attr('href');
                    return href ? {
                        name: cleanText($link.text()) || 'Tender Document',
                        url: new URL(href, BASE_URL).toString()
                    } : null;
                })
                    .get()
                    .filter(doc => doc !== null);
                tenders.push({
                    id,
                    title,
                    office,
                    publishDate,
                    deadline,
                    procurementType,
                    documents,
                    rawHtmlUrl: `${BASE_URL}/invitation/notice/${id}`
                });
            }
        }
    });
    return tenders;
}
// --- Parse detail page for more info ---
async function parseDetailPage(url) {
    const html = await fetchHTML(url);
    const $ = load(html);
    return {
        description: cleanText($('.tender-description, .description, .details').first().text()),
        budget: cleanText($('.estimated-cost, .budget, .cost').first().text()) || 'Contact office for details',
        location: cleanText($('.tender-location, .location').first().text()) || 'Nepal',
        contact: {
            officeContact: cleanText($('.office-contact, .contact').first().text()),
            email: cleanText($('.office-email, .email').first().text())
        },
        additionalDocuments: $('.document-list a[href*="/egp/download"], .attachments a[href*="/egp/download"]')
            .map((_, link) => {
            const $link = $(link);
            const href = $link.attr('href');
            return href ? {
                name: cleanText($link.text()) || 'Additional Document',
                url: new URL(href, BASE_URL).toString()
            } : null;
        })
            .get()
            .filter(doc => doc !== null)
    };
}
// --- Merge tenders (keep old, add new, update changed) ---
function mergeTenders(oldData, newTenders) {
    const merged = [...oldData];
    let added = 0;
    let updated = 0;
    for (const newTender of newTenders) {
        const index = merged.findIndex(t => t.id === newTender.id);
        if (index === -1) {
            merged.push(newTender);
            added++;
        }
        else {
            // Update if changed
            const oldTender = merged[index];
            if (oldTender.deadline !== newTender.deadline ||
                oldTender.budget !== newTender.budget ||
                oldTender.status !== newTender.status) {
                merged[index] = { ...oldTender, ...newTender };
                updated++;
            }
        }
    }
    return { merged, added, updated };
}
// --- Main program ---
async function main() {
    console.log('🔍 Fetching tenders from bolpatra.gov.np...');
    const html = await fetchHTML(SEARCH_URL);
    const list = await parseListPage(html);
    const output = [];
    for (const [i, tender] of list.entries()) {
        try {
            console.log(`📄 (${i + 1}/${list.length}) ${tender.title}`);
            const detail = await parseDetailPage(tender.rawHtmlUrl);
            const deadlineDate = new Date(formatDate(tender.deadline));
            const isOpen = deadlineDate > new Date();
            const obj = {
                ...tender,
                ...detail,
                deadline: formatDate(tender.deadline),
                publishDate: formatDate(tender.publishDate),
                status: isOpen ? 'Open' : 'Closed',
                documents: [...tender.documents, ...detail.additionalDocuments],
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
            output.push(obj);
        }
        catch (error) {
            console.error(`Error processing tender ${tender.id}:`, error);
        }
    }
    // Load old data (if file exists)
    let oldData = [];
    if (await fs.pathExists(OUTPUT_FILE)) {
        oldData = await fs.readJson(OUTPUT_FILE);
    }
    // Merge new tenders
    const { merged, added, updated } = mergeTenders(oldData, output);
    // Sort by publish date (newest first)
    merged.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
    // Save back to file
    await fs.writeJson(OUTPUT_FILE, merged, { spaces: 2 });
    console.log(`✅ Saved ${merged.length} tenders → ${OUTPUT_FILE} (added ${added}, updated ${updated})`);
}
main().catch(console.error);
