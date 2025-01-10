import { atom } from "recoil";
import { TResolution, TUserDetailInfo } from "./types";

export const atomResolution = atom<TResolution>({
  key: "atomResolution",
  default: "PC",
});

export const atomNoMatchedNickName = atom<boolean>({
  key: "atomNoMatchedNickName",
  default: false,
});

export const atomScrollY = atom<number>({
  key: "atomScrollY",
  default: 0,
});

export const atomWindow = atom<{ innerWidth: number; innerHeight: number }>({
  key: "atomWindow",
  default: { innerWidth: 0, innerHeight: 0 },
});

export const atomIsLoggedIn = atom<boolean>({
  key: "atomIsLoggedIn",
  default: false,
});

export const atomSummonerPuuid = atom<string>({
  key: "atomSummonerPuuid",
  default: "",
});

export const atomUserDetailInfo = atom<TUserDetailInfo | null>({
  key: "atomUserDetailInfo",
  default: null,
});
