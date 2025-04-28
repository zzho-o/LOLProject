import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import SearchButton from "../SearchButton";
import { motion } from "framer-motion";
import Margin from "../Margin";
import { useTranslation } from "next-i18next";
import { useRecoilState, useRecoilValue } from "recoil";
import { atomResolution, atomUserDetailInfo } from "@/utils/recoil/atoms";
import { Button } from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { useRouter } from "next/router";
interface SearchButtonProps {
  summonerName: string;
  setSummonerName?: (val) => void;
  handleSearch?: () => void;
  disabled?: boolean;
  error: boolean;
}

const SearchInput = ({
  summonerName,
  setSummonerName = (val) => {},
  handleSearch = () => {},
  error,
}: SearchButtonProps) => {
  const { t, i18n } = useTranslation("common");
  const resolution = useRecoilValue(atomResolution);
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const [state, setState] = useState<"stop" | "pending" | "error" | "clear">(
    "stop"
  );
  const router = useRouter();
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setState("pending");
      toaster.dismiss();
      toaster.create({
        description: "searching...",
        type: "loading",
      });
      handleSearch();
    }
  };
  useEffect(() => {
    console.log(userInfo);
    if (error) {
      setState("error");
      toaster.dismiss();
      toaster.create({
        description: t("nomatchingnicknamefound"),
        type: "error",
      });
      router.push("/");
    } else {
      ("stop");
    }
  }, [error, userInfo]);

  return (
    <S.AlertContainer>
      {resolution !== "MOBILE" ? (
        <S.PCMainContainer>
          <Margin H={50} />
          <S.BodyContainer>
            <S.StyledInput
              type="text"
              placeholder={t("betanotice")}
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              onKeyDown={handleEnterKeyDown}
              style={
                error
                  ? { border: `1px solid ${colors.RED}` }
                  : { border: `1px solid ${colors.CCC}` }
              }
            />
            <S.StyledButtonContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <S.StyledInputTag>{"#KR"}</S.StyledInputTag>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.5 }}
              >
                <SearchButton
                  searchButton
                  title={t("start")}
                  handleSearch={() => {
                    setState("pending");
                    toaster.dismiss();
                    toaster.create({
                      description: "searching...",
                      type: "loading",
                    });
                    handleSearch();
                  }}
                />
              </motion.div>
            </S.StyledButtonContainer>
          </S.BodyContainer>
        </S.PCMainContainer>
      ) : (
        <S.MobileMainContainer>
          <Margin H={120} />
          <S.RowBox style={{ width: "70%" }}>
            <S.MobileStyledInput
              type="text"
              placeholder={t("betanotice")}
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              onKeyDown={handleEnterKeyDown}
              style={
                error
                  ? { border: `1px solid ${colors.RED}` }
                  : { border: `1px solid ${colors.CCC}` }
              }
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              style={{ width: "30%" }}
            >
              <S.MobileStyledInputTag>{"#KR"}</S.MobileStyledInputTag>
            </motion.div>
          </S.RowBox>
          <Margin H={40} />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            style={{ width: "100%" }}
          >
            <S.RowBox style={{ width: "100%", justifyContent: "center" }}>
              <SearchButton
                searchButton
                title={t("start")}
                handleSearch={() => {
                  setState("pending");
                  toaster.dismiss();
                  toaster.create({
                    description: "searching...",
                    type: "loading",
                  });
                  handleSearch();
                }}
                mobile
              />
            </S.RowBox>
          </motion.div>
        </S.MobileMainContainer>
      )}
    </S.AlertContainer>
  );
};

export default SearchInput;
