export type TResolution = 'PC' | 'TABLET' | 'MOBILE';

export type TUserDetailInfo = {
  email: string;
  introduction?: string;
  nickname: string;
  notification: { default_noti: boolean; project_notice_noti: boolean; new_project_event_noti: boolean; follower_noti: boolean; vote_noti: boolean };
  profile_image_url: string;
  sentence: string;
  type: string;
};