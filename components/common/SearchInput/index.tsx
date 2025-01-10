import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";

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
  const handleEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <S.MainContainer>
      <S.StyledInput
        type="text"
        placeholder="소환사 닉네임을 입력하세요"
        value={summonerName}
        onChange={(e) => setSummonerName(e.target.value)}
        onKeyDown={handleEnterKeyDown}
        style={
          error
            ? { border: `1px solid ${colors.RED}` }
            : { border: `1px solid ${colors.CCC}` }
        }
      />
    </S.MainContainer>
  );
};

export default SearchInput;
