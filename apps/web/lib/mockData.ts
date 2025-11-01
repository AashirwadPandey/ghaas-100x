// Shared static/mock data for the hackathon prototype

export type Office = {
  id: string;
  name: string;
  address?: string;
  phone?: string;
  lat?: number;
  lng?: number;
  website?: string;
  hours?: string;
  province?: string;
  district?: string;
  ministry?: string;
  services?: string[];
};

export type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  estimatedTime: string;
  fee: string;
  requiredDocs: number;
};

export type Tender = {
  id: string;
  title: string;
  description: string;
  organization: string;
  category: string;
  budget: string;
  deadline: string;
  publishedDate: string;
  status: string;
};

// OFFICES DATA
export const MOCK_OFFICES: Office[] = [
  {
    id: "1",
    name: "Biratnagar Metropolitan Office",
    address: "Main Road, Biratnagar",
    phone: "+977-21-520000",
    lat: 26.4525,
    lng: 87.2718,
    website: "https://biratnagar.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Morang",
    ministry: "Ministry of Home Affairs",
    services: ["birth-certificate", "citizenship", "marriage-registration", "land-registration"]
  },
  {
    id: "2",
    name: "Dharan Sub-Metropolitan Office",
    address: "BP Chowk, Dharan",
    phone: "+977-25-520100",
    lat: 26.8149,
    lng: 87.2824,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Sunsari",
    ministry: "Ministry of Home Affairs",
    services: ["birth-certificate", "citizenship"]
  },
  {
    id: "3",
    name: "Itahari Sub-Metropolitan Office",
    address: "Itahari-5, Sunsari",
    phone: "+977-25-580000",
    lat: 26.6656,
    lng: 87.2795,
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Koshi",
    district: "Sunsari",
    ministry: "Ministry of Home Affairs",
    services: ["birth-certificate"]
  },
  {
    id: "7",
    name: "Kathmandu Metropolitan Office",
    address: "Bagmati Province Office, Kathmandu",
    phone: "+977-1-4200000",
    lat: 27.7172,
    lng: 85.3240,
    website: "https://kathmandu.gov.np",
    hours: "10:00 AM - 5:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Home Affairs",
    services: ["birth-certificate", "citizenship", "marriage-registration", "land-registration", "business-license"]
  },
  {
    id: "10",
    name: "Department of Passports",
    address: "Tripureshwor, Kathmandu",
    phone: "+977-1-4259760",
    lat: 27.6958,
    lng: 85.3120,
    website: "https://nepalpassport.gov.np",
    hours: "10:00 AM - 3:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Foreign Affairs",
    services: ["passport-application", "passport-renewal", "visa-recommendation"]
  },
  {
    id: "11",
    name: "Department of Transport Management",
    address: "Minbhawan, Kathmandu",
    phone: "+977-1-4782763",
    lat: 27.6993,
    lng: 85.3200,
    hours: "10:00 AM - 4:00 PM (Sun-Fri)",
    province: "Bagmati",
    district: "Kathmandu",
    ministry: "Ministry of Physical Infrastructure and Transport",
    services: ["driving-license", "vehicle-registration", "route-permit"]
  }
];

