import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import { atomLanguage, atomUserDetailInfo } from "@/utils/recoil/atoms";
import { useRecoilState } from "recoil";
import Margin from "../common/Margin";
import { strings } from "@/utils/I18n";
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

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);
  const [language, setLanguage] = useRecoilState(atomLanguage);
  const [labelLanguage, setLabelLanguage] = useState("한국어");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    strings.setLanguage("kor");
  }, []);
  useEffect(() => {
    strings.setLanguage(language);
    console.log(123, strings);
  }, [labelLanguage]);

  const tabs = [
    { id: "home", label: "홈" },
    { id: "record", label: "전적" },
    { id: "ranking", label: "랭킹" },
  ];

  const frameworks = createListCollection({
    items: [
      { label: "한국어", value: "Kor" },
      { label: "English", value: "en" },
    ],
  });

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
          <S.TabButton isActive={false}>{strings.title}</S.TabButton>{" "}
        </S.TitleContainer>
      )}
      {isClient && (
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
                  setLanguage(lang.value);
                  setLabelLanguage(lang.label);
                }}
              >
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      )}
    </S.HeaderContainer>
  );
};

export default Header;
