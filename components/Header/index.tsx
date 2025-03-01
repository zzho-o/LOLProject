import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";
import { atomUserDetailInfo } from "@/utils/recoil/atoms";
import { useRecoilState } from "recoil";
import Margin from "../common/Margin";
import { strings } from "@/utils/I18n";
import Image from "next/image";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [userInfo, setUserInfo] = useRecoilState(atomUserDetailInfo);

  const tabs = [
    { id: "home", label: "홈" },
    { id: "record", label: "전적" },
    { id: "ranking", label: "랭킹" },
  ];

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
    </S.HeaderContainer>
  );
};

export default Header;
