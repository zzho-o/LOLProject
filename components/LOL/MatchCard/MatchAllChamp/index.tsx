import { colors } from "@/config/globalColors";
import { fetchSelectChampionImage } from "@/utils/api/api";
import { useEffect, useState } from "react";
import * as S from "./styles";
import Image from "next/image";

const MatchAllChamp = ({ match }) => {
  const [participantImgs, setParticipantImgs] = useState({});
  const [team1Imgs, setTeam1Imgs] = useState([]);
  const [team2Imgs, setTeam2Imgs] = useState([]);

  useEffect(() => {
    const fetchParticipantImages = async () => {
      const team1: string[] = [];
      const team2: string[] = [];

      for (const participant of match.participants) {
        const champImg = await fetchSelectChampionImage(
          String(participant.championId)
        );
        if (participant.teamId === 100) {
          team1.push(champImg);
        } else {
          team2.push(champImg);
        }
      }

      setTeam1Imgs(team1);
      setTeam2Imgs(team2);
    };
    fetchParticipantImages();
  }, [match]);

  return (
    <S.RowBox
      style={{
        display: "flex",
        flexDirection: "row-reverse",
        backgroundColor: "#123123",
        flex: 1,
      }}
    >
      <S.ColumnBox>
        {team1Imgs.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt="Team 1 Champ"
            width={30}
            height={30}
          />
        ))}
      </S.ColumnBox>
      {/* 2팀 챔피언 이미지 */}
      <S.ColumnBox>
        {team2Imgs.map((img, idx) => (
          <Image
            key={idx}
            src={img}
            alt="Team 2 Champ"
            width={30}
            height={30}
          />
        ))}
      </S.ColumnBox>
    </S.RowBox>
  );
};

export default MatchAllChamp;
