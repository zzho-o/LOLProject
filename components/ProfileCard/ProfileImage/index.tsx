import { useRecoilValue } from "recoil";
import * as S from "./styles";
import { atomResolution, atomUserDetailInfo } from "@/utils/recoil/atoms";
import { fetchSummonerImage } from "@/utils/api/api";
import { useEffect, useState } from "react";

const ProfileImage = ({ summonerInfo, error }: any) => {
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const resolution = useRecoilValue(atomResolution);
  useEffect(() => {
    if (!userInfo?.profileIconId) {
      setProfileImgUrl(null);
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
    <S.MainContainer>
      <S.profileImageStyle
        width={resolution === "MOBILE" ? 70 : 100}
        height={resolution === "MOBILE" ? 70 : 100}
        src={profileImgUrl}
        alt="profile"
      />
    </S.MainContainer>
  );
};

export default ProfileImage;
