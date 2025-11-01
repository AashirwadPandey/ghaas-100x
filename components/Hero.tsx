import { Button } from "@/components/ui/button";
import { Search, Building2, FileText, MessageSquare, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/language-context";

const features = [
  {
    icon: Building2,
    title: "Government Offices",
    titleNp: "सरकारी कार्यालयहरू",
    description: "Find verified office contacts and locations",
    link: "/offices",
  },
  {
    icon: FileText,
    title: "Services & Procedures",
    titleNp: "सेवा र प्रक्रियाहरू",
    description: "Step-by-step guides and forms",
    link: "/services",
  },
  {
    icon: MessageSquare,
    title: "File Complaints",
    titleNp: "गुनासो दर्ता गर्नुहोस्",
    description: "Track your complaints with ease",
    link: "/complaints",
  },
  {
    icon: Briefcase,
    title: "Tenders & Projects",
    titleNp: "बोलपत्र र परियोजनाहरू",
    description: "Browse public procurement opportunities",
    link: "/tenders",
  },
];

const translations = {
  en: {
    title: "Your Gateway to Government Services",
    subtitle: "Making access to government services easier",
    description: "Find Government offices, complete procedures, track complaints, and discover tenders,",
    allInOne: "all in one place",
    findOffice: "Find an Office",
    browseServices: "Browse Services"
  },
  np: {
    title: "सरकारी सेवाहरूको प्रवेशद्वार",
    subtitle: "सरकारी सेवाहरूमा पहुँच सजिलो बनाउँदै",
    description: "सरकारी कार्यालयहरू पत्ता लगाउनुहोस्, प्रक्रियाहरू पूरा गर्नुहोस्, गुनासोहरू ट्र्याक गर्नुहोस्, र बोलपत्रहरू खोज्नुहोस्,",
    allInOne: "सबै एकै ठाउँमा",
    findOffice: "कार्यालय खोज्नुहोस्",
    browseServices: "सेवाहरू हेर्नुहोस्"
  }
};

export const Hero = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="container relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-6xl">
              {t.title}
            </h1>
            <p className="mb-4 text-lg text-primary-foreground/90 md:text-xl">
              {t.subtitle}
            </p>
            <p className="mb-8 text-base text-primary-foreground/80 md:text-lg">
              {t.description}<b><i><br></br> {t.allInOne}</i></b>
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/offices">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <Building2 className="mr-2 h-5 w-5" />
                  {t.findOffice}
                </Button>
              </Link>
              <Link to="/services">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-primary-foreground hover:bg-white/20">
                  <FileText className="mr-2 h-5 w-5" />
                  {t.browseServices}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <Link key={feature.link} to={feature.link}>
                <div className="group h-full rounded-lg border bg-card p-6 shadow-card transition-all hover:shadow-elevated hover:border-primary/50">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">{language === "en" ? feature.title : feature.titleNp}</h3>
                  <p className="mb-1 text-sm text-muted-foreground">{language === "en" ? feature.titleNp : feature.title}</p>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
