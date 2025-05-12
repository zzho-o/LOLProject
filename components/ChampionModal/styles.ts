import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const MainContainer = styled.div({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100vh",
  position: "relative",
});

export const ModalContainer = styled.div({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 9999,
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
});

export const RowBox = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "row-reverse",
});
