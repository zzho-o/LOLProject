import { useRouter } from "next/router";
import { useState } from "react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as S from "../../components/pageStyles/SignUp/styles";
import { useTranslation } from "next-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import Margin from "@/components/common/Margin";
import { colors } from "@/config/globalColors";
import {
  atomLoading,
  atomResolution,
  atomToastState,
} from "@/utils/recoil/atoms";
import { createListCollection } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from "@chakra-ui/react";
import {
  fetchEmailDuplicate,
  fetchNicknameDuplicate,
  signUpWithEmail,
} from "@/utils/api/api";

export async function getServerSideProps({ locale }: any) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

const SignUp = () => {
  const { t } = useTranslation("common");
  const resolution = useRecoilValue(atomResolution);
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState("male");
  const [birthDate, setBirthDate] = useState("");

  const [validNickName, setValidNickName] = useState(false);
  const [toast, setToast] = useRecoilState(atomToastState);
  const [loading, setLoading] = useRecoilState(atomLoading);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
    setValidNickName(false);
  };

  const handleBirthDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthDate(e.target.value);
  };
  const validateEmail = async (value: string) => {
    if (!value.includes("@")) {
      setToast({
        isOpen: true,
        message: t("invalidEmailFormat"),
        type: "error",
      });
      setValidEmail(false);
      return;
    }

    try {
      const { isDuplicate } = await fetchEmailDuplicate(value);
      if (isDuplicate) {
        setToast({
          isOpen: true,
          message: t("emailDuplicate"),
          type: "error",
        });
        setValidEmail(false);
      } else {
        setToast({
          isOpen: true,
          message: t("emailValid"),
          type: "success",
        });
        setValidEmail(true);
      }
    } catch (err) {
      setToast({
        isOpen: true,
        message: t("emailCheckError"),
        type: "error",
      });
      setValidEmail(false);
    }
  };
  const validateNickname = async (value: string) => {
    if (value.length < 2) {
      setToast({ isOpen: true, message: t("nicknameTooShort"), type: "error" });
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
    } catch {
      setToast({
        isOpen: true,
        message: t("nicknameCheckError"),
        type: "error",
      });
      setValidNickName(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setToast({ isOpen: true, message: t("passwordMismatch"), type: "error" });
      return;
    }

    setLoading(true);
    const { success } = await signUpWithEmail(
      email,
      password,
      nickname,
      gender,
      birthDate
    ).finally(() => setLoading(false));

    if (success) {
      setToast({ isOpen: true, message: t("welcome"), type: "success" });
      router.push("/");
    } else {
      setToast({ isOpen: true, message: t("signUpFailed"), type: "error" });
    }
  };

  const genderInfo = createListCollection({
    items: [
      { label: t("male"), value: "male" },
      { label: t("female"), value: "female" },
    ],
  });

  return (
    <S.PCMainContainer>
      <Margin H={50} />
      <S.RowBox
        style={{
          fontSize: 24,
          color: colors.WHITE,
          textShadow: "2px 2px 4px rgba(0,0,0,1)",
        }}
      >
        {t("signUp")}
      </S.RowBox>
      <Margin H={50} />

      <S.RowBox style={{ position: "relative" }}>
        <S.IdLabel>{t("email")}</S.IdLabel>
        <S.StyledInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("enterYourEmail")}
          type="email"
        />
        <S.InspectEmail
          resolution={resolution}
          onClick={() => validateEmail(email)}
          style={{
            position: "absolute",
            right: 20,
            top: "50%",
            transform: "translateY(-50%)",
          }}
        >
          {t("inspect")}
        </S.InspectEmail>
      </S.RowBox>
      <Margin H={30} />

      <S.RowBox>
        <S.IdLabel>{t("password")}</S.IdLabel>
        <S.StyledInput
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t("enterYourPassword")}
          type="password"
        />
      </S.RowBox>
      <Margin H={30} />

      <S.RowBox>
        <S.IdLabel>{t("passwordConfirm")}</S.IdLabel>
        <S.StyledInput
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          placeholder={t("confirmYourPassword")}
          type="password"
        />
      </S.RowBox>
      <Margin H={30} />

      <S.RowBox style={{ position: "relative" }}>
        <S.IdLabel>{t("nickname")}</S.IdLabel>
        <S.StyledInput
          value={nickname}
          onChange={handleNicknameChange}
          placeholder={t("enterYourNickname")}
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
      <Margin H={30} />

      <S.RowBox>
        <S.IdLabel>{t("gender")}</S.IdLabel>
        <SelectRoot
          collection={genderInfo}
          style={{ width: "40%", height: 70 }}
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
            <div style={{ color: colors.BLACK }}>{t(gender)}</div>
          </SelectTrigger>
          <SelectContent
            style={{ position: "absolute", zIndex: 10, width: "40%" }}
          >
            {genderInfo.items.map((gd) => (
              <SelectItem
                item={gd}
                key={gd.value}
                onClick={() => setGender(gd.value)}
              >
                {gd.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </S.RowBox>
      <Margin H={30} />

      <S.RowBox>
        <S.IdLabel>{t("birthDate")}</S.IdLabel>
        <S.StyledInput
          type="date"
          value={birthDate}
          onChange={handleBirthDateChange}
        />
      </S.RowBox>
      <Margin H={30} />

      <S.RowBox>
        <S.StyledButton
          resolution={resolution}
          disabled={
            !email ||
            !password ||
            !passwordConfirm ||
            password !== passwordConfirm ||
            !validNickName ||
            !birthDate
          }
          style={{
            opacity:
              !email ||
              !password ||
              !passwordConfirm ||
              password !== passwordConfirm ||
              !validNickName ||
              !birthDate
                ? 0.5
                : 1,
          }}
          onClick={handleSubmit}
        >
          {t("submit")}
        </S.StyledButton>
      </S.RowBox>
    </S.PCMainContainer>
  );
};

export default SignUp;
