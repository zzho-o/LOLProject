import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Image from "next/image";
import { ReactNode } from "react";

interface ILayout {
  children: ReactNode;
}
const Layout = ({ children }: ILayout) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
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
            src="/assets/Background.png"
            alt="Background"
            layout="fill"
            objectFit="cover"
            quality={100}
            style={{ opacity: 0.3 }}
            draggable={false}
          />
        </div>
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
