import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import Image from "next/image";
import * as S from "./styles";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { RowBox } from "../LOL/styles";
import { RiAddBoxLine } from "react-icons/ri";
import { colors } from "@/config/globalColors";
import { useRecoilState } from "recoil";
import { atomOnChampionModal } from "@/utils/recoil/atoms";

const dummyChampions = [
  { name: "Ahri", imgUrl: "/champions/Ahri.png" },
  { name: "Yasuo", imgUrl: "/champions/Yasuo.png" },
  { name: "Lux", imgUrl: "/champions/Lux.png" },
  { name: "Ezreal", imgUrl: "/champions/Ezreal.png" },
  { name: "Jinx", imgUrl: "/champions/Jinx.png" },
];

const MY = () => {
  const [onModal, setOnModal] = useRecoilState(atomOnChampionModal);
  return (
    <S.MainContainer>
      <S.RowBox style={{ width: "100%", justifyContent: "flex-start" }}>
        <S.ColumnBox style={{ width: "20%" }}>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1.2}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 100,
              modifier: 1.2,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
            style={{ width: "100%", height: "240px" }}
          >
            {dummyChampions.map((champ) => (
              <SwiperSlide
                key={champ.name}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 0 10px rgba(0,0,0,0.4)",
                  background: "#222",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={champ.imgUrl}
                  alt={champ.name}
                  width={200}
                  height={200}
                  style={{ borderRadius: "12px" }}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <Button style={{ backgroundColor: colors.NAVY }}>
            <RiAddBoxLine
              onClick={() => {
                setOnModal(true);
              }}
            />
          </Button>
        </S.ColumnBox>
      </S.RowBox>
    </S.MainContainer>
  );
};

export default MY;
