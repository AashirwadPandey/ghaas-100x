import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MessageSquare, Upload, AlertCircle, CheckCircle2, Clock, MapPin } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/language-context";

const translations = {
  en: {
    pageTitle: "Citizen Complaints",
    pageDescription: "Your voice matters - Report issues in your community",
    fileNewComplaint: "File New Complaint",
    submitComplaint: "Submit a Complaint",
    submitDescription: "Describe your issue and we'll track it until resolved",
    category: "Category",
    selectCategory: "Select category",
    infrastructure: "Infrastructure",
    sanitation: "Sanitation",
    utilities: "Utilities",
    transport: "Transport",
    other: "Other",
    location: "Location",
    locationPlaceholder: "Ward number and area",
    complaintTitle: "Complaint Title",
    titlePlaceholder: "Brief description of the issue",
    description: "Detailed Description",
    descriptionPlaceholder: "Please provide detailed information about your complaint...",
    attachPhoto: "Attach Photo/Video (Optional)",
    photoHelp: "Photos and videos help us understand and resolve issues faster",
    submit: "Submit Complaint",
    cancel: "Cancel",
    trackComplaint: "Track Your Complaint",
    trackDescription: "Enter your tracking ID to check the status",
    trackIdPlaceholder: "CMP-2024-XXX",
    track: "Track",
    recentComplaints: "Recent Public Complaints",
    recentDescription: "Upvote complaints that affect you too",
    submittedSuccess: "Complaint submitted successfully! Tracking ID: CMP-2024-004",
    upvotedSuccess: "Upvoted successfully!",
    voteRemoved: "Vote removed",
    viewDetails: "Click to view detailed status and updates",
    required: "Required",
    status: {
      resolved: "Resolved",
      inProgress: "In Progress",
      received: "Received"
    }
  },
  np: {
    pageTitle: "नागरिक गुनासो",
    pageDescription: "तपाईंको आवाज महत्वपूर्ण छ - समुदायका समस्याहरू रिपोर्ट गर्नुहोस्",
    fileNewComplaint: "नयाँ गुनासो दर्ता गर्नुहोस्",
    submitComplaint: "गुनासो पेश गर्नुहोस्",
    submitDescription: "तपाईंको समस्या वर्णन गर्नुहोस् र हामी यसलाई समाधान नभएसम्म ट्र्याक गर्नेछौं",
    category: "वर्ग",
    selectCategory: "वर्ग छान्नुहोस्",
    infrastructure: "पूर्वाधार",
    sanitation: "सरसफाई",
    utilities: "उपयोगिताहरू",
    transport: "यातायात",
    other: "अन्य",
    location: "स्थान",
    locationPlaceholder: "वडा नम्बर र क्षेत्र",
    complaintTitle: "गुनासोको शीर्षक",
    titlePlaceholder: "समस्याको संक्षिप्त विवरण",
    description: "विस्तृत विवरण",
    descriptionPlaceholder: "कृपया तपाईंको गुनासोको बारेमा विस्तृत जानकारी प्रदान गर्नुहोस्...",
    attachPhoto: "फोटो/भिडियो संलग्न गर्नुहोस् (वैकल्पिक)",
    photoHelp: "फोटो र भिडियोहरूले हामीलाई समस्याहरू छिटो बुझ्न र समाधान गर्न मद्दत गर्छन्",
    submit: "गुनासो पेश गर्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    trackComplaint: "आफ्नो गुनासो ट्र्याक गर्नुहोस्",
    trackDescription: "स्थिति जाँच गर्न आफ्नो ट्र्याकिङ आईडी प्रविष्ट गर्नुहोस्",
    trackIdPlaceholder: "CMP-2024-XXX",
    track: "ट्र्याक गर्नुहोस्",
    recentComplaints: "हालैका सार्वजनिक गुनासाहरू",
    recentDescription: "तपाईंलाई पनि असर गर्ने गुनासाहरूलाई अपवोट गर्नुहोस्",
    submittedSuccess: "गुनासो सफलतापूर्वक पेश गरियो! ट्र्याकिङ आईडी: CMP-2024-004",
    upvotedSuccess: "सफलतापूर्वक अपवोट गरियो!",
    voteRemoved: "मत हटाइयो",
    viewDetails: "विस्तृत स्थिति र अपडेटहरू हेर्न क्लिक गर्नुहोस्",
    required: "आवश्यक",
    status: {
      resolved: "समाधान भयो",
      inProgress: "प्रगतिमा",
      received: "प्राप्त भयो"
    }
  }
};

interface Complaint {
  id: string;
  title: string;
  category: string;
  status: string;
  date: string;
  location: string;
  upvotes: number;
  hasVoted?: boolean;
}

