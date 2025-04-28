import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import SearchInput from "@/components/common/SearchInput";
import {
  fetchLotationChampions,
  fetchSelectChampionImage,
  fetchSummonerByRiotId,
  fetchSummonerLeagueInfo,
  fetchSummonerMastery,
  fetchUserMatchRecord,
} from "@/utils/api/api";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomBackgroundURL,
  atomGameTap,
  atomLoggedInUser,
  atomResolution,
  atomUserDetailInfo,
} from "@/utils/recoil/atoms";
import LayoutBodyOnly from "@/layout/LayoutBodyOnly";

export type getNameTag = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { toaster } from "@/components/ui/toaster";
import LOL from "@/components/LOL";
import TFT from "@/components/TFT";
import { dataAttr } from "node_modules/@chakra-ui/react/dist/types/utils";
import SignIn from "./SignIn";
import Margin from "@/components/common/Margin";

export const getServerSideProps = async (context: any) => {
  const { locale, query } = context;
  const { name } = query;

  if (!name) {
    return {
      props: {
        summonerInfo: null,
        mastery: null,
        userLeagueInfo: [],
        userMatchInfo: [],
        lotation: null,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  try {
    const summonerInfo = await fetchSummonerByRiotId(name);
    const mastery = await fetchSummonerMastery(summonerInfo.puuid);
    const lotation = await fetchLotationChampions();
    const userLeagueInfo = await fetchSummonerLeagueInfo(summonerInfo.puuid);
    const userMatchInfo = await fetchUserMatchRecord(summonerInfo.puuid);
    return {
      props: {
        summonerInfo,
        error: false,
        lotation,
        userLeagueInfo,
        userMatchInfo,
        mastery,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching summoner:", error);
    return {
      props: {
        summonerInfo: null,
        error: true,
        mastery: null,
        userLeagueInfo: [],
        userMatchInfo: [],
        lotation: null,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

const Home = ({
  summonerInfo,
  error,
  mastery,
  userMatchInfo,
  lotation,
  userLeagueInfo,
}: any) => {
  const [summonerName, setSummonerName] = useState("");
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const [backgroundURL, setBackgroundURL] = useRecoilState(atomBackgroundURL);
  const [loggedInUser, setLoggedInUser] = useRecoilState(atomLoggedInUser);
  const game = useRecoilValue(atomGameTap);
  const [lotationUrl, setLotationUrl] = useState([]);
  const resolution = useRecoilValue(atomResolution);
  const { t, i18n } = useTranslation(["common"]);

  const handleSearch = () => {
    if (summonerName.trim()) {
      router.push(`/?name=${summonerName}`);
    }
  };
  const fetchImages = async () => {
    if (!lotation?.freeChampionIds) return [];
    const urls = await Promise.all(
      lotation.freeChampionIds.map((id) => fetchSelectChampionImage(id))
    );

    setLotationUrl(urls);
  };
  useEffect(() => {
    setUserInfo(summonerInfo);
    setBackgroundURL(mastery);
    fetchImages();
  }, [summonerInfo]);
  useEffect(() => {
    toaster.dismiss();
    if (userInfo) {
      toaster.create({
        description: t("enjoyit"),
        type: "success",
      });
    }
  }, [userInfo]);

  return (
    <>
      {!loggedInUser ? (
        <>
          <Margin H={resolution === "PC" ? 70 : 50} />
          <SignIn />
        </>
      ) : (
        <LayoutBodyOnly>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SearchInput
              summonerName={summonerName}
              setSummonerName={setSummonerName}
              handleSearch={handleSearch}
              error={error}
            />
          </motion.div>
        </LayoutBodyOnly>
      )}
      {/* 보류중
      {!userInfo ? (
        <LayoutBodyOnly>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <SearchInput
              summonerName={summonerName}
              setSummonerName={setSummonerName}
              handleSearch={handleSearch}
              error={error}
            />
          </motion.div>
        </LayoutBodyOnly>
      ) : (
        <MainContainer>
          {game === "LOL" ? (
            <LOL
              mastery={mastery}
              lotation={lotationUrl}
              userLeagueInfo={userLeagueInfo}
              userMatchInfo={userMatchInfo}
            />
          ) : (
            <TFT />
          )}
        </MainContainer>
      )} */}
    </>
  );
};

export default Home;
export const MainContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

export const ContentsLeftContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
});

export const ContentsRightContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxWidth: 240,
});

export const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
