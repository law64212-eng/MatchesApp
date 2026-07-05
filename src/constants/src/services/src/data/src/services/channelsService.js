import { CHANNELS_TEMPLATE } from '../data/channelsTemplate';

const REMOTE_JSON_URL = ''; // <-- ضع رابطك هنا لاحقًا

let cachedChannelsData = null;

export async function getChannelsData({ forceRefresh = false } = {}) {
  if (cachedChannelsData && !forceRefresh) {
    return cachedChannelsData;
  }

  if (!REMOTE_JSON_URL) {
    cachedChannelsData = CHANNELS_TEMPLATE;
    return cachedChannelsData;
  }

  try {
    const response = await fetch(REMOTE_JSON_URL, { cache: 'no-store' });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const json = await response.json();
    cachedChannelsData = json;
    return json;
  } catch (error) {
    console.warn('تعذّر جلب بيانات القنوات، استخدام النسخة المحلية:', error);
    cachedChannelsData = CHANNELS_TEMPLATE;
    return cachedChannelsData;
  }
}
