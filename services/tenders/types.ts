export interface TenderDocument {
  name: string;
  url: string;
}

export interface TenderContact {
  officeContact: string;
  email: string;
}

export interface Tender {
  id: string;
  title: string;
  category: string;
  office: string;
  budget: string;
  deadline: string;
  publishDate: string;
  status: 'Open' | 'Closed';
  location: string;
  procurementType: string;
  documents: TenderDocument[];
  contact: TenderContact;
  keyPoints: string[];
  requiredDocumentsChecklist: string[];
  procedureChecklist: string[];
  rawHtmlUrl: string;
  description: string;
}

export interface TenderListResponse {
  tenders: Tender[];
  meta: {
    count: number;
    since?: string;
  };
}

export interface TenderSyncResponse {
  message: string;
  jobId: string;
}

export interface TenderSyncStatus {
  lastSync: string;
  new: number;
  updated: number;
  failed: number;
}

export interface TenderSyncConfig {
  baseUrl: string;
  syncIntervalMinutes: number;
  rateLimitRps: number;
  storagePath?: string;
  s3Bucket?: string;
  adminSyncSecret?: string;
}