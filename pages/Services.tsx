import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, Clock, DollarSign, CheckCircle2, AlertCircle, Building2, FileCheck, Search, SlidersHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { DetailsDialog } from "@/components/ui/details-dialog";
import { Step } from "@/components/ui/steps";
import { useState, useMemo } from "react";
import { serviceProcedures } from "@/data/procedures";
import { useLanguage } from "@/context/language-context";

const translations = {
  en: {
    pageTitle: "Services & Procedures",
    pageDescription: "Find and learn about government services",
    searchPlaceholder: "Search services by name or office...",
    sortBy: "Sort by...",
    duration: "Duration",
    days: "days",
    fee: "Fee",
    requiredDocuments: "Required Documents",
    moreDocuments: "more documents",
    stepsInProcedure: "steps in this procedure",
    viewProcedure: "View Procedure",
    forms: "Forms",
    noServices: "No services found",
    adjustSearch: "Try adjusting your search or filter criteria",
    serviceInfo: "Service Information",
    serviceProvider: "Service Provider",
    procedureSteps: "Procedure Steps",
    downloadForms: "Download Forms",
    saveProcedure: "Save Procedure",
    comingSoonTitle: "Auto-fill Feature Coming Soon",
    comingSoonDesc: "Soon you'll be able to store your basic information and auto-fill common form fields, making government procedures faster and easier.",
    showing: "Showing",
    service: "service",
    services: "services",
    in: "in",
    matching: "matching"
  },
  np: {
    pageTitle: "सेवाहरू र प्रक्रियाहरू",
    pageDescription: "सरकारी सेवाहरू खोज्नुहोस् र जान्नुहोस्",
    searchPlaceholder: "सेवाको नाम वा कार्यालयद्वारा खोज्नुहोस्...",
    sortBy: "क्रमबद्ध गर्नुहोस्...",
    duration: "अवधि",
    days: "दिन",
    fee: "शुल्क",
    requiredDocuments: "आवश्यक कागजातहरू",
    moreDocuments: "थप कागजातहरू",
    stepsInProcedure: "यो प्रक्रियामा चरणहरू",
    viewProcedure: "प्रक्रिया हेर्नुहोस्",
    forms: "फारमहरू",
    noServices: "कुनै सेवाहरू फेला परेनन्",
    adjustSearch: "कृपया आफ्नो खोज वा फिल्टर मापदण्ड समायोजन गर्नुहोस्",
    serviceInfo: "सेवा जानकारी",
    serviceProvider: "सेवा प्रदायक",
    procedureSteps: "प्रक्रिया चरणहरू",
    downloadForms: "फारमहरू डाउनलोड गर्नुहोस्",
    saveProcedure: "प्रक्रिया सुरक्षित गर्नुहोस्",
    comingSoonTitle: "स्वत:-भरण सुविधा चाँडै आउँदैछ",
    comingSoonDesc: "चाँडै नै तपाईं आफ्नो आधारभूत जानकारी भण्डारण गर्न र सामान्य फारम फिल्डहरू स्वत: भर्न सक्नुहुनेछ, सरकारी प्रक्रियाहरूलाई छिटो र सजिलो बनाउँदै।",
    showing: "देखाउँदै",
    service: "सेवा",
    services: "सेवाहरू",
    in: "मा",
    matching: "मेल खाने"
  }
};

const categoryMap = {
  "All Services": { en: "All Services", np: "सबै सेवाहरू" },
  "Vital Records": { en: "Vital Records", np: "महत्वपूर्ण अभिलेखहरू" },
  "Transport": { en: "Transport", np: "यातायात" },
  "Business": { en: "Business", np: "व्यवसाय" },
  "Travel Documents": { en: "Travel Documents", np: "यात्रा कागजातहरू" },
  "Property & Land": { en: "Property & Land", np: "सम्पत्ति र जग्गा" },
  "Education": { en: "Education", np: "शिक्षा" },
  "Tax": { en: "Tax", np: "कर" },
  "Health": { en: "Health", np: "स्वास्थ्य" },
  "Social Security": { en: "Social Security", np: "सामाजिक सुरक्षा" }
};

const sortOptionsMap = {
  "A-Z": { en: "A-Z", np: "A-Z" },
  "Z-A": { en: "Z-A", np: "Z-A" },
  "Easiest First": { en: "Easiest First", np: "सजिलो पहिले" },
  "Hardest First": { en: "Hardest First", np: "कठिन पहिले" },
  "Shortest Duration": { en: "Shortest Duration", np: "छोटो अवधि" },
  "Longest Duration": { en: "Longest Duration", np: "लामो अवधि" }
};

