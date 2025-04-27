import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import * as S from "./styles";
import { atomLanguage, atomResolution } from "@/utils/recoil/atoms";
import Margin from "@/components/common/Margin";

const SignIn = () => {
  const resolution = useRecoilValue(atomResolution);
  const [language, setLanguage] = useRecoilState(atomLanguage);
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(123);
    }
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
              onKeyDown={handleEnterKeyDown}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignInButton resolution={resolution}>
            {language.signIn}
          </S.SignInButton>
          <Margin H={20} />
          <S.SignUpButton resolution={resolution}>
            {language.signUp}
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
              onKeyDown={handleEnterKeyDown}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
          </S.RowBox>
          <Margin H={20} />
          <S.SignInButton resolution={resolution}>
            {language.signIn}
          </S.SignInButton>
          <Margin H={20} />
          <S.SignUpButton resolution={resolution}>
            {language.signUp}
          </S.SignUpButton>
        </S.MobileMainContainer>
      )}
    </>
  );
};

export default SignIn;
