export const DEFAULT_CONFIG = {
  baseUrl: process.env.BOLPATRA_BASE_URL || 'https://bolpatra.gov.np',
  syncIntervalMinutes: parseInt(process.env.TENDER_SYNC_INTERVAL_MINUTES || '15', 10),
  rateLimitRps: parseInt(process.env.TENDER_RATE_LIMIT_RPS || '1', 10),
  storagePath: process.env.STORAGE_PATH,
  s3Bucket: process.env.S3_BUCKET,
  adminSyncSecret: process.env.ADMIN_SYNC_SECRET,
};