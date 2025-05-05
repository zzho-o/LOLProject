import { RecoilRoot, useRecoilState, useSetRecoilState } from "recoil";
import type { AppProps } from "next/app";
import { ReactElement, ReactNode, useEffect } from "react";
import Layout from "layout";
import { NextPage } from "next";
import {
  atomLoggedInUser,
  atomResolution,
  atomUserState,
  atomWindow,
} from "@/utils/recoil/atoms";
import { Provider } from "@/components/ui/provider";
import { appWithTranslation, i18n } from "next-i18next";
import { Toaster } from "@/components/ui/toaster";
import LoadingModal from "@/components/common/LoadingModal";
import { useRouter } from "next/router";
import Toast from "@/components/common/Toast";
import { supabase } from "libs/supabase";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const App = ({ children }: { children: ReactNode }) => {
  const [resolution, setResolution] = useRecoilState(atomResolution);
  const setWindow = useSetRecoilState(atomWindow);
  const [userState, setUserState] = useRecoilState(atomUserState);
  const [loggedInUser, setLoggedInUser] = useRecoilState(atomLoggedInUser);
  const router = useRouter();

  useEffect(() => {
    if (router.locale && i18n && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("uuid", user.id)
          .single();

        if (!error && data) {
          setUserState(data);
          setLoggedInUser(true);
        }
      }
    };

    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUser();
      } else {
        setUserState(null);
        setLoggedInUser(false);
      }
    });

    return () => subscription.unsubscribe(); // ✅ 정리 함수
  }, []);

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
