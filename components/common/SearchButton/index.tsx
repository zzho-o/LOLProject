import * as S from "./styles";

interface SearchButtonProps {
  title: string;
  handleSearch?: () => void;
  disabled?: boolean;
  searchButton?: boolean;
  mobile?: boolean;
}
const SearchButton = ({
  title,
  handleSearch = () => {},
  disabled = false,
  searchButton = false,
  mobile = false,
}: SearchButtonProps) => {
  return (
    <S.StyledButton
      searchButton={searchButton}
      onClick={handleSearch}
      disabled={disabled}
      mobile={mobile}
    >
      {title}
    </S.StyledButton>
  );
};

export default SearchButton;
