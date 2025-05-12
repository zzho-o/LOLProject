import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const MainContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

export const RowBox = styled.div({
  width: "100%",
  padding: 50,
  display: "flex",
  alignItems: "center",
  flexDirection: "row-reverse",
});

export const ColumnBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});
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
  backgroundColor: colors.SKELETON,
  color: "#fff",
  border: "none",
  width: mobile ? "50%" : 200,
  height: 50,
  borderRadius: 100,
  borderStartStartRadius: searchButton ? (mobile ? 100 : 0) : 100,
  borderEndStartRadius: searchButton ? (mobile ? 100 : 0) : 100,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3700B3",
  },
}));
