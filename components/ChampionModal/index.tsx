import { useState } from "react";
import Image from "next/image";
import { RowBox } from "../LOL/styles";
import { useRecoilState } from "recoil";
import { atomOnChampionModal } from "@/utils/recoil/atoms";
import * as S from "./styles";
import {
  allChampions,
  topChampions,
  midChampions,
  jungleChampions,
  adcChampions,
  supportChampions,
} from "./championList";
import { getLatestVersion } from "@/utils/api/api";
import { RiCloseCircleFill } from "react-icons/ri";
import { Button } from "@chakra-ui/react";
import { colors } from "@/config/globalColors";

interface Champion {
  name: string;
  position: string;
  imgUrl: string;
}

const groupedByPosition = (champions: Champion[]) => {
  return champions.reduce((acc: Record<string, Champion[]>, champ) => {
    if (!acc[champ.position]) acc[champ.position] = [];
    acc[champ.position].push(champ);
    return acc;
  }, {});
};

const encodeChampionName = (name: string) => {
  return encodeURIComponent(name);
};

const allChampionsWithPosition: Champion[] = await Promise.all(
  allChampions.map(async (name) => {
    let position = "";
    const version = await getLatestVersion();
    if (topChampions.includes(name)) position = "Top";
    else if (midChampions.includes(name)) position = "Mid";
    else if (jungleChampions.includes(name)) position = "Jungle";
    else if (adcChampions.includes(name)) position = "ADC";
    else if (supportChampions.includes(name)) position = "Support";

    return {
      name,
      position,
      imgUrl: `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${encodeChampionName(
        name
      )}.png`,
    };
  })
);

const ChampionModal = () => {
  const [onModal, setOnModal] = useRecoilState(atomOnChampionModal);
  const [activeTab, setActiveTab] = useState<string>("Top");
  const grouped = groupedByPosition(allChampionsWithPosition);

  return (
    <S.MainContainer>
      <S.ModalContainer>
        <RowBox>
          <Button style={{ backgroundColor: colors.NAVY }}>
            <RiCloseCircleFill
              onClick={() => {
                setOnModal(false);
              }}
            />
          </Button>
        </RowBox>
        <div style={{ marginBottom: "20px" }}>
          {["Top", "Mid", "Jungle", "ADC", "Support"].map((position) => (
            <button
              key={position}
              onClick={() => setActiveTab(position)}
              style={{
                padding: "10px",
                marginRight: "10px",
                backgroundColor: activeTab === position ? "lightblue" : "gray",
                border: "none",
                borderRadius: "5px",
              }}
            >
              {position}
            </button>
          ))}
        </div>

        <div className="modal-body">
          <RowBox style={{ flexWrap: "wrap" }}>
            {/* 임시 */}
            {grouped[activeTab]?.map((champ) => (
              <div
                key={champ.name}
                style={{ margin: "10px", textAlign: "center" }}
              >
                <Image
                  src={champ.imgUrl}
                  alt={champ.name}
                  width={100}
                  height={100}
                  style={{ borderRadius: "8px" }}
                />
                <p>{champ.name}</p>
              </div>
            ))}
          </RowBox>
        </div>
      </S.ModalContainer>
    </S.MainContainer>
  );
};

export default ChampionModal;
