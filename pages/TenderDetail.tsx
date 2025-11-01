import { useParams, useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Briefcase, 
  Calendar, 
  DollarSign, 
  MapPin, 
  FileText,
  Building,
  Clock,
  Download,
  CheckCircle2,
  ListChecks
} from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useTenderStore } from "@/store/tenderStore";

const translations = {
  en: {
    backToTenders: "Back to Tenders",
    tenderDetails: "Tender Details",
    status: "Status",
    category: "Category",
    issuingOffice: "Issuing Office",
    location: "Location",
    budget: "Budget",
    deadline: "Deadline",
    publishDate: "Publish Date",
    daysLeft: "days left",
    expired: "Expired",
    description: "Description",
    tenderInfo: "Tender Information",
    notFound: "Tender not found",
    notFoundDesc: "The tender you're looking for doesn't exist or has been removed.",
    downloadDocuments: "Download Documents",
    requiredDocuments: "Required Documents Checklist",
    procedureChecklist: "Procedure Checklist",
    noRequiredDocs: "No required documents specified",
    noProcedure: "No procedure checklist available",
  },
  np: {
    backToTenders: "बोलपत्रहरूमा फर्कनुहोस्",
    tenderDetails: "बोलपत्र विवरण",
    status: "स्थिति",
    category: "श्रेणी",
    issuingOffice: "जारी गर्ने कार्यालय",
    location: "स्थान",
    budget: "बजेट",
    deadline: "अन्तिम मिति",
    publishDate: "प्रकाशन मिति",
    daysLeft: "दिन बाँकी",
    expired: "समाप्त भएको",
    description: "विवरण",
    tenderInfo: "बोलपत्र जानकारी",
    notFound: "बोलपत्र फेला परेन",
    notFoundDesc: "तपाईंले खोज्नुभएको बोलपत्र अवस्थित छैन वा हटाइएको छ।",
    downloadDocuments: "कागजातहरू डाउनलोड गर्नुहोस्",
    requiredDocuments: "आवश्यक कागजातहरूको सूची",
    procedureChecklist: "प्रक्रिया चेकलिस्ट",
    noRequiredDocs: "कुनै आवश्यक कागजातहरू निर्दिष्ट गरिएको छैन",
    noProcedure: "कुनै प्रक्रिया चेकलिस्ट उपलब्ध छैन",
  }
};

const TenderDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { tenders } = useTenderStore();
  const t = translations[language];

  // Decode the URL-encoded tender ID
  const decodedId = id ? decodeURIComponent(id) : '';
  const tender = tenders.find((t) => t.id === decodedId);

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (!tender) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container py-8">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/tenders')}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t.backToTenders}
          </Button>
          
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>{t.notFound}</CardTitle>
              <CardDescription>{t.notFoundDesc}</CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    );
  }

  const daysLeft = getDaysLeft(tender.deadline);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/tenders')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.backToTenders}
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{tender.title}</CardTitle>
                    <CardDescription className="text-base">
                      {tender.description}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                  <Badge variant={tender.status === 'Open' ? "default" : "secondary"}>
                    {tender.status}
                  </Badge>
                  <Badge variant="secondary">{tender.category}</Badge>
                  <Badge variant="outline" className="text-xs">
                    {tender.id}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t.tenderInfo}</h3>
                  <Separator className="mb-4" />
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.issuingOffice}</p>
                        <p className="text-base font-semibold">{tender.office}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.location}</p>
                        <p className="text-base font-semibold">{tender.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.budget}</p>
                        <p className="text-base font-semibold">{tender.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.deadline}</p>
                        <p className="text-base font-semibold">
                          {tender.deadline}
                          <span className={`ml-2 text-sm ${daysLeft > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({daysLeft > 0 ? `${daysLeft} ${t.daysLeft}` : t.expired})
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.publishDate}</p>
                        <p className="text-base font-semibold">{tender.publishDate}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t.description}</h3>
                  <Separator className="mb-4" />
                  <p className="text-muted-foreground leading-relaxed">
                    {tender.description}
                  </p>
                </div>

                {/* Required Documents Checklist */}
                {tender.requiredDocumentsChecklist && tender.requiredDocumentsChecklist.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <FileText className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{t.requiredDocuments}</h3>
                    </div>
                    <Separator className="mb-4" />
                    <ul className="space-y-3">
                      {tender.requiredDocumentsChecklist.map((doc, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                          <span className="text-muted-foreground">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Procedure Checklist */}
                {tender.procedureChecklist && tender.procedureChecklist.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <ListChecks className="h-5 w-5 text-primary" />
                      <h3 className="text-lg font-semibold">{t.procedureChecklist}</h3>
                    </div>
                    <Separator className="mb-4" />
                    <ol className="space-y-3">
                      {tender.procedureChecklist.map((step, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                            {index + 1}
                          </div>
                          <span className="text-muted-foreground pt-0.5">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" disabled={tender.status !== 'Open'}>
                  <FileText className="mr-2 h-4 w-4" />
                  Apply Now
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  {t.downloadDocuments}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Timeline</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-primary/10 p-2">
                    <Clock className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Published</p>
                    <p className="text-sm text-muted-foreground">{tender.publishDate}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <div className={`rounded-full p-2 ${daysLeft > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                    <Calendar className={`h-4 w-4 ${daysLeft > 0 ? 'text-green-600' : 'text-red-600'}`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Deadline</p>
                    <p className="text-sm text-muted-foreground">{tender.deadline}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenderDetail;