// SERVICES DATA
export const MOCK_SERVICES: Service[] = [
  {
    id: "birth-certificate",
    name: "Birth Certificate",
    description: "Official certificate of birth registration",
    category: "Vital Registration",
    estimatedTime: "3-5 days",
    fee: "NPR 100",
    requiredDocs: 4
  },
  {
    id: "citizenship",
    name: "Citizenship Certificate",
    description: "Nepali citizenship certificate for eligible citizens",
    category: "Vital Registration",
    estimatedTime: "7-14 days",
    fee: "NPR 500",
    requiredDocs: 6
  },
  {
    id: "marriage-registration",
    name: "Marriage Registration",
    description: "Official registration of marriage",
    category: "Vital Registration",
    estimatedTime: "5-7 days",
    fee: "NPR 200",
    requiredDocs: 5
  },
  {
    id: "passport-application",
    name: "Passport Application",
    description: "Apply for new Nepali passport",
    category: "Travel Documents",
    estimatedTime: "15-30 days",
    fee: "NPR 5,000",
    requiredDocs: 5
  },
  {
    id: "driving-license",
    name: "Driving License",
    description: "Apply for or renew driving license",
    category: "Transport",
    estimatedTime: "30-45 days",
    fee: "NPR 1,500",
    requiredDocs: 4
  },
  {
    id: "business-license",
    name: "Business License",
    description: "Register and license for business operation",
    category: "Business",
    estimatedTime: "7-15 days",
    fee: "NPR 2,000",
    requiredDocs: 8
  },
  {
    id: "land-registration",
    name: "Land Registration",
    description: "Register land ownership and transfers",
    category: "Property",
    estimatedTime: "15-30 days",
    fee: "Varies by value",
    requiredDocs: 10
  },
  {
    id: "passport-renewal",
    name: "Passport Renewal",
    description: "Renew existing Nepali passport",
    category: "Travel Documents",
    estimatedTime: "10-15 days",
    fee: "NPR 5,000",
    requiredDocs: 3
  },
  {
    id: "vehicle-registration",
    name: "Vehicle Registration",
    description: "Register new or transfer vehicle ownership",
    category: "Transport",
    estimatedTime: "5-7 days",
    fee: "Varies by vehicle",
    requiredDocs: 6
  },
  {
    id: "visa-recommendation",
    name: "Visa Recommendation",
    description: "Get visa recommendation letter",
    category: "Travel Documents",
    estimatedTime: "3-5 days",
    fee: "NPR 500",
    requiredDocs: 4
  },
  {
    id: "route-permit",
    name: "Route Permit",
    description: "Obtain transport route operating permit",
    category: "Transport",
    estimatedTime: "10-15 days",
    fee: "NPR 3,000",
    requiredDocs: 7
  },
  {
    id: "document-verification",
    name: "Document Verification",
    description: "Official verification of documents",
    category: "General",
    estimatedTime: "2-3 days",
    fee: "NPR 300",
    requiredDocs: 2
  }
];

// TENDERS DATA
export const MOCK_TENDERS: Tender[] = [
  {
    id: "t1",
    title: "Construction of Multi-Purpose Building",
    description: "Construction of 5-story multi-purpose administrative building with modern facilities",
    organization: "Kathmandu Metropolitan Office",
    category: "Construction",
    budget: "NPR 50,00,00,000",
    deadline: "2025-11-15",
    publishedDate: "2025-10-15",
    status: "Open"
  },
  {
    id: "t2",
    title: "IT Infrastructure Upgrade",
    description: "Complete overhaul of government IT systems including servers, networking, and security",
    organization: "Ministry of Communication",
    category: "IT & Technology",
    budget: "NPR 10,00,00,000",
    deadline: "2025-11-20",
    publishedDate: "2025-10-18",
    status: "Open"
  },
  {
    id: "t3",
    title: "Road Maintenance Services",
    description: "Annual road maintenance and repair services for municipal roads",
    organization: "Pokhara Metropolitan Office",
    category: "Infrastructure",
    budget: "NPR 8,00,00,000",
    deadline: "2025-11-10",
    publishedDate: "2025-10-12",
    status: "Open"
  },
  {
    id: "t9",
    title: "Medical Equipment Supply",
    description: "Supply of modern medical equipment for district hospitals",
    organization: "Ministry of Health",
    category: "Healthcare",
    budget: "NPR 15,00,00,000",
    deadline: "2025-12-01",
    publishedDate: "2025-10-20",
    status: "Open"
  },
  {
    id: "t14",
    title: "Solar Panel Installation",
    description: "Installation of solar panels in 50 government buildings",
    organization: "Ministry of Energy",
    category: "Energy",
    budget: "NPR 12,00,00,000",
    deadline: "2025-11-25",
    publishedDate: "2025-10-22",
    status: "Open"
  }
];
