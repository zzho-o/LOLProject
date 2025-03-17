import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
// import * as S from "../components/HomeStyles";
import styled from "@emotion/styled";
import SearchButton from "@/components/common/SearchButton";
import SearchInput from "@/components/common/SearchInput";
import { fetchSummonerByRiotId } from "@/utils/api/api";
import { useRecoilState } from "recoil";
import { atomLanguage, atomUserDetailInfo } from "@/utils/recoil/atoms";
import ProfileCard from "@/components/ProfileCard";
import LayoutBodyOnly from "@/layout/LayoutBodyOnly";

export type getNameTag = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

export const getServerSideProps = async (context: any) => {
  const { locale, query } = context;
  const { name } = query;

  if (!name) {
    return {
      props: {
        summonerInfo: null,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  try {
    const summonerInfo = await fetchSummonerByRiotId(name);
    return {
      props: {
        summonerInfo,
        error: false,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching summoner:", error);
    return {
      props: {
        summonerInfo: null,
        error: true,
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

const Home = ({ summonerInfo, error }: any) => {
  const [summonerName, setSummonerName] = useState("");
  const router = useRouter();
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);

  const handleSearch = () => {
    if (summonerName.trim()) {
      router.push(`/?name=${summonerName}`);
    }
  };
  useEffect(() => {
    setUserInfo(summonerInfo);
  }, [summonerInfo]);

  return (
    <>
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
          <BodyContainer>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProfileCard />
              </motion.div>
            </AnimatePresence>
          </BodyContainer>
        </MainContainer>
      )}
    </>
  );
};

export default Home;
export const MainContainer = styled.div({
  display: "flex",
  flex: 1,
  backgroundColor: "#FFFFFF",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

export const BodyContainer = styled.div({
  display: "flex",
  maxWidth: 940,
  position: "relative",
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
