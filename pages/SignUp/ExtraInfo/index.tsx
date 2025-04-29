import { useRouter } from "next/router";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as S from "../../../components/pageStyles/SignUp/styles";
import { useTranslation } from "next-i18next";
import { useRecoilValue } from "recoil";
import Margin from "@/components/common/Margin";
import { colors } from "@/config/globalColors";
import { atomResolution } from "@/utils/recoil/atoms";
import { createListCollection } from "@chakra-ui/react";

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const ExtraInfo = () => {
  const { t, i18n } = useTranslation("common");
  const resolution = useRecoilValue(atomResolution);
  const router = useRouter();

  const { kakaoId, email } = router.query;

  const [nickname, setNickname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const gender = createListCollection({
    items: [
      { label: t("male"), value: t("male") },
      { label: t("female"), value: t("female") },
    ],
  });

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ kakaoId, email, nickname, gender, birthDate });
  };

  return (
    <S.PCMainContainer>
      <Margin H={resolution === "PC" ? 50 : 30} />
      <S.RowBox
        style={{
          fontSize: resolution === "PC" ? 24 : 18,
          color: colors.WHITE,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
        }}
      >
        {t("signUp")}
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />

      <S.RowBox>
        <S.IdLabel>{t("nickname")}</S.IdLabel>
        <S.StyledInput
          value={nickname}
          onChange={handleNicknameChange}
          placeholder={t("enterYourNickname")}
        />
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />

      <S.RowBox>
        <S.IdLabel>{t("gender")}</S.IdLabel>
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />

      <S.RowBox>
        <S.IdLabel>{t("birthDate")}</S.IdLabel>
        <S.StyledInput
          type="date"
          value={birthDate}
          onChange={handleBirthDateChange}
        />
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />

      <S.RowBox>
        <S.StyledButton resolution={resolution} onClick={handleSubmit}>
          {t("submit")}
        </S.StyledButton>
      </S.RowBox>
    </S.PCMainContainer>
  );
};

export default ExtraInfo;
