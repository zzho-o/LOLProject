import React from "react";
import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}
const LayoutBodyOnly = ({ children }: ILayout) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      {children}
    </div>
  );
};

export default LayoutBodyOnly;
