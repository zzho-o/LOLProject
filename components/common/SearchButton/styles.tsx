import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const StyledButton = styled.button<{
  mobile?: boolean;
  searchButton?: boolean;
}>(({ searchButton = false, mobile = false }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px 20px",
  fontSize: mobile ? 12 : 16,
  backgroundColor: colors.GRAY_900,
  color: "#fff",
  border: "none",
  width: mobile ? "50%" : 200,
  height: 70,
  borderRadius: 100,
  borderStartStartRadius: searchButton ? (mobile ? 100 : 0) : 100,
  borderEndStartRadius: searchButton ? (mobile ? 100 : 0) : 100,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3700B3",
  },
}));
