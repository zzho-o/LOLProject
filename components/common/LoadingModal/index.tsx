import Image from "next/image";
import { motion } from "framer-motion";
import React from "react";
import * as S from "./styles";
import { useRecoilValue } from "recoil";
import { atomLoading, atomResolution } from "@/utils/recoil/atoms";
import { useTranslation } from "next-i18next";

const LoadingModal = () => {
  const resolution = useRecoilValue(atomResolution);
  const isLoading = useRecoilValue(atomLoading);
  const { t, i18n } = useTranslation("common");
  return (
    <>
      {isLoading ? (
        <S.MainContainer
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          >
            <Image
              src="/assets/Loading.png"
              alt="loading..."
              width={100}
              height={100}
            />
          </motion.div>
          <S.AlertContainer style={{ fontSize: resolution === "PC" ? 30 : 20 }}>
            {t("loading")}
          </S.AlertContainer>
        </S.MainContainer>
      ) : null}
    </>
  );
};

export default LoadingModal;
