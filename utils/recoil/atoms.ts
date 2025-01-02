import { atom } from 'recoil';
import { TResolution, TUserDetailInfo, } from './types';

export const atomResolution = atom<TResolution>({
  key: "atom_Resolution",
  default: 'PC',
});
export const atomScrollY = atom<number>({
  key: "atom_scrollY",
  default: 0,
});
export const atomWindow = atom<{ innerWidth: number; innerHeight: number }>({
  key: "atom_window",
  default: { innerWidth: 0, innerHeight: 0 },
});

export const atomIsLoggedIn = atom({
  key: "atom_user_info",
  default: false,
});

export const atomUserDetailInfo = atom<TUserDetailInfo | null>({
  key: "atom_user_info",
  default: null,
});
