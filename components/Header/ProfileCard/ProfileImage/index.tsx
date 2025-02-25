import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { atomUserDetailInfo } from "@/utils/recoil/atoms";
import { fetchSummonerImage } from "@/utils/api/api";
import * as S from "./styles";

const ProfileImage = () => {
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const [profileImgUrl, setProfileImgUrl] = useState(null);

  useEffect(() => {
    if (!userInfo?.profileIconId) {
      setProfileImgUrl(null);
      return;
    }

    const fetchImage = async () => {
      try {
        const imageurl = await fetchSummonerImage(userInfo.profileIconId);
        setProfileImgUrl(imageurl);
      } catch (err) {
        console.error("Error fetching summoner image:", err);
      }
    };

    fetchImage();
  }, [userInfo]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <S.profileImageStyle src={profileImgUrl} alt="Summoner Profile Icon" />
    </motion.div>
  );
};

export default ProfileImage;
