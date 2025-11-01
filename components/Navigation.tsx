import { Building2, FileText, MessageSquare, Briefcase, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/context/language-context";

const navItems = [
  { name: "Offices", nameNp: "कार्यालयहरू", path: "/offices", icon: Building2 },
  { name: "Services", nameNp: "सेवाहरू", path: "/services", icon: FileText },
  { name: "Complaints", nameNp: "गुनासो", path: "/complaints", icon: MessageSquare },
  { name: "Tenders", nameNp: "बोलपत्र", path: "/tenders", icon: Briefcase },
];

export const Navigation = () => {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex items-center gap-2 ${
            mobile ? "text-base py-2" : "text-sm"
          } font-medium transition-colors hover:text-primary ${
            location.pathname === item.path ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <item.icon className="h-4 w-4" />
          <span>{language === "en" ? item.name : item.nameNp}</span>
        </Link>
      ))}
    </>
  );

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero">
            <Building2 className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold leading-none">GHaaS</span>
            <span className="text-xs text-muted-foreground">सरकारी हब</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:gap-6">
          <NavLinks />
        </div>

        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden md:inline-flex"
            onClick={toggleLanguage}
          >
            {language === "en" ? "नेपाली" : "English"}
          </Button>
          
          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-4 mt-6">
                <NavLinks mobile />
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="justify-start"
                  onClick={toggleLanguage}
                >
                  {language === "en" ? "नेपाली" : "English"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};
