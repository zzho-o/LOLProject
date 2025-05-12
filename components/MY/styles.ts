import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";
export const ColumnBox = styled.div({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const MainContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  color: colors.WHITE,
});

export const StyledButton = styled.div<{
  mobile?: boolean;
}>(({ mobile = false }) => ({
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
  borderStartStartRadius: 100,
  borderEndStartRadius: 100,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3700B3",
  },
}));

export const RowBox = styled.div({
  width: "100%",
  display: "flex",
  alignItems: "center",
});
