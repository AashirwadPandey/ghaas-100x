import { describe, expect, test } from 'vitest';
import { TenderParser } from '../parser';

const SAMPLE_TENDER_DATA = {
  title: 'Sample Tender Title',
  office: 'Sample Office',
  budget: 'NPR 1,000,000',
  location: 'Sample Location',
  publishDate: '2025-11-01',
  deadline: '2025-12-01',
  description: 'Detailed description of the tender',
  contact: {
    officeContact: '01-1234567',
    email: 'office@test.gov.np'
  },
  documents: [
    { name: 'Document 1', url: '/egp/download/doc1' },
    { name: 'Document 2', url: '/egp/download/doc2' }
  ],
  rawHtmlUrl: 'https://example.com/tender/1'
};

describe('TenderParser', () => {
  test('parses tender details from data', async () => {
    const parser = new TenderParser('https://example.com', 1);
    const tender = await parser.parseTenderData(SAMPLE_TENDER_DATA);

    expect(tender).toMatchObject({
      title: 'Sample Tender Title',
      office: 'Sample Office',
      budget: 'NPR 1,000,000',
      location: 'Sample Location',
      publishDate: '2025-11-01T12:00:00.000Z',
      deadline: '2025-12-01T12:00:00.000Z',
      description: 'Detailed description of the tender',
      contact: {
        officeContact: '01-1234567',
        email: 'office@test.gov.np'
      }
    });

    expect(tender.id).toMatch(/^TND-\d{4}-\d{3}$/);
    expect(tender.status).toBe('Open');
    expect(tender.documents).toHaveLength(2);
    expect(tender.keyPoints).toHaveLength(3);
    expect(tender.requiredDocumentsChecklist).toHaveLength(4);
    expect(tender.procedureChecklist).toHaveLength(4);
    expect(tender.rawHtmlUrl).toBe('https://example.com/tender/1');
  });
});