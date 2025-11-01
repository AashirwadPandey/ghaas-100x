import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search, MapPin, Phone, Mail, Clock, ExternalLink, Building2, Users2, FileText } from "lucide-react";
import { DetailsDialog } from "@/components/ui/details-dialog";
import { useLanguage } from "@/context/language-context";

const translations = {
  en: {
    pageTitle: "Government Offices",
    pageDescription: "Find government offices near you",
    searchPlaceholder: "Search by office name, category, or service...",
    allOffices: "All Offices",
    municipalOffice: "Municipal Office",
    districtOffice: "District Office",
    revenueOffice: "Revenue Office",
    department: "Department",
    verified: "Verified",
    availableServices: "Available Services",
    viewOnMap: "View on Map",
    details: "Details",
    officeInformation: "Office Information",
    address: "Address",
    officeHours: "Office Hours",
    contactInformation: "Contact Information",
    downloadInformation: "Download Information",
    showing: "Showing",
    office: "office",
    offices: "offices",
    in: "in",
    matching: "matching",
    page: "Page",
    of: "of",
    previous: "Previous",
    next: "Next",
  },
  np: {
    pageTitle: "सरकारी कार्यालयहरू",
    pageDescription: "सरकारी कार्यालयहरू खोज्नुहोस्",
    searchPlaceholder: "कार्यालयको नाम, श्रेणी वा सेवा खोज्नुहोस्...",
    allOffices: "सबै कार्यालयहरू",
    municipalOffice: "नगरपालिका कार्यालय",
    districtOffice: "जिल्ला कार्यालय",
    revenueOffice: "राजस्व कार्यालय",
    department: "विभाग",
    verified: "प्रमाणित",
    availableServices: "उपलब्ध सेवाहरू",
    viewOnMap: "नक्सामा हेर्नुहोस्",
    details: "विवरणहरू",
    officeInformation: "कार्यालय जानकारी",
    address: "ठेगाना",
    officeHours: "कार्यालय समय",
    contactInformation: "सम्पर्क जानकारी",
    downloadInformation: "जानकारी डाउनलोड गर्नुहोस्",
    showing: "देखाउँदै",
    office: "कार्यालय",
    offices: "कार्यालयहरू",
    in: "मा",
    matching: "मेल खाने",
    page: "पृष्ठ",
    of: "को",
    previous: "अघिल्लो",
    next: "अर्को",
  }
};

const categoryMap = {
  "All Offices": { en: "All Offices", np: "सबै कार्यालयहरू" },
  "Municipal Office": { en: "Municipal Office", np: "नगरपालिका कार्यालय" },
  "District Office": { en: "District Office", np: "जिल्ला कार्यालय" },
  "Revenue Office": { en: "Revenue Office", np: "राजस्व कार्यालय" },
  "Department": { en: "Department", np: "विभाग" }
};

const categories = ["All Offices", "Municipal Office", "District Office", "Revenue Office", "Department"];

