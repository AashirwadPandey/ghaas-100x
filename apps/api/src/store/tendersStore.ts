export type Tender = {
  id: string;
  office_id: string;
  title: string;
  description?: string;
  estimated_budget?: number;
  published_at?: string;
  deadline?: string;
};

export const TENDERS: Tender[] = [
  { id: 't1', office_id: '1', title: 'Road Repair - Ward 3', description: 'Repair 2km road section', estimated_budget: 1000000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+7*86400000).toISOString() },
  { id: 't2', office_id: '2', title: 'Street Lighting Installation', description: '50 solar street lights', estimated_budget: 500000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+10*86400000).toISOString() },
  { id: 't3', office_id: '3', title: 'Waste Collection Service', description: 'Annual collection contract', estimated_budget: 2000000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+14*86400000).toISOString() },
  { id: 't4', office_id: '4', title: 'Park Renovation', description: 'Renovate Lakeside park area', estimated_budget: 800000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+12*86400000).toISOString() },
  { id: 't5', office_id: '5', title: 'Water Pipeline Maintenance', description: 'Replace old pipes', estimated_budget: 1200000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+9*86400000).toISOString() },
  { id: 't6', office_id: '6', title: 'Primary Health Center Upgrade', description: 'Facility and equipment upgrade', estimated_budget: 1500000, published_at: new Date().toISOString(), deadline: new Date(Date.now()+15*86400000).toISOString() },
];

export const SUBSCRIPTIONS: { id: string; tender_id: string; email?: string; phone?: string; created_at: string }[] = [];
