import { atom } from "recoil";
import { ToastState, TResolution, TUserDetailInfo, UserInfo } from "./types";

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

export const atomMenuTap = atom<"MY" | "LOL MATCH">({
  key: "atomGameTap",
  default: "MY",
});

export const atomBackgroundURL = atom<string>({
  key: "atomBackgroundURL",
  default: "",
});

export const atomLoggedInUser = atom<any>({
  key: "atomLoggedInUser",
  default: null,
});

export const atomLoading = atom<boolean>({
  key: "atomLoading",
  default: false,
});

export const atomToastState = atom<ToastState>({
  key: "atomToastState",
  default: {
    isOpen: false,
    message: "",
    type: "success",
  },
});

export const atomUserState = atom<UserInfo | null>({
  key: "atomUserState",
  default: null,
});
