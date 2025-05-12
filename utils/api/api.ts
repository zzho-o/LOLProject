import axios from "axios";
import { SignUpPayload, TMatchRecord } from "./types";
import pLimit from "p-limit";
import { supabase } from "libs/supabase";
import { SetterOrUpdater } from "recoil";

export const getLatestVersion = async () => {
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

let cachedChampionData: Record<string, any> | null = null;

export const getChampionData = async () => {
  if (cachedChampionData) return cachedChampionData;

  const version = await getLatestVersion();
  const response = await axios.get(
    `https://ddragon.leagueoflegends.com/cdn/${version}/data/en_US/champion.json`
  );
  cachedChampionData = response.data.data;
  return cachedChampionData;
};
export const fetchChampionName = async (championIconId: string) => {
  try {
    const champions = await getChampionData();
    for (let key in champions) {
      if (champions[key].key === String(championIconId)) {
        return key;
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
  try {
    const version = await getLatestVersion();
    const championName = await fetchChampionName(championIconId);
    return `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`;
  } catch (error) {
    console.error("Error fetching select champion image:", error);
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

    const limit = pLimit(3);
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

/**
 * SUPA_BASE
 */

export const fetchNicknameDuplicate = async (nickname: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("nickname")
      .eq("nickname", nickname);

    if (error) {
      throw new Error("Database error");
    }

    return {
      isDuplicate: data.length > 0,
    };
  } catch (error) {
    console.error("Error fetching nickname:", error);
    throw new Error("Error fetching nickname");
  }
};

export const signUpWithKakao = async (
  email: string,
  nickname: string,
  gender: string | null,
  birthDate: string | null
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password: "12345678!",
    });

    if (error) throw new Error(error.message);
    const user = data.user;
    if (!user) throw new Error("Failed to get user after sign up");

    const { error: insertError } = await supabase.from("users").insert({
      uuid: user.id,
      email: user.email,
      nickname: nickname,
      gender: gender,
      birthDate: birthDate,
    });

    if (insertError) throw new Error(insertError.message);

    return { success: true };
  } catch (error: any) {
    console.error("Error signing up with Kakao:", error.message);
    return { error: error.message };
  }
};

export const insertUserInfo = async ({
  nickname,
  gender,
  birthDate,
}: {
  nickname: string;
  gender: string | null;
  birthDate: string | null;
}) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error("로그인한 사용자를 찾을 수 없습니다.");
  }

  const { error: insertError } = await supabase.from("users").insert({
    uuid: user.id,
    email: user.email,
    nickname,
    gender,
    birthDate,
  });

  if (insertError) {
    throw new Error(`유저 정보 저장 실패: ${insertError.message}`);
  }

  return true;
};
export const signUpWithEmail = async (
  email: string,
  password: string,
  nickname: string,
  gender: string,
  birthDate: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      if (error.message.includes("email already exists")) {
        return { success: false, error: "이미 가입된 이메일입니다." };
      }
      throw new Error(error.message);
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    if (userError || !userData?.user) {
      throw new Error("회원가입 후 유저 정보 불러오기 실패");
    }

    const user = userData.user;

    const { error: upsertError } = await supabase.from("users").upsert({
      uuid: user.id,
      email: user.email,
      nickname: nickname,
      gender: gender,
      birthDate: birthDate,
    });

    if (upsertError) throw new Error(upsertError.message);

    return { success: true };
  } catch (error: any) {
    console.error("회원가입 실패:", error.message);
    return { success: false, error: error.message };
  }
};

export const fetchEmailDuplicate = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("email")
      .eq("email", email);

    if (error) {
      throw new Error("Database error");
    }

    return {
      isDuplicate: data.length > 0,
    };
  } catch (error) {
    console.error("Error fetching email:", error);
    throw new Error("Error fetching email");
  }
};

export const logoutUser = async (setUser: SetterOrUpdater<Object | null>) => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) throw error;

    setUser(null);

    console.log("로그아웃 성공");
  } catch (error) {
    console.error("로그아웃 실패:", error);
  }
};