const mockComplaints: Complaint[] = [
  {
    id: "CMP-2024-001",
    title: "Street light not working",
    category: "Infrastructure",
    status: "In Progress",
    date: "2024-03-15",
    location: "Ward 1, Kathmandu",
    upvotes: 12,
    hasVoted: false,
  },
  {
    id: "CMP-2024-002",
    title: "Garbage not collected for 3 days",
    category: "Sanitation",
    status: "Resolved",
    date: "2024-03-14",
    location: "Ward 3, Kathmandu",
    upvotes: 8,
  },
  {
    id: "CMP-2024-003",
    title: "Water supply issue",
    category: "Utilities",
    status: "Received",
    date: "2024-03-16",
    location: "Ward 5, Kathmandu",
    upvotes: 24,
  },
];

const Complaints = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [showForm, setShowForm] = useState(false);
  const [complaints, setComplaints] = useState(mockComplaints);

  const getStatusText = (status: string) => {
    switch (status) {
      case "Resolved":
        return t.status.resolved;
      case "In Progress":
        return t.status.inProgress;
      case "Received":
        return t.status.received;
      default:
        return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Resolved":
        return "success";
      case "In Progress":
        return "warning";
      case "Received":
        return "info";
      default:
        return "secondary";
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(t.submittedSuccess);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container py-8">
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{t.pageTitle}</h1>
            <p className="text-lg text-muted-foreground">{t.pageDescription}</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} variant="hero">
            <MessageSquare className="mr-2 h-4 w-4" />
            {t.fileNewComplaint}
          </Button>
        </div>

        {/* Submit Form */}
        {showForm && (
          <Card className="mb-8 shadow-elevated">
            <CardHeader>
              <CardTitle>{t.submitComplaint}</CardTitle>
              <CardDescription>{t.submitDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="category">{t.category} *</Label>
                    <Select required>
                      <SelectTrigger id="category">
                        <SelectValue placeholder={t.selectCategory} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="infrastructure">{t.infrastructure}</SelectItem>
                        <SelectItem value="sanitation">{t.sanitation}</SelectItem>
                        <SelectItem value="utilities">{t.utilities}</SelectItem>
                        <SelectItem value="transport">{t.transport}</SelectItem>
                        <SelectItem value="other">{t.other}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">{t.location} *</Label>
                    <Input id="location" placeholder={t.locationPlaceholder} required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="title">{t.complaintTitle} *</Label>
                  <Input id="title" placeholder={t.titlePlaceholder} required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">{t.description} *</Label>
                  <Textarea
                    id="description"
                    placeholder={t.descriptionPlaceholder}
                    rows={5}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photo">{t.attachPhoto}</Label>
                  <div className="flex items-center gap-2">
                    <Input id="photo" type="file" accept="image/*,video/*" />
                    <Upload className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {t.photoHelp}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    <MessageSquare className="mr-2 h-4 w-4" />
                    {t.submit}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                    {t.cancel}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Track Complaint */}
        <Card className="mb-8 border-primary/50 bg-primary/5">
          <CardContent className="flex items-center gap-4 p-6">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold mb-1">{t.trackComplaint}</h3>
              <p className="text-sm text-muted-foreground">
                {t.trackDescription}
              </p>
            </div>
            <div className="flex gap-2">
              <Input placeholder={t.trackIdPlaceholder} className="w-40" />
              <Button>{t.track}</Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Complaints */}
        <div className="mb-4">
          <h2 className="text-2xl font-bold">{t.recentComplaints}</h2>
          <p className="text-muted-foreground">{t.recentDescription}</p>
        </div>

        <div className="grid gap-6">
          {mockComplaints.map((complaint) => (
            <Card key={complaint.id} className="shadow-card hover:shadow-elevated transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-lg">{complaint.title}</CardTitle>
                      <Badge variant={getStatusColor(complaint.status) as any}>
                        {getStatusText(complaint.status)}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {complaint.location}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {complaint.date}
                      </span>
                      <span>•</span>
                      <Badge variant="outline" className="text-xs">
                        {complaint.category}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-1 ml-4">
                    <Button 
                      size="sm" 
                      variant={complaint.hasVoted ? "default" : "outline"}
                      className={`h-8 px-3 transition-all ${complaint.hasVoted ? 'bg-primary text-primary-foreground' : ''}`}
                      onClick={() => {
                        if (!complaint.hasVoted) {
                          setComplaints(complaints.map(c => 
                            c.id === complaint.id 
                              ? { ...c, upvotes: c.upvotes + 1, hasVoted: true }
                              : c
                          ));
                          toast.success(t.upvotedSuccess);
                        } else {
                          setComplaints(complaints.map(c => 
                            c.id === complaint.id 
                              ? { ...c, upvotes: c.upvotes - 1, hasVoted: false }
                              : c
                          ));
                          toast.info(t.voteRemoved);
                        }
                      }}
                    >
                      <span className={`text-lg ${complaint.hasVoted ? 'text-primary-foreground' : ''}`}>▲</span>
                    </Button>
                    <span className="text-sm font-semibold">
                      {complaint.upvotes.toLocaleString()}
                    </span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span className="font-mono">{complaint.id}</span>
                  <span>•</span>
                  <span>{t.viewDetails}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
