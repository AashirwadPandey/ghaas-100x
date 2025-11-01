import { TenderParser } from './parser';
import { TenderStorage } from './storage';
import { TenderSyncConfig, TenderSyncStatus } from './types';
import { DEFAULT_CONFIG } from './config';
import { sleep } from '@/lib/utils';

export class TenderSync {
  private parser: TenderParser;
  private storage: TenderStorage;
  private syncInterval: ReturnType<typeof setInterval> | null = null;
  private lastStatus: TenderSyncStatus = {
    lastSync: '',
    new: 0,
    updated: 0,
    failed: 0
  };

  constructor(
    private config: TenderSyncConfig = DEFAULT_CONFIG,
    storage?: TenderStorage
  ) {
    this.parser = new TenderParser(this.config.baseUrl, this.config.rateLimitRps);
    this.storage = storage || new TenderStorage();
  }

  private generateJobId(): string {
    return `sync-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
  }

  private async fetchListingPage(page = 1): Promise<string[]> {
    // In the browser environment, we'll use a backend API endpoint instead
    try {
      const response = await fetch(`/api/tenders/list?page=${page}`);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      return data.tenders || [];
    } catch (error) {
      console.error('Error fetching listing page:', error);
      return [];
    }
  }

  private async fetchTenderDetail(id: string, retries = 3): Promise<any | null> {
    for (let i = 0; i < retries; i++) {
      try {
        const response = await fetch(`/api/tenders/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
      } catch (error) {
        console.error(`Error fetching tender detail (attempt ${i + 1}/${retries}):`, error);
        if (i < retries - 1) {
          // Exponential backoff
          await sleep(Math.pow(2, i) * 1000);
        }
      }
    }
    return null;
  }

  public async syncTenders(): Promise<TenderSyncStatus> {
    const startTime = new Date().toISOString();
    let newCount = 0;
    let updatedCount = 0;
    let failedCount = 0;

    try {
      // Fetch tender list from the API
      const response = await fetch('/api/tenders/list');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const tenderList = await response.json();
      
      for (const tenderSummary of tenderList.tenders) {
        try {
          const existing = this.storage.getTender(tenderSummary.id);
          
          // Fetch full tender details
          const tenderDetail = await this.fetchTenderDetail(tenderSummary.id);
          if (!tenderDetail) {
            failedCount++;
            continue;
          }

          // Parse tender data
          const tender = await this.parser.parseTenderData(tenderDetail);
          
          if (!existing) {
            newCount++;
          } else {
            updatedCount++;
          }
          
          this.storage.saveTender(tender);
        } catch (error) {
          console.error('Error processing tender:', tenderSummary.id, error);
          failedCount++;
        }

        // Respect rate limit between requests
        await sleep(1000 / this.config.rateLimitRps);
      }

      this.storage.updateLastSyncTimestamp(startTime);
      
      this.lastStatus = {
        lastSync: startTime,
        new: newCount,
        updated: updatedCount,
        failed: failedCount
      };

      return this.lastStatus;

    } catch (error) {
      console.error('Sync failed:', error);
      throw error;
    }
  }

  public async startScheduledSync(): Promise<void> {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
    }

    const intervalMs = this.config.syncIntervalMinutes * 60 * 1000;
    
    // Initial sync
    await this.syncTenders().catch(console.error);
    
    // Schedule regular syncs
    this.syncInterval = setInterval(async () => {
      await this.syncTenders().catch(console.error);
    }, intervalMs);
  }

  public stopScheduledSync(): void {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  public getStatus(): TenderSyncStatus {
    return this.lastStatus;
  }

  public async triggerManualSync(): Promise<{ message: string; jobId: string }> {
    const jobId = this.generateJobId();
    
    // Start sync in background
    this.syncTenders().catch(console.error);
    
    return {
      message: 'Sync started',
      jobId
    };
  }
}