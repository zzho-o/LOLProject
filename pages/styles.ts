import styled from "@emotion/styled";

export const MainContainer = styled.div({
  display: "flex",
  flex: 1,
  backgroundColor: "#FFFFFF",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

export const BodyContainer = styled.div({
  display: "flex",
  maxWidth: 940,
  position: "relative",
});

export const ContentsLeftContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
});

export const ContentsRightContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  maxWidth: 240,
});

export const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
