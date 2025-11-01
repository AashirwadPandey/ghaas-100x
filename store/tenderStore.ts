import { create } from 'zustand';
import tenders from '../../server/tenders.json';

export interface Tender {
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
  requiredDocumentsChecklist?: string[];
  procedureChecklist?: string[];
  documents?: Array<{ name: string; url: string }>;
  contact?: {
    officeContact?: string;
    email?: string;
  };
}

interface TenderState {
  tenders: Tender[];
  currentPage: number;
  itemsPerPage: number;
  filters: {
    category: string;
    search: string;
  };
  setCurrentPage: (page: number) => void;
  setFilters: (filters: Partial<TenderState['filters']>) => void;
  getFilteredTenders: () => Tender[];
  getPaginatedTenders: () => Tender[];
  getTotalPages: () => number;
  getCategories: () => string[];
  getTendersByCategory: (category: string) => number;
  getTenderById: (id: string) => Tender | undefined;
}

export const useTenderStore = create<TenderState>((set, get) => ({
  tenders: tenders as Tender[],
  currentPage: 1,
  itemsPerPage: 10,
  filters: {
    category: 'All',
    search: '',
  },

  setCurrentPage: (page: number) => set({ currentPage: page }),

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    }));
  },

  getFilteredTenders: () => {
    const { tenders, filters } = get();
    return tenders.filter((tender) => {
      const matchesCategory = filters.category === 'All' || tender.category === filters.category;
      const matchesSearch = !filters.search || 
        tender.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        tender.description.toLowerCase().includes(filters.search.toLowerCase()) ||
        tender.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        tender.office.toLowerCase().includes(filters.search.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  },

  getPaginatedTenders: () => {
    const { currentPage, itemsPerPage } = get();
    const filteredTenders = get().getFilteredTenders();
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return filteredTenders.slice(startIndex, endIndex);
  },

  getTotalPages: () => {
    const { itemsPerPage } = get();
    const filteredTenders = get().getFilteredTenders();
    return Math.ceil(filteredTenders.length / itemsPerPage);
  },

  getCategories: () => {
    const { tenders } = get();
    const categories = new Set(tenders.map(tender => tender.category));
    return ['All', ...Array.from(categories)];
  },

  getTendersByCategory: (category: string) => {
    const { tenders } = get();
    return tenders.filter(tender => tender.category === category).length;
  },

  getTenderById: (id: string) => {
    const { tenders } = get();
    return tenders.find(tender => tender.id === id);
  },
}));