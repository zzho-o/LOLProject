export type TMatchRecord = {
  gameId: number;
  gameCreation: number;
  gameDuration: number;
  gameEndTimestamp: number;
  gameMode: string;
  gameType: string;
  gameVersion: string;
  mapId: number;
  queueId: number;
  platformId: string;
  teams: Team[];
  participants: Participant[];
};

export type Team = {
  teamId: number;
  win: boolean;
  bans: Ban[];
  objectives: Objectives;
};

export type Ban = {
  championId: number;
  pickTurn: number;
};

export type Objectives = {
  baron: { first: boolean; kills: number };
  dragon: { first: boolean; kills: number };
  champion: { first: boolean; kills: number };
  inhibitor: { first: boolean; kills: number };
  tower: { first: boolean; kills: number };
  riftHerald: { first: boolean; kills: number };
};

export type Participant = {
  summonerName: string;
  puuid: string;
  championId: number;
  teamId: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  goldEarned: number;
  totalMinionsKilled: number;
};

export type SignUpPayload = {
  email: string;
  password: string;
  nickname: string;
  gender: "male" | "female" | null;
  birth: string | null;
  hide_gender: boolean;
  hide_birth: boolean;
};
