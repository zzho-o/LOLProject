import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import {
  atomMenuTap,
  atomLoading,
  atomLoggedInUser,
  atomResolution,
  atomUserDetailInfo,
  atomUserState,
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
import { logoutUser } from "@/utils/api/api";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  const [labelLanguage, setLabelLanguage] = useState("한국어");
  const [lang, setLang] = useState("ko");
  const { t, i18n } = useTranslation(["common"]);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useRecoilState(atomMenuTap);
  const [loggedInUser, setLoggedInUser] = useRecoilState(atomLoggedInUser);
  const [userState, setUserState] = useRecoilState(atomUserState);
  const [loading, setLoading] = useRecoilState(atomLoading);

  const frameworks = createListCollection({
    items: [
      { label: "한국어", value: "ko" },
      { label: "English", value: "en" },
    ],
  });
  const handleLogOut = async () => {
    setLoading(true);
    await logoutUser(setUserState).then((res) => {
      setLoggedInUser(false);
      setLoading(false);
      router.push("/");
    });
  };
  return (
    <S.HeaderContainer>
      <S.TitleContainer
        onClick={() => {
          router.push(loggedInUser ? "/Home" : "/");
        }}
      >
        <S.TabButton isActive={false}>{t("title")}</S.TabButton>
      </S.TitleContainer>
      <div style={{ display: "flex", alignItems: "center" }}>
        {loggedInUser && (
          <S.TabButton
            isActive={true}
            onClick={() => {
              handleLogOut();
            }}
          >
            {t("logout")}
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
                      <Drawer.Title>{t("language")}</Drawer.Title>
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
                                i18n.changeLanguage(lang.value);
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
                    i18n.changeLanguage(lang.value);
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
