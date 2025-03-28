import axios from "axios";
import { TMatchRecord } from "./types";
import pLimit from "p-limit";

const getLatestVersion = async () => {
  const response = await axios.get(
    "https://ddragon.leagueoflegends.com/api/versions.json"
  );
  return response.data[0];
};
const RIOT_ACCOUNT_API = axios.create({
  baseURL: process.env.RIOT_API_ACCOUNT_BASE_URL,
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

const RIOT_ASIA_API = axios.create({
  baseURL: process.env.RIOT_API_ASIA,
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
      `/lol/summoner/v4/summoners/by-puuid/${puuid.data.puuid}`
    );
    console.log(puuid);
    return { ...puuid.data, ...response.data };
  } catch (error: any) {
    console.error("Error fetching summoner by Riot ID:", error.response?.data);
    throw error;
  }
};

/**
 * GAME_IMAGE
 */

export const fetchSummonerImage = async (profileIconId: number) => {
  try {
    const version = await getLatestVersion();
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`;
  } catch (error) {
    console.error("Error fetching summoner image:", error);
    throw error;
  }
};

export const fetchChampionName = async (championIconId: string) => {
  try {
    const version = await getLatestVersion();
    const response = await axios.get(
      `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
    );
    const champions = response.data.data;
    for (let i in champions) {
      if (champions[i].key === String(championIconId)) {
        return i;
      }
    }
  } catch (error) {
    console.error("Error fetching champion Name:", error);
    throw error;
  }
};

export const fetchChampionImage = async (championIconId: string) => {
  try {
    const championName = await fetchChampionName(championIconId);
    return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championName}_1.jpg`;
  } catch (error) {
    console.error("Error fetching champion image:", error);
    throw error;
  }
};

export const fetchSelectChampionImage = async (championIconId: string) => {
  const version = await getLatestVersion();
  const championName = await fetchChampionName(championIconId);
  try {
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
  } catch (error) {
    console.error("Error fetching champion image:", error);
    throw error;
  }
};

/**
 * USER_INFO
 */
export const fetchSummonerMastery = async (puuid: string) => {
  const url = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}`;

  try {
    const response = await RIOT_SUMMONER_API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching summoner image:", error);
    throw error;
  }
};

export const fetchSummonerLeagueInfo = async (puuid: string) => {
  const url = `/lol/league/v4/entries/by-puuid/${puuid}`;
  try {
    const response = await RIOT_SUMMONER_API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Summoner League Info:", error);
    throw error;
  }
};

/**
 * GAME_INFO
 */
export const fetchLotationChampions = async () => {
  const url = `/lol/platform/v3/champion-rotations`;

  try {
    const response = await RIOT_SUMMONER_API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching lotation champions:", error);
    throw error;
  }
};

export const fetchUserMatch = async (puuid: string) => {
  const url = `/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${process.env.RIOT_API_KEY}`;
  try {
    const response = await RIOT_ASIA_API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching Match:", error);
    throw error;
  }
};

export const fetchUserMatchRecord = async (
  puuid: string
): Promise<TMatchRecord[]> => {
  try {
    const matchIds = await fetchUserMatch(puuid);

    const limit = pLimit(3); // 동시에 3개씩 요청 보내기
    const matchs: TMatchRecord[] = await Promise.all(
      matchIds.map((matchId) =>
        limit(async () => {
          const url = `/lol/match/v5/matches/${matchId}`;
          const response = await RIOT_ASIA_API.get(url);
          return response.data.info as TMatchRecord;
        })
      )
    );

    return matchs;
  } catch (error) {
    console.error("Error fetching Match:", error);
    throw error;
  }
};
