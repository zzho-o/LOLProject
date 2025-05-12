import {
  fetchLotationChampions,
  fetchSummonerByRiotId,
  fetchSummonerLeagueInfo,
  fetchSummonerMastery,
  fetchUserMatchRecord,
} from "@/utils/api/api";
import {
  atomMenuTap,
  atomOnChampionModal,
  atomToastState,
} from "@/utils/recoil/atoms";
import * as S from "../../components/pageStyles/Home/styles";
import { motion, AnimatePresence } from "framer-motion";

export type getNameTag = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRecoilState, useRecoilValue } from "recoil";
import { useState } from "react";
import { colors } from "@/config/globalColors";
import LOLMatch from "@/components/LOLMatch";
import MY from "@/components/MY";
import ChampionModal from "@/components/ChampionModal";

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
  mastery,
  lotation,
  userLeagueInfo,
  userMatchInfo,
  error,
}: any) => {
  const [toast, setToast] = useRecoilState(atomToastState);
  const [activeTab, setActiveTab] = useState("MY");
  const [menu, setMenu] = useRecoilState(atomMenuTap);
  const [onModal, setOnModal] = useRecoilState(atomOnChampionModal);
  type TabType = "MY" | "LOL MATCH";

  const tabs: { id: TabType; label: TabType }[] = [
    { id: "MY", label: "MY" },
    { id: "LOL MATCH", label: "LOL MATCH" },
  ];

  return (
    <>
      {onModal ? <ChampionModal /> : null}
      <S.NavContainer>
        {tabs.map((tab) => (
          <S.TabButton
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setMenu(tab.label);
            }}
            isActive={activeTab === tab.id}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  backgroundColor: colors.PRIMARY,
                }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </S.TabButton>
        ))}
      </S.NavContainer>

      {activeTab === "MY" ? (
        <MY />
      ) : (
        <LOLMatch
          summonerInfo={summonerInfo}
          mastery={mastery}
          lotation={lotation}
          userLeagueInfo={userLeagueInfo}
          userMatchInfo={userMatchInfo}
          error={error}
        />
      )}
    </>
  );
};

export default Home;
