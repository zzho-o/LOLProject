export type TResolution = "PC" | "TABLET" | "MOBILE";

export type TUserDetailInfo = {
  id: string;
  accountId: string;
  puuid: string;
  profileIconId: number;
  revisionDate: number;
  summonerLevel: number;
  gameName: string;
  tagLine: string;
};

export type ToastType = "success" | "error";

export type ToastState = {
  isOpen: boolean;
  message: string;
  type: ToastType;
};
