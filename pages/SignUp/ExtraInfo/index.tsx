import { useRouter } from "next/router";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as S from "../../../components/pageStyles/SignUp/styles";
import { useTranslation } from "next-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import Margin from "@/components/common/Margin";
import { colors } from "@/config/globalColors";
import {
  atomLoading,
  atomResolution,
  atomToastState,
} from "@/utils/recoil/atoms";
import { Box, createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Drawer,
  Button,
  Portal,
} from "@chakra-ui/react";
import axios from "axios";
import { fetchNicknameDuplicate } from "@/utils/api/api";
import { supabase } from "libs/supabase";

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
  const [label, setLabel] = useState(t("male"));

  const { kakaoId, email } = router.query;
  const resolvedEmail = Array.isArray(email) ? email[0] : email;

  const [nickname, setNickname] = useState("");
  const [validNickName, setValidNickName] = useState(false);
  const [gender, setGender] = useState(t("male"));
  const [birthDate, setBirthDate] = useState("");
  const [toast, setToast] = useRecoilState(atomToastState);
  const [loading, setLoading] = useRecoilState(atomLoading);
  const handleEnterKeyDownNickName = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      validateNickname(nickname);
    }
  };
  const validateNickname = async (value: string) => {
    setNickname(value);

    if (value.length < 2) {
      setToast({
        isOpen: true,
        message: t("nicknameTooShort"),
        type: "error",
      });
      setValidNickName(false);
      return;
    }

    try {
      const { isDuplicate } = await fetchNicknameDuplicate(value);

      if (isDuplicate) {
        setToast({
          isOpen: true,
          message: t("nicknameDuplicate"),
          type: "error",
        });
        setValidNickName(false);
      } else {
        setToast({
          isOpen: true,
          message: t("nicknameValid"),
          type: "success",
        });
        setValidNickName(true);
      }
    } catch (err) {
      setToast({
        isOpen: true,
        message: t("nicknameCheckError"),
        type: "error",
      });
      setValidNickName(false);
    }
  };

  const genderInfo = createListCollection({
    items: [
      { label: t("male"), value: t("male") },
      { label: t("female"), value: t("female") },
    ],
  });
  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setValidNickName(false);
  };
  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setToast({
        isOpen: true,
        message: "유저 정보를 불러올 수 없습니다.",
        type: "error",
      });
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("users").insert([
      {
        uuid: user.id,
        email: user.email,
        nickname: nickname,
        birthDate: birthDate,
        gender: gender,
      },
    ]);

    if (error) {
      setToast({
        isOpen: true,
        message: "회원가입 실패: " + error.message,
        type: "error",
      });
    } else {
      setToast({
        isOpen: true,
        message: t("wellcom"),
        type: "success",
      });
      router.push("/");
    }

    setLoading(false);
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

      <S.RowBox style={{ position: "relative" }}>
        <S.IdLabel>{t("nickname")}</S.IdLabel>
        <S.StyledInput
          value={nickname}
          onChange={handleNicknameChange}
          placeholder={t("enterYourNickname")}
          onKeyDown={handleEnterKeyDownNickName}
        />
        <S.InspectNickName
          resolution={resolution}
          onClick={() => validateNickname(nickname)}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {t("inspect")}
        </S.InspectNickName>
      </S.RowBox>

      <Margin H={resolution === "PC" ? 50 : 30} />

      <S.RowBox>
        <S.IdLabel>{t("gender")}</S.IdLabel>
        <SelectRoot
          collection={genderInfo}
          style={{
            width: "40%",
            height: 70,
          }}
        >
          <SelectTrigger
            style={{
              padding: 10,
              fontSize: 16,
              border: "1px solid #ccc",
              borderRadius: 100,
              borderStartStartRadius: 0,
              borderEndStartRadius: 0,
              width: "100%",
              height: 70,
              outline: "none",
              backgroundColor: colors.WHITE,
            }}
          >
            <div style={{ color: colors.BLACK }}>{t(label)}</div>
          </SelectTrigger>
          <SelectContent
            style={{ position: "absolute", zIndex: 10, width: "40%" }}
          >
            {genderInfo.items.map((gd) => (
              <SelectItem
                item={gd}
                key={gd.value}
                onClick={() => {
                  setLabel(gd.label);
                  setGender(gd.label);
                }}
              >
                {gd.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
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
        <S.StyledButton
          disabled={!validNickName || gender === "" || birthDate === ""}
          style={{
            opacity:
              !validNickName || gender === "" || birthDate === "" ? 0.5 : 1,
          }}
          resolution={resolution}
          onClick={handleSubmit}
        >
          {t("submit")}
        </S.StyledButton>
      </S.RowBox>
    </S.PCMainContainer>
  );
};

export default ExtraInfo;
