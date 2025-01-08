import { colors } from "@/config/globalColors";
import styled from "@emotion/styled";

export const MainContainer = styled.div(
  ({ isMobile = false }: { isMobile: boolean }) => ({
    display: "flex",
    width: "100%",
    height: isMobile ? 94 : 111,
  })
);

export const RowBox = styled.div({
  display: "flex",
  alignItems: "center",
});
