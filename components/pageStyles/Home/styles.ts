import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const NavContainer = styled.div({
  display: "flex",
  gap: 0,
  alignItems: "center",
});

export const TabButton = styled.button<{ isActive: boolean }>(
  ({ isActive }) => ({
    position: "relative",
    padding: "8px 16px",
    fontSize: "16px",
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? colors.WHITE : colors.GRAY_400,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px",
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px",
      backgroundColor: isActive ? colors.PRIMARY : "transparent",
      transition: "background-color 0.3s ease",
    },

    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: `linear-gradient(to top, rgba(255, 255, 255, 0.3), transparent)`,
      transform: isActive ? "translateY(0)" : "translateY(100%)",
      transition: "transform 0.3s ease",
    },

    "&:hover::after": {
      transform: "translateY(0)",
    },
  })
);
