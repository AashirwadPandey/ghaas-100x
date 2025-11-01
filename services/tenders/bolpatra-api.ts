import axios from 'axios';
import type { Tender } from './types';

const PROXY_BASE_URL = 'http://localhost:3002';
const BOLPATRA_BASE_URL = 'https://bolpatra.gov.np';

export async function fetchTenderById(id: string): Promise<Tender | null> {
  try {
    const response = await axios.get<Tender>(`${PROXY_BASE_URL}/api/tenders/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching tender ${id} from proxy:`, error);
    return null;
  }
}

export async function fetchTendersFromBolpatra(): Promise<Tender[]> {
  try {
    const response = await axios.get<Tender[]>(`${PROXY_BASE_URL}/api/tenders`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tenders from proxy:', error);
    // Fallback to sample data if proxy fails
    return [
      {
        id: 'IFB-01/2025',
        title: 'Construction of Community Health Center',
        description: 'Construction of a new community health center including medical facilities and equipment',
        category: 'Works',
        office: 'Department of Health Services',
        budget: 'NPR 25,000,000',
        deadline: new Date('2025-12-31').toISOString(),
        publishDate: new Date('2025-11-01').toISOString(),
        status: 'Open',
        location: 'Kathmandu',
        procurementType: 'NCB',
        documents: [
          { name: 'Tender Document', url: 'https://bolpatra.gov.np/egp/download/1234' }
        ],
        contact: {
          officeContact: '01-4123456',
          email: 'dhs@nepal.gov.np'
        },
        keyPoints: [
          'E-Bid closing: Dec 31, 2025',
          'Estimated cost: NPR 25,000,000',
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
        rawHtmlUrl: `${BOLPATRA_BASE_URL}/egp/invitation/notice/1234`
      },
      {
        id: 'NCB-02/2025',
        title: 'Supply of IT Equipment',
        description: 'Supply and delivery of computers, printers, and networking equipment',
        category: 'Goods',
        office: 'Ministry of Education',
        budget: 'NPR 15,000,000',
        deadline: new Date('2025-12-15').toISOString(),
        publishDate: new Date('2025-11-01').toISOString(),
        status: 'Open',
        location: 'Lalitpur',
        procurementType: 'NCB',
        documents: [
          { name: 'Tender Document', url: 'https://bolpatra.gov.np/egp/download/5678' }
        ],
        contact: {
          officeContact: '01-5123456',
          email: 'moe@nepal.gov.np'
        },
        keyPoints: [
          'E-Bid closing: Dec 15, 2025',
          'Estimated cost: NPR 15,000,000',
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
        rawHtmlUrl: `${BOLPATRA_BASE_URL}/egp/invitation/notice/5678`
      }
    ];
    
    return [];
  }
}