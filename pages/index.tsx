import { useState } from "react";
import { useRouter } from "next/router";
import * as S from "./styles";
import SearchButton from "@/components/common/SearchButton";
import SearchInput from "@/components/common/SearchInput";
import { getIronSession } from "iron-session";
import { fetchSummonerByRiotId } from "@/utils/api/api";

export const getServerSideProps = async (context: any) => {
  const { name } = context.query;

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
    console.error("Error fetching summoner:", error);
    return {
      props: { summonerInfo: null },
    };
  }
};

const Home = () => {
  const [summonerName, setSummonerName] = useState("");
  const router = useRouter();

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
        />
        <SearchButton title="검색" handleSearch={handleSearch} />
      </S.BodyContainer>
    </S.MainContainer>
  );
};

export default Home;
