import { atom } from "recoil";
import { TResolution, TUserDetailInfo } from "./types";

export const atomResolution = atom<TResolution>({
  key: "atomResolution",
  default: "PC",
});

export const atomScrollY = atom<number>({
  key: "atomScrollY",
  default: 0,
});

export const atomWindow = atom<{ innerWidth: number; innerHeight: number }>({
  key: "atomWindow",
  default: { innerWidth: 0, innerHeight: 0 },
});

export const atomUserDetailInfo = atom<TUserDetailInfo | null>({
  key: "atomUserDetailInfo",
  default: null,
});
