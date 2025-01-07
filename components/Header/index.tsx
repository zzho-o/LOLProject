import {
  atomIsLoggedIn,
  atomResolution,
  atomScrollY,
} from "@/utils/recoil/atoms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import * as S from "./styles";

const Header = () => {
  const resolution = useRecoilValue(atomResolution);
  const [menuOpened, setMenuOpened] = useState(false);
  const [userInfo, setUserInfo] = useRecoilState(atomIsLoggedIn);
  const router = useRouter();

  // useEffect(() => {
  //   getCookie('token')
  //     .then((res:any) => {
  //       const decodedUserInfo: TCookieUser = jwt_decode(res?.access_token);
  //       const curTime = new Date();
  //       const token = new Date(decodedUserInfo?.exp * 1000);

  //       if (token.getTime() > curTime.getTime()) {
  //         setUserInfo(true);
  //       } else {
  //         setUserInfo(false);
  //       }
  //       userProfileRefresher();
  //     })
  //     .catch(e => {
  //       setUserInfo(false);
  //     });
  // }, [router.pathname]);

  // useEffect(() => {
  //   try {
  //     getCookie('token').then(res => {
  //       if (res !== undefined) {
  //         apiNotification
  //           .getNotification(1, 1)
  //           .then(res => (res.count === 0 || res.notifications[0].check ? setHasNewNoti(false) : setHasNewNoti(true)))
  //           .catch(e => {});
  //       }
  //     });
  //   } catch (e) {}
  // }, []);

  // useEffect(() => {
  //   if (userProfileLoadable.state === 'hasValue') {
  //     setUserData(userProfileLoadable?.contents);
  //   }
  // }, [userProfileLoadable]);

  // const onClickTopHeader = () => {
  //   if (window && ad?.url) {
  //     window.open(ad?.url);
  //   }
  // };
  const onClickLogo = () => {
    if (router.asPath === "/") {
      router.reload();
    }
  };

  return <S.MainContainer isMobile={resolution === "MOBILE"}></S.MainContainer>;
};

export default Header;
