import { atomResolution, atomUserDetailInfo } from "@/utils/recoil/atoms";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useRecoilRefresher_UNSTABLE,
  useRecoilState,
  useRecoilValue,
  useRecoilValueLoadable,
} from "recoil";
import * as S from "./styles";
import SearchButton from "../common/SearchButton";

const Header = () => {
  const resolution = useRecoilValue(atomResolution);
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const router = useRouter();

  const onClickLogout = () => {
    setUserInfo(null);
  };

  return (
    <S.MainContainer isMobile={resolution === "MOBILE"}>
      <S.RowBox style={{ flex: 1, marginLeft: 30, fontSize: 30 }}>
        {userInfo ? "Login" : "Logout"}
      </S.RowBox>
      <S.RowBox
        style={{ flex: 1, flexDirection: "row-reverse", marginRight: 30 }}
      >
        {userInfo ? (
          <SearchButton title={"로그아웃"} handleSearch={onClickLogout} />
        ) : null}
      </S.RowBox>
    </S.MainContainer>
  );
};

export default Header;
