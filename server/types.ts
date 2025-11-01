export interface Document {
  name: string;
  url: string;
}

export interface Contact {
  officeContact: string;
  email: string;
}

export interface TenderBase {
  id: string;
  title: string;
  office: string;
  publishDate: string;
  deadline: string;
  procurementType: string;
  documents: Document[];
  rawHtmlUrl: string;
}

export interface TenderDetail {
  description: string;
  budget: string;
  location: string;
  contact: Contact;
  additionalDocuments: Document[];
}

export interface Tender extends TenderBase {
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