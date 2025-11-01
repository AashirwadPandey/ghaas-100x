import { Tender } from './types';

export class TenderStorage {
  private tenders: Map<string, Tender> = new Map();
  private lastSyncTimestamp: string | null = null;
  private storageKey = 'prashasan_tenders';

  constructor() {
    this.loadFromLocalStorage();
  }

  private loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        const data = JSON.parse(stored);
        this.tenders = new Map(data.tenders);
        this.lastSyncTimestamp = data.lastSyncTimestamp;
      }
    } catch (error) {
      console.error('Failed to load tenders from storage:', error);
    }
  }

  private saveToLocalStorage() {
    try {
      const data = {
        tenders: Array.from(this.tenders.entries()),
        lastSyncTimestamp: this.lastSyncTimestamp
      };
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save tenders to storage:', error);
    }
  }

  public saveTender(tender: Tender) {
    this.tenders.set(tender.id, tender);
    this.saveToLocalStorage();
  }

  public getTender(id: string): Tender | undefined {
    return this.tenders.get(id);
  }

  public getTenders(since?: string): Tender[] {
    const tenders = Array.from(this.tenders.values());
    if (since) {
      return tenders.filter(tender => tender.publishDate >= since);
    }
    return tenders;
  }

  public getLastSyncTimestamp(): string | null {
    return this.lastSyncTimestamp;
  }

  public updateLastSyncTimestamp(timestamp: string) {
    this.lastSyncTimestamp = timestamp;
    this.saveToLocalStorage();
  }

  public count(): { total: number; open: number; closed: number } {
    let open = 0;
    let closed = 0;

    this.tenders.forEach(tender => {
      if (tender.status === 'Open') {
        open++;
      } else {
        closed++;
      }
    });

    return {
      total: this.tenders.size,
      open,
      closed
    };
  }
}