const mockOffices = [
  {
    id: 1,
    name: "Kathmandu Metropolitan City Office",
    nameNp: "काठमाडौं महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Bagmati Pradesh, Ward 1, Kathmandu",
    phone: "+977-1-4211444",
    email: "info@kathmandu.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Citizenship", "Tax Payment", "Building Permits"],
    verified: true,
  },
  {
    id: 2,
    name: "District Administration Office",
    nameNp: "जिल्ला प्रशासन कार्यालय",
    category: "District Office",
    address: "Kathmandu, Babarmahal",
    phone: "+977-1-4200200",
    email: "dao@kathmandu.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Passport", "Citizenship", "Document Verification"],
    verified: true,
  },
  {
    id: 3,
    name: "Land Revenue Office",
    nameNp: "मालपोत कार्यालय",
    category: "Revenue Office",
    address: "Kathmandu, Dillibazar",
    phone: "+977-1-4411234",
    email: "revenue@kathmandu.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Land Registration", "Property Tax", "Land Records"],
    verified: true,
  },
  {
    id: 4,
    name: "Department of Transport Management",
    nameNp: "यातायात व्यवस्था विभाग",
    category: "Department",
    address: "Kathmandu, Ekantakuna",
    phone: "+977-1-5111222",
    email: "info@dotm.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Driving License", "Vehicle Registration", "License Renewal"],
    verified: true,
  },
  {
    id: 5,
    name: "Lalitpur Metropolitan City Office",
    nameNp: "ललितपुर महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Lalitpur, Pulchowk",
    phone: "+977-1-5521048",
    email: "info@lalitpur.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Marriage Registration", "Business License"],
    verified: true,
  },
  {
    id: 6,
    name: "Bhaktapur Municipality Office",
    nameNp: "भक्तपुर नगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Bhaktapur, Durbar Square",
    phone: "+977-1-6610853",
    email: "info@bhaktapur.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Citizenship", "Tax Collection", "Building Permits", "Water Supply"],
    verified: true,
  },
  {
    id: 7,
    name: "Department of Passport",
    nameNp: "राहदानी विभाग",
    category: "Department",
    address: "Kathmandu, Tripureshwor",
    phone: "+977-1-4200488",
    email: "info@nepalpassport.gov.np",
    hours: "Sunday - Friday: 9:00 AM - 4:00 PM",
    services: ["Passport Application", "Passport Renewal", "Urgent Passport", "Lost Passport"],
    verified: true,
  },
  {
    id: 8,
    name: "Inland Revenue Office",
    nameNp: "आन्तरिक राजस्व कार्यालय",
    category: "Revenue Office",
    address: "Kathmandu, Lazimpat",
    phone: "+977-1-4415837",
    email: "ird@ird.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["PAN Registration", "VAT Registration", "Tax Return Filing", "Tax Clearance"],
    verified: true,
  },
  {
    id: 9,
    name: "Department of Immigration",
    nameNp: "अध्यागमन विभाग",
    category: "Department",
    address: "Kathmandu, Kalikasthan",
    phone: "+977-1-4429659",
    email: "info@immigration.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Visa Extension", "Re-entry Permit", "Residence Permit", "Travel Document"],
    verified: true,
  },
  {
    id: 10,
    name: "Pokhara Metropolitan City Office",
    nameNp: "पोखरा महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Pokhara, Kaski",
    phone: "+977-61-531188",
    email: "info@pokharamun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Local Tax", "Building Permits", "Business Registration"],
    verified: true,
  },
  {
    id: 11,
    name: "District Administration Office Lalitpur",
    nameNp: "जिल्ला प्रशासन कार्यालय ललितपुर",
    category: "District Office",
    address: "Lalitpur, Jawalakhel",
    phone: "+977-1-5547030",
    email: "dao.lalitpur@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Recommendation Letters", "Document Verification", "Citizenship", "Passport Recommendation"],
    verified: true,
  },
  {
    id: 12,
    name: "Land Revenue Office Lalitpur",
    nameNp: "मालपोत कार्यालय ललितपुर",
    category: "Revenue Office",
    address: "Lalitpur, Jawalakhel",
    phone: "+977-1-5520357",
    email: "malpot.lalitpur@gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Land Registration", "Property Valuation", "Ownership Transfer", "Land Records"],
    verified: true,
  },
  {
    id: 13,
    name: "Department of National ID and Civil Registration",
    nameNp: "राष्ट्रिय परिचयपत्र तथा जन्मदर्ता विभाग",
    category: "Department",
    address: "Kathmandu, Tripureshwor",
    phone: "+977-1-4211730",
    email: "info@donidcr.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["National ID Card", "Birth Registration", "Death Registration", "Migration Certificate"],
    verified: true,
  },
  {
    id: 14,
    name: "Biratnagar Metropolitan City Office",
    nameNp: "विराटनगर महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Biratnagar, Morang",
    phone: "+977-21-523334",
    email: "info@biratnagarmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Tax Payment", "Business License", "Ward Recommendation"],
    verified: true,
  },
  {
    id: 15,
    name: "Department of Cooperatives",
    nameNp: "सहकारी विभाग",
    category: "Department",
    address: "Kathmandu, Harihar Bhawan",
    phone: "+977-1-4211765",
    email: "info@deoc.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Cooperative Registration", "Audit Reports", "Cooperative Renewal", "Training Programs"],
    verified: true,
  },
  {
    id: 16,
    name: "District Administration Office Bhaktapur",
    nameNp: "जिल्ला प्रशासन कार्यालय भक्तपुर",
    category: "District Office",
    address: "Bhaktapur, Jagati",
    phone: "+977-1-6612745",
    email: "dao.bhaktapur@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Citizenship", "Passport Recommendation", "Document Attestation", "Character Certificate"],
    verified: true,
  },
  {
    id: 17,
    name: "Social Security Fund",
    nameNp: "सामाजिक सुरक्षा कोष",
    category: "Department",
    address: "Kathmandu, Teku",
    phone: "+977-1-5912777",
    email: "info@ssf.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["SSF Registration", "Contribution Payment", "Medical Benefits", "Pension Claims"],
    verified: true,
  },
  {
    id: 18,
    name: "Birgunj Metropolitan City Office",
    nameNp: "वीरगंज महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Birgunj, Parsa",
    phone: "+977-51-522446",
    email: "info@birgunjmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Local Tax", "Trade License"],
    verified: true,
  },
  {
    id: 19,
    name: "Department of Industry",
    nameNp: "उद्योग विभाग",
    category: "Department",
    address: "Kathmandu, Tripureshwor",
    phone: "+977-1-4261755",
    email: "info@doi.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Industry Registration", "Cottage Industry", "Export/Import License", "Renewal Services"],
    verified: true,
  },
  {
    id: 20,
    name: "Land Revenue Office Bhaktapur",
    nameNp: "मालपोत कार्यालय भक्तपुर",
    category: "Revenue Office",
    address: "Bhaktapur, Sallaghari",
    phone: "+977-1-6611801",
    email: "malpot.bhaktapur@gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Land Registration", "Property Tax", "Land Ownership", "Mutation"],
    verified: true,
  },
  {
    id: 21,
    name: "Hetauda Sub-Metropolitan City Office",
    nameNp: "हेटौंडा उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Hetauda, Makwanpur",
    phone: "+977-57-520045",
    email: "info@hetaudamun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Business Permit", "Local Tax", "Recommendation Letters"],
    verified: true,
  },
  {
    id: 22,
    name: "Department of Revenue Investigation",
    nameNp: "राजस्व अनुसन्धान विभाग",
    category: "Department",
    address: "Kathmandu, Lazimpat",
    phone: "+977-1-4416438",
    email: "info@dri.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Tax Investigation", "Revenue Audit", "Fraud Detection", "Compliance Check"],
    verified: true,
  },
  {
    id: 23,
    name: "Butwal Sub-Metropolitan City Office",
    nameNp: "बुटवल उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Butwal, Rupandehi",
    phone: "+977-71-540045",
    email: "info@butwalmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Marriage Registration", "Tax Collection"],
    verified: true,
  },
  {
    id: 24,
    name: "Department of Mines and Geology",
    nameNp: "खानी तथा भूविज्ञान विभाग",
    category: "Department",
    address: "Kathmandu, Lainchaur",
    phone: "+977-1-4411668",
    email: "info@dmg.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Mining License", "Geological Survey", "Mineral Exploration", "Research Reports"],
    verified: true,
  },
  {
    id: 25,
    name: "District Administration Office Morang",
    nameNp: "जिल्ला प्रशासन कार्यालय मोरङ",
    category: "District Office",
    address: "Biratnagar, Morang",
    phone: "+977-21-525666",
    email: "dao.morang@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Citizenship", "Recommendation Letters", "Document Verification", "Passport Recommendation"],
    verified: true,
  },
  {
    id: 26,
    name: "Dharan Sub-Metropolitan City Office",
    nameNp: "धरान उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Dharan, Sunsari",
    phone: "+977-25-520045",
    email: "info@dharanmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Business License", "Building Permits", "Ward Certificates"],
    verified: true,
  },
  {
    id: 27,
    name: "Department of Food Technology and Quality Control",
    nameNp: "खाद्य प्रविधि तथा गुण नियन्त्रण विभाग",
    category: "Department",
    address: "Kathmandu, Babarmahal",
    phone: "+977-1-4262337",
    email: "info@dftqc.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Food License", "Quality Testing", "Food Safety Certification", "Import Approval"],
    verified: true,
  },
  {
    id: 28,
    name: "Nepalgunj Sub-Metropolitan City Office",
    nameNp: "नेपालगंज उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Nepalgunj, Banke",
    phone: "+977-81-520045",
    email: "info@nepalgunjmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Local Tax", "Business Registration"],
    verified: true,
  },
  {
    id: 29,
    name: "Department of Cottage and Small Industries",
    nameNp: "घरेलु तथा साना उद्योग विभाग",
    category: "Department",
    address: "Kathmandu, Tripureshwor",
    phone: "+977-1-4261244",
    email: "info@dcsi.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Cottage Industry Registration", "Small Business Support", "Skill Training", "Subsidy Programs"],
    verified: true,
  },
  {
    id: 30,
    name: "Janakpur Sub-Metropolitan City Office",
    nameNp: "जनकपुर उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Janakpur, Dhanusha",
    phone: "+977-41-520045",
    email: "info@janakpurmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Citizenship", "Tax Payment", "Ward Services"],
    verified: true,
  },
  {
    id: 31,
    name: "Department of Electricity Development",
    nameNp: "विद्युत विकास विभाग",
    category: "Department",
    address: "Kathmandu, Khumaltar",
    phone: "+977-1-5530761",
    email: "info@doed.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Power Survey License", "Hydropower License", "Electricity Generation Permit", "Renewable Energy"],
    verified: true,
  },
  {
    id: 32,
    name: "Bharatpur Metropolitan City Office",
    nameNp: "भरतपुर महानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-590045",
    email: "info@bharatpurmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Marriage Registration", "Property Tax"],
    verified: true,
  },
  {
    id: 33,
    name: "District Administration Office Chitwan",
    nameNp: "जिल्ला प्रशासन कार्यालय चितवन",
    category: "District Office",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-590200",
    email: "dao.chitwan@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Citizenship", "Passport Recommendation", "Security Clearance", "Document Attestation"],
    verified: true,
  },
  {
    id: 34,
    name: "Department of Water Supply and Sewerage Management",
    nameNp: "खानेपानी तथा ढल निकास व्यवस्थापन विभाग",
    category: "Department",
    address: "Kathmandu, Panipokhari",
    phone: "+977-1-4416834",
    email: "info@dwssm.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Water Supply Connection", "Sewerage Services", "Project Approval", "Quality Testing"],
    verified: true,
  },
  {
    id: 35,
    name: "Dhangadhi Sub-Metropolitan City Office",
    nameNp: "धनगढी उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Dhangadhi, Kailali",
    phone: "+977-91-520045",
    email: "info@dhangadhimun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Business License", "Tax Collection", "Building Permits"],
    verified: true,
  },
  {
    id: 36,
    name: "Department of Urban Development and Building Construction",
    nameNp: "शहरी विकास तथा भवन निर्माण विभाग",
    category: "Department",
    address: "Kathmandu, Babarmahal",
    phone: "+977-1-4211945",
    email: "info@dudbc.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Building Code Approval", "Urban Planning", "Construction Permits", "Architect License"],
    verified: true,
  },
  {
    id: 37,
    name: "Land Revenue Office Morang",
    nameNp: "मालपोत कार्यालय मोरङ",
    category: "Revenue Office",
    address: "Biratnagar, Morang",
    phone: "+977-21-526789",
    email: "malpot.morang@gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Land Registration", "Property Tax", "Land Survey", "Ownership Transfer"],
    verified: true,
  },
  {
    id: 38,
    name: "Itahari Sub-Metropolitan City Office",
    nameNp: "इटहरी उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Itahari, Sunsari",
    phone: "+977-25-580045",
    email: "info@itaharimun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Local Tax", "Ward Recommendation"],
    verified: true,
  },
  {
    id: 39,
    name: "Department of Agriculture",
    nameNp: "कृषि विभाग",
    category: "Department",
    address: "Kathmandu, Harihar Bhawan",
    phone: "+977-1-4211970",
    email: "info@doanepal.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Agricultural Subsidies", "Farmer Registration", "Seed Certification", "Training Programs"],
    verified: true,
  },
  {
    id: 40,
    name: "Tulsipur Sub-Metropolitan City Office",
    nameNp: "तुलसीपुर उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Tulsipur, Dang",
    phone: "+977-82-520045",
    email: "info@tulsipurmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Business Registration", "Tax Services", "Building Permits"],
    verified: true,
  },
  {
    id: 41,
    name: "Department of Roads",
    nameNp: "सडक विभाग",
    category: "Department",
    address: "Kathmandu, Babarmahal",
    phone: "+977-1-4163326",
    email: "info@dor.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Road Construction Permits", "Contract Tenders", "Road Maintenance", "Project Approvals"],
    verified: true,
  },
  {
    id: 42,
    name: "District Administration Office Rupandehi",
    nameNp: "जिल्ला प्रशासन कार्यालय रूपन्देही",
    category: "District Office",
    address: "Butwal, Rupandehi",
    phone: "+977-71-540200",
    email: "dao.rupandehi@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Citizenship", "Document Verification", "Recommendation Letters", "Passport Services"],
    verified: true,
  },
  {
    id: 43,
    name: "Siddharthanagar Municipality Office",
    nameNp: "सिद्धार्थनगर नगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Siddharthanagar, Rupandehi",
    phone: "+977-71-560045",
    email: "info@siddharthangarmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Marriage Registration", "Tax Collection", "Business License"],
    verified: true,
  },
  {
    id: 44,
    name: "Department of Livestock Services",
    nameNp: "पशु सेवा विभाग",
    category: "Department",
    address: "Kathmandu, Harihar Bhawan",
    phone: "+977-1-4211934",
    email: "info@dls.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Livestock Health", "Veterinary Services", "Animal Registration", "Disease Control"],
    verified: true,
  },
  {
    id: 45,
    name: "Land Revenue Office Chitwan",
    nameNp: "मालपोत कार्यालय चितवन",
    category: "Revenue Office",
    address: "Bharatpur, Chitwan",
    phone: "+977-56-591234",
    email: "malpot.chitwan@gov.np",
    hours: "Sunday - Friday: 10:00 AM - 3:00 PM",
    services: ["Land Registration", "Property Valuation", "Tax Assessment", "Land Records"],
    verified: true,
  },
  {
    id: 46,
    name: "Ghorahi Sub-Metropolitan City Office",
    nameNp: "घोराही उपमहानगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Ghorahi, Dang",
    phone: "+977-82-560045",
    email: "info@ghorahimun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Death Certificate", "Local Tax", "Recommendation Letters"],
    verified: true,
  },
  {
    id: 47,
    name: "Department of Health Services",
    nameNp: "स्वास्थ्य सेवा विभाग",
    category: "Department",
    address: "Kathmandu, Teku",
    phone: "+977-1-4261893",
    email: "info@dohs.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Medical Registration", "Hospital Licensing", "Drug Registration", "Health Programs"],
    verified: true,
  },
  {
    id: 48,
    name: "Tikapur Municipality Office",
    nameNp: "टीकापुर नगरपालिका कार्यालय",
    category: "Municipal Office",
    address: "Tikapur, Kailali",
    phone: "+977-91-560045",
    email: "info@tikapurmun.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["Birth Certificate", "Business Permit", "Tax Services", "Ward Services"],
    verified: true,
  },
  {
    id: 49,
    name: "Department of Education",
    nameNp: "शिक्षा विभाग",
    category: "Department",
    address: "Kathmandu, Sanothimi",
    phone: "+977-1-4600583",
    email: "info@doe.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 5:00 PM",
    services: ["School Registration", "Teacher Certification", "Educational Grants", "Curriculum Approval"],
    verified: true,
  },
  {
    id: 50,
    name: "District Administration Office Kaski",
    nameNp: "जिल्ला प्रशासन कार्यालय कास्की",
    category: "District Office",
    address: "Pokhara, Kaski",
    phone: "+977-61-531200",
    email: "dao.kaski@moha.gov.np",
    hours: "Sunday - Friday: 10:00 AM - 4:00 PM",
    services: ["Citizenship", "Passport Recommendation", "Document Attestation", "Security Services"],
    verified: true,
  },
];

