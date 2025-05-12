import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  atomBackgroundURL,
  atomMenuTap,
  atomLoggedInUser,
  atomResolution,
  atomUserDetailInfo,
  atomToastState,
} from "@/utils/recoil/atoms";
import * as S from "../components/pageStyles/styles";

export type getNameTag = {
  puuid: string;
  gameName: string;
  tagLine: string;
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { toaster } from "@/components/ui/toaster";
import LOL from "@/components/LOL";
import TFT from "@/components/TFT";
import { dataAttr } from "node_modules/@chakra-ui/react/dist/types/utils";
import SignIn from "../components/SignIn";
import Margin from "@/components/common/Margin";
import { supabase } from "libs/supabase";

export const getServerSideProps = async (context: any) => {
  const { locale, query } = context;
  const { name } = query;

  if (!name) {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }

  try {
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  } catch (error) {
    console.error("Error fetching summoner:", error);
    return {
      props: {
        ...(await serverSideTranslations(locale, ["common"])),
      },
    };
  }
};

const Home = () => {
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useRecoilState(atomLoggedInUser);
  const resolution = useRecoilValue(atomResolution);
  const { t, i18n } = useTranslation(["common"]);
  const [toast, setToast] = useRecoilState(atomToastState);

  useEffect(() => {
    if (loggedInUser) {
      router.push("/Home");
      setToast({
        isOpen: true,
        message: t("welcome"),
        type: "success",
      });
    }
  }, [loggedInUser, router]);

  return (
    <>
      <Margin H={resolution === "PC" ? 70 : 50} />
      <SignIn />
    </>
  );
};

export default Home;
