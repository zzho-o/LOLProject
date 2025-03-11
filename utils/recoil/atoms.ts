import { atom } from "recoil";
import { TResolution, TUserDetailInfo } from "./types";

export const atomResolution = atom<TResolution>({
  key: "atomResolution",
  default: "PC",
});

export const atomUserDetailInfo = atom<TUserDetailInfo | null>({
  key: "atomUserDetailInfo",
  default: null,
});

export const atomWindow = atom<{ innerWidth: number; innerHeight: number }>({
  key: "atom_window",
  default: { innerWidth: 0, innerHeight: 0 },
});

export const atomLanguage = atom<any>({
  key: "atomLanguage",
  default: {},
});
