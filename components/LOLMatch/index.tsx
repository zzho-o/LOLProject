import { useRecoilState } from "recoil";
import SearchInput from "../common/SearchInput";
import { motion, AnimatePresence } from "framer-motion";
import { atomBackgroundURL, atomUserDetailInfo } from "@/utils/recoil/atoms";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LOL from "../LOL";
import { fetchSelectChampionImage } from "@/utils/api/api";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const LOLMatch = ({
  summonerInfo,
  mastery,
  lotation,
  userLeagueInfo,
  userMatchInfo,
  error,
}: LOLMatchProps) => {
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const [summonerName, setSummonerName] = useState("");
  const [backgroundURL, setBackgroundURL] = useRecoilState(atomBackgroundURL);
  const [lotationUrl, setLotationUrl] = useState([]);
  const router = useRouter();
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
  const handleSearch = () => {
    if (summonerName.trim()) {
      router.push(`/Home/?name=${summonerName}`);
    }
  };

  return (
    <>
      {userInfo ? (
        <LOL
          mastery={mastery}
          lotation={lotation}
          userLeagueInfo={userLeagueInfo}
          userMatchInfo={userMatchInfo}
        />
      ) : (
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
      )}
    </>
  );
};

export default LOLMatch;
