export const DEFAULT_CHAT_HISTORY_LIMIT = 25;
export const MAX_FILES_PER_SELECTION = 5;
export const MAX_TOTAL_ATTACHMENTS = 10;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// TEMPORARY AGENT EXPOSURE CONTROL FOR ROLLOUT
export const PUBLICALLY_AVAILABLE_AGENTS = [];
// Available to system admins without requiring tenant entitlements
export const AGENTS_ROLLING_OUT = ["fannie_mae_specialist"];
