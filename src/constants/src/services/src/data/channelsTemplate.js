export const CHANNELS_TEMPLATE = {
  fc_barcelona_real_madrid_cf: [
    {
      channel: 'beIN Sports 1 HD',
      country: 'شبكة عربية (MENA)',
      satellite: 'مثال — تحقق من الرابط الرسمي قبل البث',
      frequency: '—',
      note: 'مثال توضيحي فقط، حدّث القيم الحقيقية من مصدر موثوق',
    },
    {
      channel: 'SSC 1',
      country: 'السعودية',
      satellite: 'مثال',
      frequency: '—',
      note: 'مثال توضيحي فقط',
    },
  ],
};

export function buildMatchKey(homeTeamName, awayTeamName) {
  const normalize = (name) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '_')
      .replace(/[^\w_]/g, '');
  return `${normalize(homeTeamName)}_${normalize(awayTeamName)}`;
}

export function findChannelsForMatch(channelsData, homeTeamName, awayTeamName) {
  const key = buildMatchKey(homeTeamName, awayTeamName);
  return channelsData?.[key] || [];
}
