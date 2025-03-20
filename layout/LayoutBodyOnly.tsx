import { atomBackgroundURL } from "@/utils/recoil/atoms";
import Image from "next/image";
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
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: 0,
            userSelect: "none",
          }}
        >
          <Image
            src={backgroundURL ? backgroundURL : "/assets/Background.png"}
            alt="Background"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            quality={100}
            style={{ opacity: 0.3 }}
            draggable={false}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
    </div>
  );
};

export default LayoutBodyOnly;
