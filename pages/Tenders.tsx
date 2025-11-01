import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Briefcase, Calendar, DollarSign, MapPin, Bell, Search, Eye, ExternalLink, Building, Clock } from "lucide-react";
import { useLanguage } from "@/context/language-context";
import { useTenderStore, Tender } from "@/store/tenderStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const translations = {
  en: {
    title: "Tenders & Projects",
    titleNp: "बोलपत्र र परियोजनाहरू",
    subscribeTitle: "Subscribe to Tender Alerts",
    subscribeDesc: "Get notified when new tenders in your category are published",
    searchPlaceholder: "Search tenders by title, category, or office...",
    allTenders: "All Tenders",
    infrastructure: "Infrastructure",
    technology: "Technology",
    education: "Education",
    supplies: "Supplies",
    subscribe: "Subscribe",
    issuingOffice: "Issuing Office:",
    location: "Location:",
    deadline: "Deadline:",
    daysLeft: "days left",
    expired: "Expired",
    viewDetails: "View Details",
    viewProfile: "View Profile",
    preview: "Preview",
    noTenders: "No tenders found matching your criteria",
    page: "Page",
    of: "of",
    previous: "Previous",
    next: "Next",
  },
  np: {
    title: "बोलपत्र र परियोजनाहरू",
    titleNp: "Tenders & Projects",
    subscribeTitle: "बोलपत्र सूचनाहरूको लागि सदस्यता लिनुहोस्",
    subscribeDesc: "तपाईंको श्रेणीमा नयाँ बोलपत्रहरू प्रकाशित हुँदा सूचित हुनुहोस्",
    searchPlaceholder: "शीर्षक, श्रेणी वा कार्यालय द्वारा बोलपत्रहरू खोज्नुहोस्...",
    allTenders: "सबै बोलपत्रहरू",
    infrastructure: "पूर्वाधार",
    technology: "प्रविधि",
    education: "शिक्षा",
    supplies: "आपूर्ति",
    subscribe: "सदस्यता लिनुहोस्",
    issuingOffice: "जारी गर्ने कार्यालय:",
    location: "स्थान:",
    deadline: "अन्तिम मिति:",
    daysLeft: "दिन बाँकी",
    expired: "समाप्त भएको",
    viewDetails: "विवरण हेर्नुहोस्",
    viewProfile: "प्रोफाइल हेर्नुहोस्",
    preview: "पूर्वावलोकन",
    noTenders: "तपाईंको मापदण्ड अनुरूप कुनै बोलपत्र फेला परेन",
    page: "पृष्ठ",
    of: "को",
    previous: "अघिल्लो",
    next: "अर्को",
  }
};

const Tenders = () => {
  const {
    filters,
    setFilters,
    getPaginatedTenders,
    getCategories,
    getTotalPages,
    currentPage,
    setCurrentPage,
    getTendersByCategory
  } = useTenderStore();

  const { language } = useLanguage();
  const navigate = useNavigate();
  const t = translations[language];
  
  const [previewTender, setPreviewTender] = useState<Tender | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const categories = getCategories();
  const tenders = getPaginatedTenders();
  const totalPages = getTotalPages();

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handlePreview = (tender: Tender) => {
    setPreviewTender(tender);
    setIsPreviewOpen(true);
  };

  const handleViewProfile = (tenderId: string) => {
    navigate(`/tenders/${encodeURIComponent(tenderId)}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t.title}</h1>
          <p className="text-lg text-muted-foreground">{t.titleNp}</p>
        </div>

        {/* Alert Subscription */}
        <Card className="mb-8 border-secondary/50 bg-secondary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <Bell className="h-5 w-5 text-secondary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{t.subscribeTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {t.subscribeDesc}
              </p>
            </div>
            <Button variant="secondary">
              <Bell className="mr-2 h-4 w-4" />
              {t.subscribe}
            </Button>
          </CardContent>
        </Card>

        {/* Search and Filter */}
        <div className="mb-6 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t.searchPlaceholder}
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={filters.category === category ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => setFilters({ category })}
              >
                {category === 'All' ? t.allTenders : category}
                {category !== 'All' && (
                  <span className="ml-2 text-xs">({getTendersByCategory(category)})</span>
                )}
              </Badge>
            ))}
          </div>
        </div>

        {/* Tender Cards */}
        <div className="grid gap-6 mb-6">
          {tenders.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {t.noTenders}
            </div>
          ) : (
            tenders.map((tender) => {
              const daysLeft = getDaysLeft(tender.deadline);
              return (
                <Card key={tender.id} className="shadow-card hover:shadow-elevated transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-xl">{tender.title}</CardTitle>
                          <Badge variant={tender.status === 'Open' ? "success" : "secondary"}>
                            {tender.status}
                          </Badge>
                        </div>
                        <CardDescription className="text-base">{tender.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{tender.category}</Badge>
                      <Badge variant="outline" className="text-xs">
                        {tender.id}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{t.issuingOffice}</span>
                          <span className="text-muted-foreground">{tender.office}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{t.location}</span>
                          <span className="text-muted-foreground">{tender.location}</span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{t.deadline}</span>
                          <span className="text-muted-foreground">
                            {tender.deadline}
                            <span className="ml-2">
                              ({daysLeft > 0 ? `${daysLeft} ${t.daysLeft}` : t.expired})
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button 
                        size="sm" 
                        variant="default" 
                        className="flex-1"
                        onClick={() => handleViewProfile(tender.id)}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {t.viewProfile}
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="flex-1"
                        onClick={() => handlePreview(tender)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {t.preview}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage - 1);
                  }}
                  aria-disabled={currentPage === 1}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
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
                    setCurrentPage(currentPage + 1);
                  }}
                  aria-disabled={currentPage === totalPages}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                >
                  {t.next}
                </PaginationNext>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}

        {/* Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            {previewTender && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{previewTender.title}</DialogTitle>
                  <DialogDescription className="text-base">
                    {previewTender.description}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-6 mt-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={previewTender.status === 'Open' ? "default" : "secondary"}>
                      {previewTender.status}
                    </Badge>
                    <Badge variant="secondary">{previewTender.category}</Badge>
                    <Badge variant="outline" className="text-xs">
                      {previewTender.id}
                    </Badge>
                  </div>

                  <Separator />

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="flex items-start gap-3">
                      <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.issuingOffice}</p>
                        <p className="text-base font-semibold">{previewTender.office}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.location}</p>
                        <p className="text-base font-semibold">{previewTender.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Budget</p>
                        <p className="text-base font-semibold">{previewTender.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{t.deadline}</p>
                        <p className="text-base font-semibold">
                          {previewTender.deadline}
                          <span className={`ml-2 text-sm ${getDaysLeft(previewTender.deadline) > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            ({getDaysLeft(previewTender.deadline) > 0 
                              ? `${getDaysLeft(previewTender.deadline)} ${t.daysLeft}` 
                              : t.expired})
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">Publish Date</p>
                        <p className="text-base font-semibold">{previewTender.publishDate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => {
                        setIsPreviewOpen(false);
                        handleViewProfile(previewTender.id);
                      }}
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t.viewProfile}
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => setIsPreviewOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Tenders;