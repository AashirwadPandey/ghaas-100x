import { Tender } from './types';

export const SAMPLE_TENDERS: Tender[] = [
  {
    id: 'TND-2025-001',
    title: 'Construction of Local Community Center',
    description: 'Development of a multi-purpose community center with modern facilities including meeting halls, training rooms, and recreational spaces.',
    category: 'Infrastructure',
    office: 'Department of Urban Development',
    budget: 'NPR 50,000,000',
    deadline: '2025-12-31T12:00:00.000Z',
    publishDate: '2025-11-01T12:00:00.000Z',
    status: 'Open',
    location: 'Kathmandu',
    procurementType: 'NCB',
    documents: [
      { name: 'Bidding Document', url: '/documents/bid-doc-001.pdf' },
      { name: 'Technical Specifications', url: '/documents/tech-spec-001.pdf' }
    ],
    contact: {
      officeContact: '01-4444444',
      email: 'info@dud.gov.np'
    },
    keyPoints: [
      'E-Bid closing: Dec 31, 2025',
      'Estimated cost: NPR 50,000,000',
      'Submission via e-GP required'
    ],
    requiredDocumentsChecklist: [
      'Company registration',
      'Tax clearance',
      'Bid Security (bank guarantee)',
      'Technical proposal'
    ],
    procedureChecklist: [
      'Register on e-GP portal',
      'Download bidding doc',
      'Prepare documents',
      'Submit online before deadline'
    ],
    rawHtmlUrl: 'https://bolpatra.gov.np/egp/tender/001'
  },
  {
    id: 'TND-2025-002',
    title: 'Digital Health Records System Implementation',
    description: 'Implementation of an integrated digital health records system for public hospitals and health centers.',
    category: 'Technology',
    office: 'Ministry of Health',
    budget: 'NPR 75,000,000',
    deadline: '2025-12-15T12:00:00.000Z',
    publishDate: '2025-11-01T12:00:00.000Z',
    status: 'Open',
    location: 'All Provinces',
    procurementType: 'ICB',
    documents: [
      { name: 'RFP Document', url: '/documents/rfp-002.pdf' },
      { name: 'System Requirements', url: '/documents/sys-req-002.pdf' }
    ],
    contact: {
      officeContact: '01-5555555',
      email: 'it@mohp.gov.np'
    },
    keyPoints: [
      'E-Bid closing: Dec 15, 2025',
      'Estimated cost: NPR 75,000,000',
      'Submission via e-GP required'
    ],
    requiredDocumentsChecklist: [
      'Company registration',
      'Tax clearance',
      'Bid Security (bank guarantee)',
      'Technical proposal'
    ],
    procedureChecklist: [
      'Register on e-GP portal',
      'Download bidding doc',
      'Prepare documents',
      'Submit online before deadline'
    ],
    rawHtmlUrl: 'https://bolpatra.gov.np/egp/tender/002'
  }
];