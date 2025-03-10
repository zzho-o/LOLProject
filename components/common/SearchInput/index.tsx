import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import SearchButton from "../SearchButton";
import { motion } from "framer-motion";
import Margin from "../Margin";
import { useTranslation } from "next-i18next";
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
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <S.AlertContainer>
      <S.MainContainer>
        <Margin H={50} />
        <S.BodyContainer>
          <S.StyledInput
            type="text"
            // placeholder={strings.beta_notice}
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
                // title
                handleSearch={handleSearch}
              />
            </motion.div>
          </S.StyledButtonContainer>
        </S.BodyContainer>
      </S.MainContainer>
      <Margin H={30} />
      {error && <text>{t("nomatchingnicknamefound")}</text>}
    </S.AlertContainer>
  );
};

export default SearchInput;
