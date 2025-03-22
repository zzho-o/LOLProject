import { motion, AnimatePresence } from "framer-motion";
import * as S from "./styles";
import ProfileCard from "../ProfileCard";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomBackgroundURL,
  atomLanguage,
  atomResolution,
  atomUserDetailInfo,
} from "@/utils/recoil/atoms";
import Margin from "../common/Margin";
import { useEffect, useState } from "react";
import {
  fetchChampionImage,
  fetchLotationChampions,
  fetchSelectChampionImage,
} from "@/utils/api/api";
import { Box, Collapsible } from "@chakra-ui/react";
import { colors } from "@/config/globalColors";
import Image from "next/image";

const LOL = ({ mastery, lotation, userLeagueInfo }) => {
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  const [backgroundURL, setBackgroundURL] = useRecoilState(atomBackgroundURL);
  const language = useRecoilValue(atomLanguage);
  const MobileLotationFirstRow = [];
  const MobileLotationSecondRow = [];

  lotation.forEach((item, idx) => {
    if (idx < Math.ceil(lotation.length / 2)) {
      MobileLotationFirstRow.push(item);
    } else {
      MobileLotationSecondRow.push(item);
    }
  });
  useEffect(() => {
    if (mastery?.[0].championId ?? "") {
      setBackgroundURL(null);
    }

    const fetchImage = async () => {
      try {
        if (mastery?.[0].championId ?? "") {
          const imageurl = await fetchChampionImage(mastery[0]?.championId);
          console.log(imageurl);
          setBackgroundURL(imageurl);
        }
      } catch (err) {
        console.error("Error fetching champion image:", err);
      }
    };

    fetchImage();
  }, [mastery]);
  return (
    <S.MainContainer>
      <Margin H={resolution === "MOBILE" ? 10 : 20} />

      <S.RowBox style={{ width: "100%" }}>
        <Margin W={resolution === "MOBILE" ? 10 : 20} />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard />
          </motion.div>
        </AnimatePresence>
        <Margin W={resolution === "MOBILE" ? 20 : 30} />
        <S.RowBox
          style={{
            fontSize: resolution === "MOBILE" ? 15 : 30,
            color: "white",
            textShadow: "2px 2px 4px black",
          }}
        >
          {userInfo.gameName + "#KR"}
        </S.RowBox>
        <Margin W={resolution === "MOBILE" ? 40 : 20} />
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
                {`${userLeagueInfo?.[0].tier} ${userLeagueInfo?.[0].rank}`}
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
        {resolution === "MOBILE" ? null : userLeagueInfo.length ? (
          <S.RowBox
            style={{
              fontSize: 20,
              color: colors.WHITE,
              textShadow: "2px 2px 4px black",
            }}
          >
            <Margin W={20} />
            {`${userLeagueInfo?.[0].tier} ${userLeagueInfo?.[0].rank}`}
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
        )}
      </S.RowBox>

      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <S.RowBox
        style={{
          justifyContent: "start",
          width: "100%",
        }}
      >
        <Margin W={resolution === "MOBILE" ? 10 : 20} />
        <Collapsible.Root unmountOnExit>
          <Collapsible.Trigger
            paddingY="3"
            style={{
              color: colors.WHITE,
              backgroundColor: colors.NAVY,
              borderRadius: 20,
              padding: 10,
              boxShadow: "2px 2px 4px black",
            }}
          >
            {language.ThisWeeksFreeChampions}
          </Collapsible.Trigger>
          <Collapsible.Content>
            <Box
              padding="4"
              borderWidth="1px"
              style={{ display: "flex", width: "auto" }}
            >
              {resolution === "MOBILE" ? (
                <S.ColumnBox>
                  <S.RowBox>
                    {MobileLotationFirstRow.map((item, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={item}
                          alt="champion"
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                        />
                      );
                    })}
                  </S.RowBox>
                  <S.RowBox>
                    {MobileLotationSecondRow.map((item, idx) => {
                      return (
                        <Image
                          key={idx}
                          src={item}
                          alt="champion"
                          width={30}
                          height={30}
                          quality={100}
                          draggable={false}
                        />
                      );
                    })}
                  </S.RowBox>
                </S.ColumnBox>
              ) : (
                <S.RowBox>
                  {lotation.map((item, idx) => {
                    return (
                      <Image
                        key={idx}
                        src={item}
                        alt="champion"
                        width={30}
                        height={30}
                        quality={100}
                        draggable={false}
                      />
                    );
                  })}
                </S.RowBox>
              )}
            </Box>
          </Collapsible.Content>
        </Collapsible.Root>
      </S.RowBox>
    </S.MainContainer>
  );
};

export default LOL;
