import * as S from "./styles";

interface SearchButtonProps {
  title: string;
  handleSearch?: () => void;
  disabled?: boolean;
}
const SearchButton = ({
  title,
  handleSearch = () => {},
  disabled = false,
}: SearchButtonProps) => {
  return (
    <S.StyledButton onClick={handleSearch} disabled={disabled}>
      {title}
    </S.StyledButton>
  );
};

export default SearchButton;
