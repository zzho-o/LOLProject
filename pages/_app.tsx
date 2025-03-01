import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect, createContext } from "react";
import Layout from "layout";
import { NextPage } from "next";
import { atomResolution, atomWindow } from "@/utils/recoil/atoms";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ children }: { children: ReactNode }) => {
  const [resolution, setResolution] = useRecoilState(atomResolution);
  const setWindow = useSetRecoilState(atomWindow);

  useEffect(() => {
    const handleWindowResize = () => {
      const width = window.innerWidth;
      if (width > 990) {
        setResolution("PC");
      } else if (width > 768) {
        setResolution("TABLET");
      } else {
        setResolution("MOBILE");
      }
      setWindow({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
      });
    };
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return <>{children}</>;
};

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <RecoilRoot>
      <App>{children}</App>
    </RecoilRoot>
  );
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);
  // 레이아웃이 없다면 헤더와 푸터를 가진 레이아웃 렌더링

  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
};

export default MyApp;
