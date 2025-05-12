import { motion, AnimatePresence } from "framer-motion";
import * as S from "./styles";
import ProfileCard from "../ProfileCard";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomBackgroundURL,
  atomLoading,
  atomResolution,
  atomUserDetailInfo,
} from "@/utils/recoil/atoms";
import Margin from "../common/Margin";
import { useEffect, useState } from "react";
import { fetchChampionImage } from "@/utils/api/api";
import { Box, Collapsible, Card, Heading, Stack } from "@chakra-ui/react";
import { colors } from "@/config/globalColors";
import Image from "next/image";
import { TMatchRecord } from "@/utils/api/types";
import MatchCard from "./MatchCard";
import LotationChampions from "./LotationChampions";
import UserTier from "./UserTier";
import { useTranslation } from "next-i18next";

const LOL = ({
  mastery,
  lotation,
  userLeagueInfo,
  userMatchInfo,
}: {
  mastery: any;
  lotation: any;
  userLeagueInfo: any;
  userMatchInfo: TMatchRecord[];
}) => {
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  const [backgroundURL, setBackgroundURL] = useRecoilState(atomBackgroundURL);
  const [loading, setLoading] = useRecoilState(atomLoading);
  const { t, i18n } = useTranslation(["common"]);
  setLoading(false);
  const handleResearch = () => {
    setUserInfo(null);
  };

  useEffect(() => {
    if (!mastery?.[0]?.championId || backgroundURL) return;

    const fetchImage = async () => {
      try {
        const imageurl = await fetchChampionImage(mastery[0]?.championId);
        setBackgroundURL(imageurl);
      } catch (err) {
        console.error("Error fetching champion image:", err);
      }
    };

    fetchImage();
  }, [mastery, backgroundURL]);
  return (
    <S.MainContainer>
      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <S.RowBox style={{ width: "100%" }}>
        <Margin W={resolution === "MOBILE" ? 10 : 20} />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard />
          </motion.div>
        </AnimatePresence>
        <Margin W={resolution === "MOBILE" ? 20 : 30} />
        <S.RowBox
          style={{
            fontSize: resolution === "MOBILE" ? 15 : 30,
            color: "white",
            textShadow: "2px 2px 4px black",
          }}
        >
          {userInfo.gameName + "#KR"}
        </S.RowBox>
        <Margin W={resolution === "MOBILE" ? 40 : 20} />
        <UserTier userLeagueInfo={userLeagueInfo} />
        {resolution === "MOBILE" ? null : userLeagueInfo.length ? (
          <S.RowBox
            style={{
              fontSize: 20,
              color: colors.WHITE,
              textShadow: "2px 2px 4px black",
            }}
          >
            <Margin W={20} />
            {`${userLeagueInfo?.[0].tier} ${
              ["CHALLENGER", "GRANDMASTER", "MASTER"].includes(
                userLeagueInfo?.[0].tier
              )
                ? ""
                : userLeagueInfo?.[0].rank
            }`}
          </S.RowBox>
        ) : (
          <S.RowBox
            style={{
              fontSize: 20,
              color: colors.WHITE,
              textShadow: "2px 2px 4px black",
            }}
          >
            <Margin W={20} />
            {`UNRANKED`}
          </S.RowBox>
        )}
      </S.RowBox>
      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <S.RowBox style={{ width: "100%" }}>
        <LotationChampions lotation={lotation.length ?? []} />
        <S.StyledButton onClick={handleResearch}>
          {t("re-search")}
        </S.StyledButton>
      </S.RowBox>
      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <MatchCard userInfo={userInfo} userMatchInfo={userMatchInfo} />
    </S.MainContainer>
  );
};

export default LOL;
