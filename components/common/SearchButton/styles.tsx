import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const StyledButton = styled.button<{ searchButton?: boolean }>(
  ({ searchButton = false }) => ({
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    padding: "10px 20px",
    fontSize: 16,
    backgroundColor: colors.GRAY_900,
    color: "#fff",
    border: "none",
    width: 200,
    height: 70,
    borderRadius: 100,
    borderStartStartRadius: searchButton ? 0 : 100,
    borderEndStartRadius: searchButton ? 0 : 100,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3700B3",
    },
  })
);
