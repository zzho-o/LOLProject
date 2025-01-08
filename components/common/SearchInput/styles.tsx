import styled from "@emotion/styled";

export const StyledInput = styled.input({
  padding: 10,
  fontSize: 16,
  border: "1px solid #ccc",
  borderRadius: 8,
  width: "100%",
  height: 50,
  outline: "none",
  "&:focus": {
    borderColor: "#6200EE",
  },
});
export const MainContainer = styled.div({
  display: "flex",
  flex: 1,
  backgroundColor: "#FFFFFF",
  flexDirection: "column",
  justifyContent: "flex-start",
  width: "100%",
});
