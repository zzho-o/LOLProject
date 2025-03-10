import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import { atomUserDetailInfo } from "@/utils/recoil/atoms";
import { useRecoilState } from "recoil";
import Margin from "../common/Margin";
import Image from "next/image";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  createListCollection,
} from "@chakra-ui/react";
import { useTranslation } from "next-i18next";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const [labelLanguage, setLabelLanguage] = useState("한국어");
  const [lang, setLang] = useState("ko");
  const { t, i18n } = useTranslation("common");

  const tabs = [
    { id: "home", label: "홈" },
    { id: "record", label: "전적" },
    { id: "ranking", label: "랭킹" },
  ];

  const frameworks = createListCollection({
    items: [
      { label: "한국어", value: "ko" },
      { label: "English", value: "en" },
    ],
  });
  useEffect(() => {
    console.log("Current Language:", i18n.language);
  }, [i18n.language]);
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang, i18n.language]);
  return (
    <S.HeaderContainer>
      {userInfo ? (
        <S.NavContainer>
          {tabs.map((tab) => (
            <S.TabButton
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              isActive={activeTab === tab.id}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="underline"
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: colors.PRIMARY,
                  }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </S.TabButton>
          ))}
        </S.NavContainer>
      ) : (
        <S.TitleContainer>
          <S.TabButton isActive={false}>{t("title")}</S.TabButton>
        </S.TitleContainer>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {userInfo && (
          <S.TabButton
            isActive={true}
            onClick={() => {
              setUserInfo(null);
            }}
          >
            {"logout"}
          </S.TabButton>
        )}
        <SelectRoot collection={frameworks} size="sm" width="320px">
          <SelectTrigger>
            <div style={{ color: colors.WHITE }}>{labelLanguage}</div>
          </SelectTrigger>
          <SelectContent
            style={{ position: "absolute", zIndex: 10, width: "100%" }}
          >
            {frameworks.items.map((lang) => (
              <SelectItem
                item={lang}
                key={lang.value}
                onClick={() => {
                  setLabelLanguage(lang.label);
                  setLang(lang.value); // `lang.value`로 i18n 언어 설정
                }}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </div>
    </S.HeaderContainer>
  );
};

export default Header;
