import { create } from 'zustand';
import staticTenders from '../../server/tenders.json';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

interface Tender {
  id: string;
  title: string;
  category: string;
  office: string;
  budget: string;
  deadline: string;
  publishDate: string;
  status: string;
  location: string;
  description: string;
}

interface TenderStore {
  tenders: Tender[];
  filteredTenders: Tender[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  activeCategory: string;
  searchQuery: string;
  setCurrentPage: (page: number) => void;
  setActiveCategory: (category: string) => void;
  setSearchQuery: (query: string) => void;
  filterTenders: () => void;
}

const useTenderStore = create<TenderStore>((set, get) => ({
  tenders: staticTenders as Tender[],
  filteredTenders: [],
  currentPage: 1,
  itemsPerPage: 10,
  totalPages: Math.ceil(staticTenders.length / 10),
  activeCategory: 'All',
  searchQuery: '',

  setCurrentPage: (page) => set({ currentPage: page }),
  setActiveCategory: (category) => {
    set({ activeCategory: category, currentPage: 1 });
    get().filterTenders();
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1 });
    get().filterTenders();
  },
  filterTenders: () => {
    const { tenders, activeCategory, searchQuery, itemsPerPage } = get();
    
    const filtered = tenders.filter((tender) => {
      const matchesCategory = activeCategory === 'All' || tender.category === activeCategory;
      const matchesSearch = !searchQuery || 
        tender.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tender.office.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });

    set({ 
      filteredTenders: filtered,
      totalPages: Math.ceil(filtered.length / itemsPerPage)
    });
  }
}));

export const TendersList = () => {
  const { 
    filteredTenders, 
    currentPage, 
    itemsPerPage,
    totalPages,
    setCurrentPage,
  } = useTenderStore();

  useEffect(() => {
    useTenderStore.getState().filterTenders();
  }, []);

  const getCurrentPageTenders = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTenders.slice(startIndex, endIndex);
  };

  const getDaysLeft = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {getCurrentPageTenders().map((tender) => {
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
                    <span className="text-muted-foreground">{tender.office}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">{tender.location}</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {tender.deadline}
                      <span className="ml-2">
                        ({daysLeft > 0 ? `${daysLeft} days left` : 'Expired'})
                      </span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="default" className="flex-1">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="flex items-center px-4">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export const TenderFilters = () => {
  const { 
    tenders, 
    activeCategory, 
    searchQuery, 
    setActiveCategory, 
    setSearchQuery 
  } = useTenderStore();

  const categories = ['All', ...new Set(tenders.map(tender => tender.category))];

  return (
    <div className="space-y-4 mb-6">
      <input
        type="text"
        placeholder="Search tenders..."
        className="w-full px-4 py-2 rounded-md border"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>
    </div>
  );
};