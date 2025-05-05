import Margin from "@/components/common/Margin";
import * as S from "./styles";
import { Box, Collapsible } from "@chakra-ui/react";
import Image from "next/image";
import { useRecoilValue } from "recoil";
import { atomResolution } from "@/utils/recoil/atoms";
import { colors } from "@/config/globalColors";
import { useTranslation } from "next-i18next";

const LotationChampions = ({ lotation }) => {
  const resolution = useRecoilValue(atomResolution);
  const MobileLotationFirstRow = [];
  const MobileLotationSecondRow = [];
  const { t, i18n } = useTranslation(["common"]);

  // lotation.forEach((item, idx) => {
  //   if (idx < Math.ceil(lotation.length / 2)) {
  //     MobileLotationFirstRow.push(item);
  //   } else {
  //     MobileLotationSecondRow.push(item);
  //   }
  // });
  return (
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
          {t("ThisWeeksFreeChampions")}
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
  );
};

export default LotationChampions;
