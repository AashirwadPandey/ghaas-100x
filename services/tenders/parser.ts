import { Tender, TenderDocument } from './types';
import { sleep } from '@/lib/utils';

interface RawTenderData {
  id?: string;
  title?: string;
  description?: string;
  category?: string;
  office?: string;
  budget?: string;
  deadline?: string;
  publishDate?: string;
  location?: string;
  procurementType?: string;
  documents?: TenderDocument[];
  contact?: {
    officeContact?: string;
    email?: string;
  };
  rawHtmlUrl?: string;
}

export class TenderParser {
  private rateLimitMs: number;

  constructor(private baseUrl: string, rateLimit: number) {
    this.rateLimitMs = 1000 / rateLimit;
  }

  private async waitForRateLimit() {
    await sleep(this.rateLimitMs);
  }

  private normalizeUrl(url: string): string {
    if (url.startsWith('http')) return url;
    return new URL(url, this.baseUrl).toString();
  }

  private normalizeDate(dateStr: string, defaultTime = '12:00:00'): string {
    // Handle various date formats and normalize to ISO 8601 UTC
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      // Try parsing Nepali date format or use regex
      // TODO: Implement Nepali date parsing
      throw new Error(`Invalid date format: ${dateStr}`);
    }
    return date.toISOString();
  }

  private async extractDocuments(documents: TenderDocument[]): Promise<TenderDocument[]> {
    await this.waitForRateLimit();
    return documents.map(doc => ({
      ...doc,
      url: this.normalizeUrl(doc.url)
    }));
  }

  private extractStatus(deadline: string): 'Open' | 'Closed' {
    const deadlineDate = new Date(deadline);
    return deadlineDate > new Date() ? 'Open' : 'Closed';
  }

  private generateKeyPoints(data: { deadline?: string; budget?: string }): string[] {
    const points: string[] = [];
    
    if (data.deadline) {
      points.push(`E-Bid closing: ${new Date(data.deadline).toLocaleString()}`);
    }
    
    if (data.budget) {
      points.push(`Estimated cost: ${data.budget}`);
    }
    
    points.push('Submission via e-GP required');
    
    return points.slice(0, 3); // Return max 3 points
  }

  private generateProcedureChecklist(): string[] {
    return [
      'Register on e-GP portal',
      'Download bidding doc',
      'Prepare documents',
      'Submit online before deadline'
    ];
  }

  public async parseTenderData(tenderData: any): Promise<Tender> {
    await this.waitForRateLimit();
    
    const deadline = this.normalizeDate(tenderData.deadline || '');
    const publishDate = this.normalizeDate(tenderData.publishDate || '');
    const data = { deadline, budget: tenderData.budget };
    
    const tender: Tender = {
      id: tenderData.id || `TND-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      title: tenderData.title || 'Untitled Tender',
      description: tenderData.description || 'No description available',
      category: tenderData.category || 'Infrastructure',
      office: tenderData.office || 'Unknown Office',
      budget: tenderData.budget || 'NPR 0',
      deadline,
      publishDate,
      status: this.extractStatus(deadline),
      location: tenderData.location || 'Nepal',
      procurementType: tenderData.procurementType || 'IFB',
      documents: await this.extractDocuments(tenderData.documents || []),
      contact: {
        officeContact: tenderData.contact?.officeContact || '01-xxxxxxx',
        email: tenderData.contact?.email || 'office@example.gov.np'
      },
      keyPoints: this.generateKeyPoints(data),
      requiredDocumentsChecklist: [
        'Company registration',
        'Tax clearance',
        'Bid Security (bank guarantee)',
        'Technical proposal'
      ],
      procedureChecklist: this.generateProcedureChecklist(),
      rawHtmlUrl: tenderData.rawHtmlUrl || ''
    };

    return tender;
  }
}