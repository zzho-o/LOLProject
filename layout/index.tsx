import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { atomBackgroundURL } from "@/utils/recoil/atoms";
import { ReactNode } from "react";
import { useRecoilValue } from "recoil";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
  const backgroundURL = useRecoilValue(atomBackgroundURL);

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
            zIndex: -1,
          }}
        />
        <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
