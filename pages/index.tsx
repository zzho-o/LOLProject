import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as S from "./styles";
import SearchButton from "@/components/common/SearchButton";
import SearchInput from "@/components/common/SearchInput";
import { fetchSummonerByRiotId } from "@/utils/api/api";
import { useRecoilState } from "recoil";
import { atomUserDetailInfo } from "@/utils/recoil/atoms";
import ProfileCard from "@/components/ProfileCard";
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
    <S.MainContainer>
      <S.BodyContainer>
        {userInfo ? null : (
          <>
            <SearchInput
              summonerName={summonerName}
              setSummonerName={setSummonerName}
              handleSearch={handleSearch}
              error={error}
            />
            <SearchButton title="적용" handleSearch={handleSearch} />
          </>
        )}
      </S.BodyContainer>
      {error ? <text>일치하는 닉네임이 없습니다.</text> : <></>}
    </S.MainContainer>
  );
};

export default Home;
