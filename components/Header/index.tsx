import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import * as S from "./styles";
import { colors } from "@/config/globalColors";

const Header = () => {
  const [activeTab, setActiveTab] = useState("home");

  const tabs = [
    { id: "home", label: "홈" },
    { id: "record", label: "전적" },
    { id: "ranking", label: "랭킹" },
  ];

  const tabContent = {
    home: <HomeContent />,
    record: <RecordContent />,
    ranking: <RankingContent />,
  };

  return (
    <S.HeaderContainer>
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
    </S.HeaderContainer>
  );
};

const HomeContent = () => <div>홈 컨텐츠</div>;
const RecordContent = () => <div>전적 컨텐츠</div>;
const RankingContent = () => <div>랭킹 컨텐츠</div>;

export default Header;
