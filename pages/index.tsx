import { useState } from "react";
import { useRouter } from "next/router";
import * as S from "./styles";
import SearchButton from "@/components/common/SearchButton";
import SearchInput from "@/components/common/SearchInput";
import { getIronSession } from "iron-session";
import { fetchSummonerByRiotId } from "@/utils/api/api";
import { atomNoMatchedNickName } from "@/utils/recoil/atoms";
import { useRecoilState } from "recoil";

export const getServerSideProps = async (context: any) => {
  const { name } = context.query;
  // const [error, setError] = useRecoilState(atomNoMatchedNickName);

  if (!name) {
    return { props: { summonerInfo: null } };
  }

  try {
    const summonerInfo = await fetchSummonerByRiotId(name);
    console.log(summonerInfo);
    return {
      props: { summonerInfo },
    };
  } catch (error) {
    // setError(true);
    console.error("Error fetching summoner:", error);
    return {
      props: { summonerInfo: null },
    };
  }
};

const Home = () => {
  const [summonerName, setSummonerName] = useState("");
  const router = useRouter();
  const [error, setError] = useRecoilState(atomNoMatchedNickName);

  const handleSearch = () => {
    if (summonerName.trim()) {
      router.push(`/?name=${summonerName}`);
    }
  };

  return (
    <S.MainContainer>
      <S.BodyContainer>
        <SearchInput
          summonerName={summonerName}
          setSummonerName={setSummonerName}
          handleSearch={handleSearch}
          error={error}
        />
        <SearchButton title="적용" handleSearch={handleSearch} />
      </S.BodyContainer>
    </S.MainContainer>
  );
};

export default Home;
