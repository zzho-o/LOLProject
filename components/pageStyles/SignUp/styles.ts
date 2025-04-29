import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const IdLabel = styled.div({
  fontSize: 16,
  padding: "10px",
  backgroundColor: colors.PRIMARY,
  borderRadius: 100,
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  color: colors.WHITE,
  textAlign: "center",
  width: "10%",
  height: "70px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const StyledInput = styled.input({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  borderRadius: 100,
  borderStartStartRadius: 0,
  borderEndStartRadius: 0,
  width: "40%",
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
export const PCMainContainer = styled.div({
  display: "flex",

  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
export const MobileMainContainer = styled.div({
  display: "flex",

  flex: 1,
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
});
export const StyledButton = styled.button<{ resolution: string }>(
  ({ resolution }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GRAY_900,
    borderRadius: 100,
    color: colors.WHITE,
    width: "30%",
    padding: 10,
    cursor: "pointer",
    fontSize: resolution === "PC" ? 14 : 12,
  })
);
export const RowBox = styled.div({
  display: "flex",
  alignItems: "center",
  width: "100%",
  justifyContent: "center",
});

export const PwLabel = styled.div({
  fontSize: 16,
  padding: "10px",
  backgroundColor: colors.GRAY_400,
  borderRadius: 100,
  borderEndEndRadius: 0,
  borderStartEndRadius: 0,
  textAlign: "center",
  width: "10%",
  height: "70px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const SignInButton = styled.button<{ resolution: string }>(
  ({ resolution }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GRAY_900,
    borderRadius: 100,
    color: colors.WHITE,
    width: "30%",
    padding: 10,
    cursor: "pointer",
    fontSize: resolution === "PC" ? 14 : 12,
  })
);

export const SignUpButton = styled.div<{ resolution: string }>(
  ({ resolution }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.GRAY_400,
    borderRadius: 100,
    padding: "10px 20px",
    cursor: "pointer",
    fontSize: resolution === "PC" ? 14 : 12,
  })
);

export const StyledPwInput = styled.input({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  borderRadius: 100,
  borderStartStartRadius: 0,
  borderEndStartRadius: 0,
  width: "40%",
  height: 70,
  outline: "none",
  "&:focus": {
    borderColor: colors.GRAY_500,
  },
});
