import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const AlertContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
export const StyledInput = styled.input({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  borderRadius: 100,
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  width: "100%",
  height: 70,
  outline: "none",
  "&:focus": {
    borderColor: colors.GRAY_500,
  },
});
export const MobileStyledInput = styled.input({
  padding: 10,
  fontSize: 12,
  border: "1px solid #ccc",
  borderRadius: 100,
  width: "70%",
  height: 70,
  outline: "none",
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  "&:focus": {
    borderColor: colors.GRAY_500,
  },
});
export const StyledButtonContainer = styled.div({
  width: "40%",
  display: "flex",
});
export const StyledInputTag = styled.div({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  width: "100%",
  height: 70,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.GRAY_500,
  outline: "none",
});
export const MobileStyledInputTag = styled.div({
  padding: 10,
  fontSize: 12,
  border: "1px solid #ccc",
  width: "100%",
  borderEndEndRadius: 100,
  borderStartEndRadius: 100,
  height: 70,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.GRAY_500,
  outline: "none",
});
export const PCMainContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
});
export const MobileMainContainer = styled.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
});

export const BodyContainer = styled.div({
  display: "flex",
  flexDirection: "row",
  width: "50%",
  justifyContent: "center",

  paddingTop: 100,
});
export const RowBox = styled.div({
  display: "flex",
  alignItems: "center",
});
