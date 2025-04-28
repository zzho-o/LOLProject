import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as S from "../../components/pageStyles/SignUp/styles";
import Margin from "@/components/common/Margin";
import { useRecoilValue } from "recoil";
import { atomResolution } from "@/utils/recoil/atoms";
import { colors } from "@/config/globalColors";
export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
const SignUp = () => {
  const { t, i18n } = useTranslation("common");
  const resolution = useRecoilValue(atomResolution);
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
        <S.IdLabel>123</S.IdLabel>
        <S.StyledInput />
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />
      <S.RowBox>
        <S.IdLabel>123</S.IdLabel>
        <S.StyledInput />
      </S.RowBox>
      <Margin H={resolution === "PC" ? 50 : 30} />
      <S.RowBox>
        <S.IdLabel>123</S.IdLabel>
        <S.StyledInput />
      </S.RowBox>
    </S.PCMainContainer>
  );
};

export default SignUp;
