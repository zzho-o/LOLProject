import axios from "axios";

const RIOT_ACCOUNT_API = axios.create({
  baseURL: process.env.RIOT_API_ACCOUNT_BASE_URL, // Riot API의 base URL
  timeout: 1000 * 10,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": process.env.RIOT_API_KEY,
  },
});

const RIOT_SUMMONER_API = axios.create({
  baseURL: process.env.RIOT_API_SUMMONER_BASE_URL,
  timeout: 1000 * 10,
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": process.env.RIOT_API_KEY,
  },
});

/**
 * NICKNAME_SEARCH
 */

export const fetchSummonerByRiotId = async (gameName: string) => {
  try {
    const puuid = await RIOT_ACCOUNT_API.get(
      `/riot/account/v1/accounts/by-riot-id/${gameName}/${process.env.TAG}`
    );
    const response = await RIOT_SUMMONER_API.get(
      `https://KR.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid.data.puuid}`
    );
    return response.data;
  } catch (error: any) {
    console.error("Error fetching summoner by Riot ID:", error.response?.data);
    throw error;
  }
};

export const fetchSummonerByPuuid = {};