const Offices = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOffice, setSelectedOffice] = useState<typeof mockOffices[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All Offices");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleViewOnMap = (address: string, name: string) => {
    // Create Google Maps search URL
    const searchQuery = encodeURIComponent(`${name}, ${address}, Nepal`);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${searchQuery}`;
    window.open(googleMapsUrl, '_blank');
  };

  const handleDownloadInfo = (office: typeof mockOffices[0]) => {
    // Create text content with office information
    const content = `
==============================================
${office.name}
${office.nameNp}
==============================================

CATEGORY: ${office.category}

ADDRESS:
${office.address}

CONTACT INFORMATION:
Phone: ${office.phone}
Email: ${office.email}

OFFICE HOURS:
${office.hours}

AVAILABLE SERVICES:
${office.services.map((service, index) => `${index + 1}. ${service}`).join('\n')}

STATUS: ${office.verified ? 'Verified ✓' : 'Not Verified'}

==============================================
Document generated on: ${new Date().toLocaleString()}
Source: Government Offices Directory
==============================================
    `.trim();

    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${office.name.replace(/[^a-z0-9]/gi, '_')}_Info.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const filteredOffices = mockOffices.filter(
    (office) =>
      (office.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       office.nameNp.includes(searchTerm) ||
       office.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
       office.services.some((service) => service.toLowerCase().includes(searchTerm.toLowerCase()))) &&
      (selectedCategory === "All Offices" || office.category === selectedCategory)
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredOffices.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedOffices = filteredOffices.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t.pageTitle}</h1>
          <p className="text-lg text-muted-foreground">{t.pageDescription}</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className="cursor-pointer transition-colors"
                onClick={() => handleCategoryChange(category)}
              >
                {categoryMap[category][language]}
              </Badge>
            ))}
          </div>
          <div className="mt-2 text-sm text-muted-foreground">
            {t.showing} {paginatedOffices.length} {paginatedOffices.length === 1 ? t.office : t.offices} {t.of} {filteredOffices.length}
            {selectedCategory !== "All Offices" && ` ${t.in} ${categoryMap[selectedCategory][language]}`}
            {searchTerm && ` ${t.matching} "${searchTerm}"`}
          </div>
        </div>

        {/* Office Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          {paginatedOffices.map((office) => (
            <Card key={office.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <CardTitle className="text-xl">{office.name}</CardTitle>
                      {office.verified && (
                        <Badge variant="success" className="text-xs">
                          {t.verified}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-base">{office.nameNp}</CardDescription>
                  </div>
                  <Badge variant="secondary">{categoryMap[office.category][language]}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2 text-sm">
                    <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span>{office.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <a href={`tel:${office.phone}`} className="hover:text-primary transition-colors">
                      {office.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <a href={`mailto:${office.email}`} className="hover:text-primary transition-colors">
                      {office.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                    <span>{office.hours}</span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">{t.availableServices}:</p>
                  <div className="flex flex-wrap gap-2">
                    {office.services.map((service) => (
                      <Badge key={service} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleViewOnMap(office.address, office.name)}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    {t.viewOnMap}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setSelectedOffice(office)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {t.details}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="mb-8">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                >
                  {t.previous}
                </PaginationPrevious>
              </PaginationItem>

              <PaginationItem>
                <div className="flex items-center gap-1 px-4">
                  <span>{t.page}</span>
                  <span className="font-medium">{currentPage}</span>
                  <span>{t.of}</span>
                  <span className="font-medium">{totalPages}</span>
                </div>
              </PaginationItem>

              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                >
                  {t.next}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Office Details Dialog */}
        <DetailsDialog
          isOpen={!!selectedOffice}
          onClose={() => setSelectedOffice(null)}
          title={selectedOffice?.name || ""}
          description={selectedOffice?.nameNp || ""}
        >
          {selectedOffice && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{t.officeInformation}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{t.address}</p>
                        <p className="text-sm text-muted-foreground">{selectedOffice.address}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="font-medium">{t.officeHours}</p>
                        <p className="text-sm text-muted-foreground">{selectedOffice.hours}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users2 className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{t.contactInformation}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <a href={`tel:${selectedOffice.phone}`} className="text-sm hover:text-primary">
                        {selectedOffice.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedOffice.email}`} className="text-sm hover:text-primary">
                        {selectedOffice.email}
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{t.availableServices}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {selectedOffice.services.map((service) => (
                      <Badge key={service} variant="secondary">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => handleViewOnMap(selectedOffice.address, selectedOffice.name)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  {t.viewOnMap}
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => handleDownloadInfo(selectedOffice)}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  {t.downloadInformation}
                </Button>
              </div>
            </div>
          )}
        </DetailsDialog>
      </div>
    </div>
  );
};

export default Offices;
