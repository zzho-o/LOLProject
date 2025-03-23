import { atomResolution } from "@/utils/recoil/atoms";
import { Box } from "@chakra-ui/react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import * as S from "./styles";
import Margin from "@/components/common/Margin";
import { colors } from "@/config/globalColors";

const UserTier = ({ userLeagueInfo }) => {
  const resolution = useRecoilValue(atomResolution);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {userLeagueInfo.length ? (
        <Image
          src={
            userLeagueInfo?.[0].tier === "CHALLENGER"
              ? "/assets/TierChallenger.png"
              : userLeagueInfo?.[0].tier === "GRANDMASTER"
              ? "/assets/TierGrandMaster.png"
              : userLeagueInfo?.[0].tier === "MASTER"
              ? "/assets/TierMaster.png"
              : userLeagueInfo?.[0].tier === "DIAMOND"
              ? "/assets/TierDiamond.png"
              : userLeagueInfo?.[0].tier === "EMERALD"
              ? "/assets/TierEmerald.png"
              : userLeagueInfo?.[0].tier === "PLATINUM"
              ? "/assets/TierPlatinum.png"
              : userLeagueInfo?.[0].tier === "GOLD"
              ? "/assets/TierGold.png"
              : userLeagueInfo?.[0].tier === "SILVER"
              ? "/assets/TierSilver.png"
              : userLeagueInfo?.[0].tier === "BRONZE"
              ? "/assets/TierBronze.png"
              : "/assets/TierIron.png"
          }
          alt="champion"
          width={resolution === "MOBILE" ? 100 : 150}
          height={resolution === "MOBILE" ? 100 : 150}
          quality={100}
          draggable={false}
        />
      ) : (
        <Image
          src={"/assets/unranked.png"}
          alt="champion"
          width={resolution === "MOBILE" ? 100 : 150}
          height={resolution === "MOBILE" ? 100 : 150}
          quality={100}
          draggable={false}
        />
      )}

      {resolution === "MOBILE" ? (
        userLeagueInfo.length ? (
          <S.RowBox
            style={{
              fontSize: 20,
              color: colors.WHITE,
              textShadow: "2px 2px 4px black",
            }}
          >
            <Margin W={20} />
            {`${userLeagueInfo?.[0].tier} ${
              ["CHALLENGER", "GRANDMASTER", "MASTER"].includes(
                userLeagueInfo?.[0].tier
              )
                ? ""
                : userLeagueInfo?.[0].rank
            }`}
          </S.RowBox>
        ) : (
          <S.RowBox
            style={{
              fontSize: 20,
              color: colors.WHITE,
              textShadow: "2px 2px 4px black",
            }}
          >
            <Margin W={20} />
            {`UNRANKED`}
          </S.RowBox>
        )
      ) : null}
    </Box>
  );
};

export default UserTier;
