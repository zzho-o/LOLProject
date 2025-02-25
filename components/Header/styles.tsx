import styled from "@emotion/styled";
import { colors } from "@/config/globalColors";

export const HeaderContainer = styled.div({
  width: "100%",
  backgroundColor: colors.GRAY_900,
  boxShadow: `0 4px 6px ${colors.BLACK}`,
  padding: 10, // 숫자 값 유지
  // borderBottom 제거 (파란 줄 제거)
});

export const NavContainer = styled.div({
  display: "flex",
  gap: 0, // 탭 사이의 간격 제거 (숫자 값)
  alignItems: "center",
});

export const TabButton = styled.button<{ isActive: boolean }>(
  ({ isActive }) => ({
    position: "relative",
    padding: "8px 16px", // rem 대신 px로 변경 (0.5rem = 8px, 1rem = 16px)
    fontSize: "16px", // rem 대신 px로 변경 (1rem = 16px)
    fontWeight: isActive ? "bold" : "normal",
    color: isActive ? colors.WHITE : colors.GRAY_400,
    background: "none",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "1px", // 숫자 값 유지
    overflow: "hidden",
    "&::before": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "2px", // 숫자 값 유지
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
