import { colors } from "@/config/globalColors";
import { fetchSelectChampionImage } from "@/utils/api/api";
import { TMatchRecord } from "@/utils/api/types";
import { Card, Heading, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import CardChampionImg from "./CardChampionImg";
import * as S from "./styles";
import { useRecoilValue } from "recoil";
import { atomLanguage, atomResolution } from "@/utils/recoil/atoms";
import Margin from "@/components/common/Margin";
import { useState } from "react";
import MatchAllChamp from "./MatchAllChamp";
const inspectWin = (match: TMatchRecord, userPuuid: string) => {
  const userInfo = match.participants.find(
    (player) => player.puuid === userPuuid
  );

  if (!userInfo) return null;

  const userTeamId = userInfo.teamId;

  const userTeam = match.teams.find((team) => team.teamId === userTeamId);
  return userTeam?.win || false;
};
const myGameData = (match: TMatchRecord, userPuuid: string) => {
  return match.participants.find(
    (participant: any) => participant.puuid === userPuuid
  );
};
const MatchCard = ({
  userMatchInfo,
  userInfo,
}: {
  userMatchInfo: TMatchRecord[];
  userInfo: any;
}) => {
  const resolution = useRecoilValue(atomResolution);
  const language = useRecoilValue(atomLanguage);
  const getGameType = (queueId: number) => {
    switch (queueId) {
      case 420:
        return language.gameType.ranked_solo;
      case 440:
        return language.gameType.ranked_flex;
      case 400:
        return language.gameType.normal_blind;
      case 430:
        return language.gameType.normal_draft;
      case 450:
        return language.gameType.aram;
      case 490:
        return language.gameType.normal;
      default:
        return language.gameType.unknown;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (index: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
      },
    }),
  };
  return (
    <Stack
      style={{
        width: "100%",
        padding: 30,
      }}
    >
      {userMatchInfo.map((match, index) => {
        const isWin = inspectWin(match, userInfo.puuid);
        const myKdaData = myGameData(match, userInfo.puuid);
        const gameType = getGameType(match.queueId);
        console.log("Match queueId:", match.queueId);

        return (
          <motion.div
            key={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            custom={index}
          >
            <Card.Root
              size="lg"
              style={{
                boxShadow: `0 4px 6px ${colors.BLACK}`,
                backgroundColor: isWin ? colors.VICTORY : colors.DEFEAT,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                padding: 20,
              }}
            >
              <CardChampionImg id={myKdaData.championId} />
              <Margin W={resolution === "MOBILE" ? 20 : 30} />
              <S.RowBox
                style={{
                  fontSize: resolution === "MOBILE" ? 15 : 30,
                  color: "white",
                  textShadow: "2px 2px 4px black",
                }}
              >
                <S.ColumnBox style={{ alignItems: "center" }}>
                  <S.RowBox>
                    {myKdaData
                      ? `${myKdaData.kills} / ${myKdaData.deaths} / ${myKdaData.assists}`
                      : "N/A"}
                  </S.RowBox>
                  <S.RowBox
                    style={{ fontSize: resolution === "MOBILE" ? 12 : 16 }}
                  >
                    {gameType}
                  </S.RowBox>
                </S.ColumnBox>
              </S.RowBox>
              <S.ColumnBox style={{ flexGrow: 1 }}>
                <S.RowBox
                  style={{ width: "100%", flexDirection: "row-reverse" }}
                >
                  <MatchAllChamp match={match} />
                </S.RowBox>
              </S.ColumnBox>
              <S.ColumnBox></S.ColumnBox>
            </Card.Root>
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default MatchCard;
