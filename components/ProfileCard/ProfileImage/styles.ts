import styled from "@emotion/styled";

export const profileImageStyle = styled.img(
  ({ width, height }: { width: number; height: number }) => ({
    width: width,
    height: height,
    borderRadius: 100,
    border: "2px solid #000",
  })
);
export const MainContainer = styled.div({
  display: "flex",
  alignItems: "center",
});
