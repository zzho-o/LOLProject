import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./styles";
import { atomLoading, atomResolution } from "@/utils/recoil/atoms";
import Margin from "@/components/common/Margin";
import { supabase } from "@/utils/supabase/supabaseClient";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Image } from "@chakra-ui/react";

const SignIn = () => {
  const resolution = useRecoilValue(atomResolution);
  const [loading, setLoading] = useRecoilState(atomLoading);
  const router = useRouter();
  const { t, i18n } = useTranslation(["common"]);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleSignIn = async () => {
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: id,
        password: pw,
      });

      if (error) {
        console.error("Login failed:", error.message);
        alert("Failed to sign in. Please try again.");
      } else {
        console.log("Login successful", data);
        alert("Successfully signed in!");
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = () => {
    router.push("/SignUp");
  };

  return (
    <>
      {resolution === "PC" ? (
        <S.PCMainContainer>
          <S.RowBox>
            <S.IdLabel>{"ID"}</S.IdLabel>
            <S.StyledInput value={id} onChange={(e) => setId(e.target.value)} />
          </S.RowBox>
          <Margin H={20} />
          <S.RowBox>
            <S.PwLabel>{"PW"}</S.PwLabel>
            <S.StyledPwInput
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignInButton resolution={resolution} onClick={handleSignIn}>
            {t("signIn")}
          </S.SignInButton>
          <Margin H={20} />
          <S.RowBox>
            <Image
              src="/assets/kakao.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
            <Margin W={5} />
            <Image
              src="/assets/google.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
            <Margin W={5} />
            <Image
              src="/assets/naver.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignUpButton resolution={resolution} onClick={handleSignUp}>
            {t("signUp")}
          </S.SignUpButton>
        </S.PCMainContainer>
      ) : (
        <S.MobileMainContainer>
          <S.RowBox>
            <S.IdLabel>{"ID"}</S.IdLabel>
            <S.StyledInput value={id} onChange={(e) => setId(e.target.value)} />
          </S.RowBox>
          <Margin H={10} />
          <S.RowBox>
            <S.PwLabel>{"PW"}</S.PwLabel>
            <S.StyledPwInput
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignInButton resolution={resolution} onClick={handleSignIn}>
            {t("signIn")}
          </S.SignInButton>
          <Margin H={20} />
          <S.RowBox>
            <Image
              src="/assets/kakao.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
            <Margin W={5} />
            <Image
              src="/assets/google.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
            <Margin W={5} />
            <Image
              src="/assets/naver.png"
              alt="Image"
              boxSize="10"
              objectFit="cover"
              borderRadius="md"
              boxShadow="md"
              _hover={{ boxShadow: "xl" }}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignUpButton resolution={resolution} onClick={handleSignUp}>
            {t("signUp")}
          </S.SignUpButton>
        </S.MobileMainContainer>
      )}
    </>
  );
};

export default SignIn;
