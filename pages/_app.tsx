import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import Layout from "layout";
import { NextPage } from "next";
import { atomResolution, atomWindow } from "@/utils/recoil/atoms";
import { Provider } from "@/components/ui/provider";
import { appWithTranslation, i18n } from "next-i18next";
import { Toaster } from "@/components/ui/toaster";
import LoadingModal from "@/components/common/LoadingModal";
import { useRouter } from "next/router";
import Toast from "@/components/common/Toast";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ children }: { children: ReactNode }) => {
  const [resolution, setResolution] = useRecoilState(atomResolution);
  const setWindow = useSetRecoilState(atomWindow);
  const router = useRouter();
  useEffect(() => {
    if (router.locale && i18n && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);
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
      <Provider>
        <App>{children}</App>
        <LoadingModal />
        <Toast />
      </Provider>
    </RecoilRoot>
  );
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout =
    Component.getLayout || ((page: ReactNode) => <Layout>{page}</Layout>);

  return <AppWrapper>{getLayout(<Component {...pageProps} />)}</AppWrapper>;
};

export default appWithTranslation(MyApp);
