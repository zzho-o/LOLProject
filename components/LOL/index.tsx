import { motion, AnimatePresence } from "framer-motion";
import * as S from "./styles";
import ProfileCard from "../ProfileCard";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomBackgroundURL,
  atomResolution,
  atomUserDetailInfo,
} from "@/utils/recoil/atoms";
import Margin from "../common/Margin";
import { useEffect, useState } from "react";
import {
  fetchChampionImage,
  fetchLotationChampions,
  fetchSelectChampionImage,
} from "@/utils/api/api";
import { Box, Collapsible, Card, Heading, Stack } from "@chakra-ui/react";
import { colors } from "@/config/globalColors";
import Image from "next/image";
import { TMatchRecord } from "@/utils/api/types";
import MatchCard from "./MatchCard";
import LotationChampions from "./LotationChampions";
import UserTier from "./UserTier";

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
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  const [backgroundURL, setBackgroundURL] = useRecoilState(atomBackgroundURL);

  useEffect(() => {
    if (mastery?.[0].championId ?? "") {
      setBackgroundURL(null);
    }

    const fetchImage = async () => {
      try {
        if (mastery?.[0].championId ?? "") {
          const imageurl = await fetchChampionImage(mastery[0]?.championId);
          setBackgroundURL(imageurl);
        }
      } catch (err) {
        console.error("Error fetching champion image:", err);
      }
    };

    fetchImage();
  }, [mastery]);
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
      <LotationChampions lotation={lotation} />

      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <MatchCard userInfo={userInfo} userMatchInfo={userMatchInfo} />
    </S.MainContainer>
  );
};

export default LOL;
