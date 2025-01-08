import styled from "@emotion/styled";

export const StyledButton = styled.button({
  display: "flex",
  alignItems: "center",
  flexDirection: "row",
  justifyContent: "center",
  padding: "10px 20px",
  fontSize: 16,
  backgroundColor: "#6200EE",
  color: "#fff",
  border: "none",
  width: 200,
  height: 50,
  borderRadius: 8,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3700B3",
  },
});
