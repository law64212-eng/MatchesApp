const API_BASE_URL = 'https://api.football-data.org/v4';

const API_TOKEN = 'ضع_مفتاحك_هنا';

const headers = {
  'X-Auth-Token': API_TOKEN,
};

export async function getMatchesByDate(dateISO) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/matches?dateFrom=${dateISO}&dateTo=${dateISO}`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.matches || [];
  } catch (error) {
    console.error('فشل جلب المباريات:', error);
    return [];
  }
}

export async function getMatchesByCompetition(competitionCode) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/competitions/${competitionCode}/matches?status=SCHEDULED,LIVE,IN_PLAY,PAUSED,FINISHED`,
      { headers }
    );
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data.matches || [];
  } catch (error) {
    console.error('فشل جلب مباريات الدوري:', error);
    return [];
  }
}

export async function getMatchById(matchId) {
  try {
    const response = await fetch(`${API_BASE_URL}/matches/${matchId}`, {
      headers,
    });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('فشل جلب تفاصيل المباراة:', error);
    return null;
  }
}
