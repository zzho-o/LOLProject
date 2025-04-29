import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const MainContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  backgroundColor: colors.BLACK,
  color: colors.WHITE,
});

export const AlertContainer = styled.div({
  width: "100%",
  textShadow: `0 4px 6px ${colors.BLACK}`,
  padding: 10,
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
});
