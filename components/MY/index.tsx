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

const dummyChampions = [
  { name: "Ahri", imgUrl: "/champions/Ahri.png" },
  { name: "Yasuo", imgUrl: "/champions/Yasuo.png" },
  { name: "Lux", imgUrl: "/champions/Lux.png" },
  { name: "Ezreal", imgUrl: "/champions/Ezreal.png" },
  { name: "Jinx", imgUrl: "/champions/Jinx.png" },
];

const MY = () => {
  return (
    <S.MainContainer>
      <RowBox style={{ width: "100%", justifyContent: "flex-start" }}>
        <S.ColumnBox style={{ width: "20%", backgroundColor: "#123123" }}>
          <Swiper
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            loop={true}
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 150,
              modifier: 1.5,
              slideShadows: true,
            }}
            modules={[EffectCoverflow]}
            className="mySwiper"
          >
            {dummyChampions.map((champ) => (
              <SwiperSlide
                key={champ.name}
                style={{
                  width: "250px",
                  height: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                  boxShadow: "0 0 20px rgba(0,0,0,0.5)",
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
            <RiAddBoxLine />
          </Button>
        </S.ColumnBox>
      </RowBox>
    </S.MainContainer>
  );
};

export default MY;
