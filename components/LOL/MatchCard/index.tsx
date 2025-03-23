import { colors } from "@/config/globalColors";
import { TMatchRecord } from "@/utils/api/types";
import { Card, Heading, Stack } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
const inspectWin = (match: TMatchRecord, userPuuid: string) => {
  const userInfo = match.participants.find(
    (player) => player.puuid === userPuuid
  );

  if (!userInfo) return null;

  const userTeamId = userInfo.teamId;

  const userTeam = match.teams.find((team) => team.teamId === userTeamId);
  return userTeam?.win || false; // team.win 값 반환 (기본값 false)
};
const MatchCard = ({ userMatchInfo, userInfo }) => {
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
    <Stack style={{ width: "100%", padding: 30 }}>
      {userMatchInfo.map((match, index) => {
        const isWin = inspectWin(match, userInfo.puuid);
        console.log(isWin);

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
              }}
            >
              <Card.Header>
                <Heading size="md">{"123123"}</Heading>
              </Card.Header>
            </Card.Root>
          </motion.div>
        );
      })}
    </Stack>
  );
};

export default MatchCard;
