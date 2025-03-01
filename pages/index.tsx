import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./styles";
import SearchButton from "@/components/common/SearchButton";
import SearchInput from "@/components/common/SearchInput";
import { fetchSummonerByRiotId } from "@/utils/api/api";
import { useRecoilState } from "recoil";
import { atomUserDetailInfo } from "@/utils/recoil/atoms";
import ProfileCard from "@/components/ProfileCard";
import LayoutBodyOnly from "@/layout/LayoutBodyOnly";

export type getNameTag = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

export const getServerSideProps = async (context: any) => {
  const { name } = context.query;

  if (!name) {
    return { props: { summonerInfo: null } };
  }

  try {
    const summonerInfo = await fetchSummonerByRiotId(name);
    return {
      props: { summonerInfo, error: false },
    };
  } catch (error) {
    console.error("Error fetching summoner:", error);
    return {
      props: { summonerInfo: null, error: true },
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
        <S.MainContainer>
          <S.BodyContainer>
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <ProfileCard />
              </motion.div>
            </AnimatePresence>
          </S.BodyContainer>
        </S.MainContainer>
      )}
    </>
  );
};

export default Home;
