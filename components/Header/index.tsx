import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import {
  atomGameTap,
  atomLanguage,
  atomResolution,
  atomUserDetailInfo,
} from "@/utils/recoil/atoms";
import { useRecoilState, useRecoilValue } from "recoil";
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
import koData from "@/public/locales/ko/common.json";
import enData from "@/public/locales/en/common.json";
import { useRouter } from "next/router";
import { Drawer, Button, Portal } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  const [labelLanguage, setLabelLanguage] = useState("한국어");
  const [lang, setLang] = useState("ko");
  const [language, setLanguage] = useRecoilState(atomLanguage);
  const { t, i18n } = useTranslation("common");
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [game, setGame] = useRecoilState(atomGameTap);

  const languageData = {
    ko: koData,
    en: enData,
  };
  useEffect(() => {
    setLanguage(languageData[i18n.language] || {});
  }, [i18n.language]);

  type GameType = "LOL" | "TFT";

  const tabs: { id: GameType; label: GameType }[] = [
    { id: "LOL", label: "LOL" },
    { id: "TFT", label: "TFT" },
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
    if (lang !== i18n.language) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <S.HeaderContainer>
      {userInfo ? (
        <S.NavContainer>
          {tabs.map((tab) => (
            <S.TabButton
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setGame(tab.label);
              }}
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
        <S.TitleContainer
          onClick={() => {
            router.push("/");
          }}
        >
          <S.TabButton isActive={false}>{language.title}</S.TabButton>
        </S.TitleContainer>
      )}
      <div style={{ display: "flex", alignItems: "center" }}>
        {userInfo && (
          <S.TabButton
            isActive={true}
            onClick={() => {
              router.push("/");
            }}
          >
            {language.logout}
          </S.TabButton>
        )}

        {resolution === "MOBILE" ? (
          <>
            <Drawer.Root open={open} onOpenChange={(e) => setOpen(e.open)}>
              <Drawer.Trigger asChild>
                <Button aria-label="Open menu" variant="outline">
                  <Image
                    src="/assets/HambergerMenu.png"
                    alt="Background"
                    objectFit="cover"
                    fill
                    quality={100}
                    draggable={false}
                  />
                </Button>
              </Drawer.Trigger>
              <Portal>
                <Drawer.Backdrop />
                <Drawer.Positioner>
                  <Drawer.Content>
                    <Drawer.Header>
                      <Drawer.Title>{language.language}</Drawer.Title>
                    </Drawer.Header>
                    <Drawer.Body>
                      <SelectRoot
                        collection={frameworks}
                        size="sm"
                        width="320px"
                      >
                        <SelectTrigger
                          style={{
                            backgroundColor: colors.WHITE,
                            color: colors.BLACK,
                          }}
                        >
                          <div style={{ color: colors.BLACK }}>
                            {labelLanguage}
                          </div>
                        </SelectTrigger>
                        <SelectContent
                          style={{
                            position: "absolute",
                            zIndex: 10,
                            width: "100%",
                          }}
                        >
                          {frameworks.items.map((lang) => (
                            <SelectItem
                              item={lang}
                              key={lang.value}
                              onClick={() => {
                                setLabelLanguage(lang.label);
                                setLang(lang.value);
                              }}
                            >
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </SelectRoot>
                    </Drawer.Body>
                    <Drawer.Footer></Drawer.Footer>
                  </Drawer.Content>
                </Drawer.Positioner>
              </Portal>
            </Drawer.Root>
          </>
        ) : (
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
                    setLang(lang.value);
                  }}
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        )}
      </div>
    </S.HeaderContainer>
  );
};

export default Header;
