import * as S from "./styles";

interface SearchButtonProps {
  title: string;
  handleSearch?: () => void;
  disabled?: boolean;
  searchButton?: boolean;
}
const SearchButton = ({
  title,
  handleSearch = () => {},
  disabled = false,
  searchButton = false,
}: SearchButtonProps) => {
  return (
    <S.StyledButton
      searchButton={searchButton}
      onClick={handleSearch}
      disabled={disabled}
    >
      {title}
    </S.StyledButton>
  );
};

export default SearchButton;