const categories = ["All Services", "Vital Records", "Transport", "Business", "Travel Documents", "Property & Land", "Education", "Tax", "Health", "Social Security"];
const sortOptions = ["A-Z", "Z-A", "Easiest First", "Hardest First", "Shortest Duration", "Longest Duration"];

const mockServices = [
  {
    id: 1,
    title: "Birth Certificate",
    titleNp: "जन्म दर्ता प्रमाणपत्र",
    category: "Vital Records",
    office: "Municipal Office",
    duration: "1-3",
    fee: "NPR 100",
    difficulty: "Easy",
    documents: ["Hospital birth certificate", "Parents' citizenship", "Marriage certificate"],
    steps: 5,
  },
  {
    id: 2,
    title: "Driving License",
    titleNp: "चालक अनुमति पत्र",
    category: "Transport",
    office: "Transport Management Office",
    duration: "30-45",
    fee: "NPR 1,500",
    difficulty: "Medium",
    documents: ["Citizenship", "Health certificate", "Trail card", "Written test pass slip"],
    steps: 8,
  },
  {
    id: 3,
    title: "Business Registration",
    titleNp: "व्यवसाय दर्ता",
    category: "Business",
    office: "Company Registrar Office",
    duration: "7-15",
    fee: "NPR 5,000+",
    difficulty: "Medium",
    documents: ["PAN card", "Citizenship", "Office rental agreement", "Business plan"],
    steps: 10,
  },
  {
    id: 4,
    title: "Passport Application",
    titleNp: "राहदानी आवेदन",
    category: "Travel Documents",
    office: "Department of Passports",
    duration: "10-20",
    fee: "NPR 5,000",
    difficulty: "Medium",
    documents: ["Citizenship", "Recommendation letter", "Photos", "Previous passport (if renewal)"],
    steps: 7,
  },
  {
    id: 5,
    title: "Death Certificate",
    titleNp: "मृत्यु दर्ता प्रमाणपत्र",
    category: "Vital Records",
    office: "Municipal Office",
    duration: "1-3",
    fee: "NPR 100",
    difficulty: "Easy",
    documents: ["Death report from hospital/doctor", "Citizenship of deceased", "Applicant's citizenship"],
    steps: 4,
  },
  {
    id: 6,
    title: "Marriage Registration",
    titleNp: "विवाह दर्ता",
    category: "Vital Records",
    office: "Municipal Office",
    duration: "1-2",
    fee: "NPR 500",
    difficulty: "Easy",
    documents: ["Citizenship of both parties", "Photos", "Witness citizenship", "Birth certificates"],
    steps: 6,
  },
  {
    id: 7,
    title: "Citizenship Certificate",
    titleNp: "नागरिकता प्रमाणपत्र",
    category: "Vital Records",
    office: "District Administration Office",
    duration: "15-30",
    fee: "NPR 500",
    difficulty: "Medium",
    documents: ["Birth certificate", "Parents' citizenship", "Recommendation letter", "Photos"],
    steps: 8,
  },
  {
    id: 8,
    title: "Vehicle Registration",
    titleNp: "सवारी साधन दर्ता",
    category: "Transport",
    office: "Transport Management Office",
    duration: "3-7",
    fee: "NPR 2,000+",
    difficulty: "Medium",
    documents: ["Vehicle purchase invoice", "Citizenship", "Tax clearance", "Insurance"],
    steps: 7,
  },
  {
    id: 9,
    title: "PAN Registration",
    titleNp: "स्थायी लेखा नम्बर दर्ता",
    category: "Tax",
    office: "Inland Revenue Office",
    duration: "1-5",
    fee: "Free",
    difficulty: "Easy",
    documents: ["Citizenship", "Photos", "Business registration (for companies)"],
    steps: 4,
  },
  {
    id: 10,
    title: "VAT Registration",
    titleNp: "मूल्य अभिवृद्धि कर दर्ता",
    category: "Tax",
    office: "Inland Revenue Office",
    duration: "5-10",
    fee: "Free",
    difficulty: "Medium",
    documents: ["PAN certificate", "Business registration", "Office rental agreement", "Photos"],
    steps: 6,
  },
  {
    id: 11,
    title: "Land Registration",
    titleNp: "जग्गा दर्ता",
    category: "Property & Land",
    office: "Land Revenue Office",
    duration: "7-15",
    fee: "Variable",
    difficulty: "Hard",
    documents: ["Sale deed", "Citizenship", "Tax clearance", "Property valuation", "Photos"],
    steps: 12,
  },
  {
    id: 12,
    title: "Building Permit",
    titleNp: "भवन निर्माण अनुमति",
    category: "Property & Land",
    office: "Municipal Office",
    duration: "15-30",
    fee: "Variable",
    difficulty: "Hard",
    documents: ["Land ownership certificate", "Building design", "Engineer's certificate", "NOC from neighbors"],
    steps: 10,
  },
  {
    id: 13,
    title: "Visa Application",
    titleNp: "भिसा आवेदन",
    category: "Travel Documents",
    office: "Department of Immigration",
    duration: "5-15",
    fee: "Variable",
    difficulty: "Medium",
    documents: ["Passport", "Photos", "Sponsor letter", "Bank statement", "Purpose documents"],
    steps: 8,
  },
  {
    id: 14,
    title: "Trade License",
    titleNp: "व्यापार इजाजत पत्र",
    category: "Business",
    office: "Municipal Office",
    duration: "3-7",
    fee: "NPR 1,000+",
    difficulty: "Easy",
    documents: ["PAN certificate", "Citizenship", "Office rental agreement", "Photos"],
    steps: 5,
  },
  {
    id: 15,
    title: "Cottage Industry Registration",
    titleNp: "घरेलु उद्योग दर्ता",
    category: "Business",
    office: "Department of Cottage Industry",
    duration: "10-20",
    fee: "NPR 2,000",
    difficulty: "Medium",
    documents: ["PAN certificate", "Citizenship", "Business plan", "Photos", "Office proof"],
    steps: 9,
  },
  {
    id: 16,
    title: "SLC/SEE Certificate",
    titleNp: "एसएलसी/एसईई प्रमाणपत्र",
    category: "Education",
    office: "Office of Controller of Examinations",
    duration: "7-15",
    fee: "NPR 500",
    difficulty: "Easy",
    documents: ["Application form", "Admit card", "Citizenship", "Photos"],
    steps: 5,
  },
  {
    id: 17,
    title: "Character Certificate",
    titleNp: "चरित्र प्रमाणपत्र",
    category: "Vital Records",
    office: "District Administration Office",
    duration: "3-7",
    fee: "NPR 200",
    difficulty: "Easy",
    documents: ["Citizenship", "Recommendation from ward", "Photos"],
    steps: 4,
  },
  {
    id: 18,
    title: "Tax Clearance Certificate",
    titleNp: "कर चुक्ता प्रमाणपत्र",
    category: "Tax",
    office: "Inland Revenue Office",
    duration: "5-10",
    fee: "Free",
    difficulty: "Medium",
    documents: ["PAN certificate", "Tax return receipts", "Application form"],
    steps: 5,
  },
  {
    id: 19,
    title: "Social Security Fund Registration",
    titleNp: "सामाजिक सुरक्षा कोष दर्ता",
    category: "Social Security",
    office: "Social Security Fund Office",
    duration: "3-7",
    fee: "Free",
    difficulty: "Easy",
    documents: ["Citizenship", "Employment letter", "Bank account details", "Photos"],
    steps: 5,
  },
  {
    id: 20,
    title: "Health Insurance Card",
    titleNp: "स्वास्थ्य बीमा कार्ड",
    category: "Health",
    office: "Health Insurance Board",
    duration: "5-10",
    fee: "NPR 2,500/year",
    difficulty: "Easy",
    documents: ["Citizenship", "Family details", "Photos", "Bank account"],
    steps: 6,
  },
  {
    id: 21,
    title: "Driving License Renewal",
    titleNp: "चालक अनुमति नविकरण",
    category: "Transport",
    office: "Transport Management Office",
    duration: "1-3",
    fee: "NPR 500",
    difficulty: "Easy",
    documents: ["Old license", "Citizenship", "Health certificate", "Photos"],
    steps: 4,
  },
  {
    id: 22,
    title: "Passport Renewal",
    titleNp: "राहदानी नविकरण",
    category: "Travel Documents",
    office: "Department of Passports",
    duration: "10-15",
    fee: "NPR 5,000",
    difficulty: "Easy",
    documents: ["Old passport", "Citizenship", "Recommendation letter", "Photos"],
    steps: 6,
  },
  {
    id: 23,
    title: "Property Tax Payment",
    titleNp: "सम्पत्ति कर भुक्तानी",
    category: "Tax",
    office: "Municipal Office",
    duration: "1-2",
    fee: "Variable",
    difficulty: "Easy",
    documents: ["Land ownership certificate", "Previous tax receipt"],
    steps: 3,
  },
  {
    id: 24,
    title: "Medical License",
    titleNp: "चिकित्सा इजाजत पत्र",
    category: "Health",
    office: "Nepal Medical Council",
    duration: "15-30",
    fee: "NPR 5,000",
    difficulty: "Hard",
    documents: ["Medical degree", "Internship completion", "Citizenship", "Photos", "Experience certificates"],
    steps: 10,
  },
  {
    id: 25,
    title: "Import License",
    titleNp: "आयात इजाजत पत्र",
    category: "Business",
    office: "Department of Commerce",
    duration: "10-20",
    fee: "NPR 10,000",
    difficulty: "Hard",
    documents: ["Company registration", "PAN certificate", "VAT certificate", "Bank guarantee"],
    steps: 11,
  },
  {
    id: 26,
    title: "Export License",
    titleNp: "निर्यात इजाजत पत्र",
    category: "Business",
    office: "Department of Commerce",
    duration: "10-20",
    fee: "NPR 10,000",
    difficulty: "Hard",
    documents: ["Company registration", "PAN certificate", "VAT certificate", "Quality certificates"],
    steps: 11,
  },
  {
    id: 27,
    title: "Education Equivalency Certificate",
    titleNp: "शिक्षा समकक्षता प्रमाणपत्र",
    category: "Education",
    office: "Tribhuvan University",
    duration: "30-45",
    fee: "NPR 5,000",
    difficulty: "Medium",
    documents: ["Original certificates", "Transcripts", "Citizenship", "Passport", "Application fee receipt"],
    steps: 8,
  },
  {
    id: 28,
    title: "Land Ownership Certificate",
    titleNp: "जग्गा स्वामित्व प्रमाणपत्र",
    category: "Property & Land",
    office: "Land Revenue Office",
    duration: "3-7",
    fee: "NPR 500",
    difficulty: "Easy",
    documents: ["Citizenship", "Land registration documents", "Application form"],
    steps: 5,
  },
  {
    id: 29,
    title: "Food License",
    titleNp: "खाद्य इजाजत पत्र",
    category: "Business",
    office: "Food Technology Office",
    duration: "15-30",
    fee: "NPR 5,000",
    difficulty: "Medium",
    documents: ["Business registration", "Health certificate", "Kitchen inspection report", "Water test report"],
    steps: 9,
  },
  {
    id: 30,
    title: "Old Age Allowance",
    titleNp: "ज्येष्ठ नागरिक भत्ता",
    category: "Social Security",
    office: "Municipal Office",
    duration: "5-10",
    fee: "Free",
    difficulty: "Easy",
    documents: ["Citizenship (70+ years)", "Bank account details", "Photos"],
    steps: 4,
  },
];

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [selectedService, setSelectedService] = useState<typeof mockServices[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Services");
  const [sortBy, setSortBy] = useState("A-Z");
  
  const filteredServices = useMemo(() => {
    let filtered = [...mockServices];
    
    // Apply category filter
    if (selectedCategory !== "All Services") {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(service => 
        service.title.toLowerCase().includes(query) ||
        service.titleNp.toLowerCase().includes(query) ||
        service.office.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortBy) {
      case "Z-A":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "Easiest First":
        filtered.sort((a, b) => {
          const order = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return (order[a.difficulty as keyof typeof order] || 0) - (order[b.difficulty as keyof typeof order] || 0);
        });
        break;
      case "Hardest First":
        filtered.sort((a, b) => {
          const order = { "Easy": 1, "Medium": 2, "Hard": 3 };
          return (order[b.difficulty as keyof typeof order] || 0) - (order[a.difficulty as keyof typeof order] || 0);
        });
        break;
      case "Shortest Duration":
        filtered.sort((a, b) => parseInt(a.duration) - parseInt(b.duration));
        break;
      case "Longest Duration":
        filtered.sort((a, b) => parseInt(b.duration) - parseInt(a.duration));
        break;
      default: // A-Z
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }
    
    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  const getDifficultyColor = (difficulty: string): "success" | "warning" | "destructive" | "secondary" => {
    switch (difficulty) {
      case "Easy":
        return "success";
      case "Medium":
        return "warning";
      case "Hard":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t.pageTitle}</h1>
          <p className="text-lg text-muted-foreground">{t.pageDescription}</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                <SelectValue placeholder={t.sortBy} />
              </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option} value={option}>
                    {sortOptionsMap[option][language]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              className="cursor-pointer transition-colors"
              onClick={() => setSelectedCategory(category)}
            >
              {categoryMap[category][language]}
            </Badge>
          ))}
        </div>

        {/* Results Count */}
        <div className="mb-4 text-sm text-muted-foreground">
          {t.showing} {filteredServices.length} {filteredServices.length === 1 ? t.service : t.services}
          {selectedCategory !== "All Services" && ` ${t.in} ${categoryMap[selectedCategory][language]}`}
          {searchQuery && ` ${t.matching} "${searchQuery}"`}
        </div>

        {/* Service Cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredServices.length === 0 ? (
            <Card className="col-span-2 py-8">
              <CardContent className="flex flex-col items-center justify-center text-center">
                <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground" />
                <h3 className="mb-1 font-semibold">{t.noServices}</h3>
                <p className="text-sm text-muted-foreground">
                  {t.adjustSearch}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredServices.map((service) => (
              <Card key={service.id} className="shadow-card hover:shadow-elevated transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-1">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.titleNp}</CardDescription>
                    </div>
                    <Badge variant={getDifficultyColor(service.difficulty)}>
                      {service.difficulty}
                    </Badge>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {service.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {service.office}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t.duration}</p>
                        <p className="text-sm font-medium">{service.duration} {t.days}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <p className="text-xs text-muted-foreground">{t.fee}</p>
                        <p className="text-sm font-medium">{service.fee}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle2 className="h-4 w-4 text-success" />
                      <p className="text-sm font-medium">{t.requiredDocuments}:</p>
                    </div>
                    <ul className="space-y-1 ml-6">
                      {service.documents.slice(0, 3).map((doc, index) => (
                        <li key={index} className="text-sm text-muted-foreground list-disc">
                          {doc}
                        </li>
                      ))}
                      {service.documents.length > 3 && (
                        <li className="text-sm text-primary list-none">
                          +{service.documents.length - 3} {t.moreDocuments}
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <FileText className="h-4 w-4" />
                    <span>{service.steps} {t.stepsInProcedure}</span>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      className="flex-1"
                      onClick={() => setSelectedService(service)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {t.viewProcedure}
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="mr-2 h-4 w-4" />
                      {t.forms}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Service Details Dialog */}
        <DetailsDialog
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
          title={selectedService?.title || ""}
          description={selectedService?.titleNp}
        >
          {selectedService && (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{t.serviceInfo}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t.duration}</p>
                          <p className="text-sm font-medium">{selectedService.duration} {t.days}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">{t.fee}</p>
                          <p className="text-sm font-medium">{selectedService.fee}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileCheck className="h-4 w-4 text-muted-foreground" />
                        <p className="text-sm font-medium">{t.requiredDocuments}:</p>
                      </div>
                      <ul className="space-y-1 ml-6">
                        {selectedService.documents.map((doc, index) => (
                          <li key={index} className="text-sm text-muted-foreground list-disc">
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{t.serviceProvider}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">{selectedService.office}</p>
                    <Badge variant="secondary">{categoryMap[selectedService.category][language]}</Badge>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{t.procedureSteps}</CardTitle>
                    </div>
                    <Badge variant={getDifficultyColor(selectedService.difficulty)}>
                      {selectedService.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-1">
                    {serviceProcedures[selectedService.id as keyof typeof serviceProcedures]?.map((step, index) => (
                      <Step
                        key={index}
                        title={step.title}
                        description={step.description}
                        isCompleted={false}
                        isActive={false}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex gap-2">
                <Button className="flex-1">
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadForms}
                </Button>
                <Button variant="outline" className="flex-1">
                  <FileText className="mr-2 h-4 w-4" />
                  {t.saveProcedure}
                </Button>
              </div>
            </div>
          )}
        </DetailsDialog>

        {/* Info Banner */}
        <Card className="mt-8 border-info/50 bg-info/5">
          <CardContent className="flex items-start gap-3 p-6">
            <AlertCircle className="h-5 w-5 text-info mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold mb-1">{t.comingSoonTitle}</h3>
              <p className="text-sm text-muted-foreground">{t.comingSoonDesc}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Services;