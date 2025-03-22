import { atomBackgroundURL } from "@/utils/recoil/atoms";
import React from "react";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

interface ILayout {
  children: ReactNode;
}

const LayoutBodyOnly = ({ children }: ILayout) => {
  const backgroundURL = useRecoilValue(atomBackgroundURL);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage: `url(${
              backgroundURL ? backgroundURL : "/assets/Background.png"
            })`,
            backgroundPosition: "center center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutBodyOnly;
