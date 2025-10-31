export type Office = {
  id: string;
  name: string;
  phone?: string;
  address?: string;
  lat?: number;
  lng?: number;
  website?: string;
  hours?: string;
  services: string[];
};

// 12 sample offices across municipalities
export const OFFICES: Office[] = [
  { id: '1', name: 'Kathmandu Municipal Office', phone: '+977-1-1234567', address: 'Kathmandu', lat: 27.7172, lng: 85.3240, website: 'https://kathmandu.gov.np', hours: 'Sun-Fri 10:00-17:00', services: ['citizenship', 'tax'] },
  { id: '2', name: 'Lalitpur Municipal Office', phone: '+977-1-7654321', address: 'Lalitpur', lat: 27.6644, lng: 85.3188, website: 'https://lalitpurmun.gov.np', hours: 'Sun-Fri 10:00-17:00', services: ['birth-registration'] },
  { id: '3', name: 'Bhaktapur Municipal Office', phone: '+977-1-5550000', address: 'Bhaktapur', lat: 27.6710, lng: 85.4298, website: 'https://bhaktapurmun.gov.np', hours: 'Sun-Fri 10:00-17:00', services: ['land-records'] },
  { id: '4', name: 'Pokhara Metropolitan Office', phone: '+977-61-520000', address: 'Pokhara', lat: 28.2096, lng: 83.9856, website: 'https://pokharamun.gov.np', hours: 'Sun-Fri 10:00-17:00', services: ['tourism-permit'] },
  { id: '5', name: 'Biratnagar Metropolitan Office', phone: '+977-21-470000', address: 'Biratnagar', lat: 26.4535, lng: 87.2718, services: ['sanitation'] },
  { id: '6', name: 'Butwal Sub-Metropolitan Office', phone: '+977-71-540000', address: 'Butwal', lat: 27.7000, lng: 83.4500, services: ['license-renewal'] },
  { id: '7', name: 'Hetauda Sub-Metropolitan Office', phone: '+977-57-520000', address: 'Hetauda', lat: 27.4167, lng: 85.0333, services: [] },
  { id: '8', name: 'Dharan Sub-Metropolitan Office', phone: '+977-25-520000', address: 'Dharan', lat: 26.8121, lng: 87.2797, services: [] },
  { id: '9', name: 'Janakpur Sub-Metropolitan Office', phone: '+977-41-520000', address: 'Janakpur', lat: 26.7288, lng: 85.9250, services: [] },
  { id: '10', name: 'Nepalgunj Sub-Metropolitan Office', phone: '+977-81-520000', address: 'Nepalgunj', lat: 28.0500, lng: 81.6167, services: [] },
  { id: '11', name: 'Dhangadhi Sub-Metropolitan Office', phone: '+977-91-520000', address: 'Dhangadhi', lat: 28.6833, lng: 80.6000, services: [] },
  { id: '12', name: 'Itahari Sub-Metropolitan Office', phone: '+977-25-520100', address: 'Itahari', lat: 26.6667, lng: 87.2667, services: [] }
];
