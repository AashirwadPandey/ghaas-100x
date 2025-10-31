export type Service = {
  id: string;
  office_id: string;
  title: string;
  description?: string;
  documents?: string[];
  fee?: number;
  estimated_time?: string;
};

export const SERVICES: Service[] = [
  { id: 's1', office_id: '1', title: 'Citizenship Application', description: 'Apply for citizenship certificate', documents: ['Photo', 'Birth certificate'], fee: 100, estimated_time: '3 days' },
  { id: 's2', office_id: '2', title: 'Birth Registration', description: 'Register birth', documents: ['Parents ID', 'Hospital letter'], fee: 50, estimated_time: '1 day' },
  { id: 's3', office_id: '3', title: 'Land Records Copy', description: 'Get land record copy', documents: ['ID', 'Plot number'], fee: 200, estimated_time: '2 days' },
  { id: 's4', office_id: '4', title: 'Tourism Permit', description: 'Obtain tourism permit', documents: ['ID', 'Travel plan'], fee: 500, estimated_time: '1 day' },
  { id: 's5', office_id: '5', title: 'Sanitation Complaint', description: 'Register sanitation issue', documents: ['Photo'], fee: 0, estimated_time: '—' },
  { id: 's6', office_id: '6', title: 'License Renewal', description: 'Renew vehicle license', documents: ['Old license', 'ID'], fee: 300, estimated_time: '1 day' },
];
