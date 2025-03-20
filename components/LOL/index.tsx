import { motion, AnimatePresence } from "framer-motion";
import * as S from "./styles";
import ProfileCard from "../ProfileCard";
import { useRecoilValue } from "recoil";
import { atomResolution, atomUserDetailInfo } from "@/utils/recoil/atoms";
import Margin from "../common/Margin";
const LOL = () => {
  const userInfo = useRecoilValue(atomUserDetailInfo);
  const resolution = useRecoilValue(atomResolution);
  return (
    <S.MainContainer>
      <Margin H={resolution === "MOBILE" ? 10 : 20} />
      <S.RowBox style={{ width: "100%" }}>
        <Margin W={resolution === "MOBILE" ? 10 : 20} />
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ProfileCard />
          </motion.div>
        </AnimatePresence>
        <Margin W={resolution === "MOBILE" ? 20 : 30} />
        <S.RowBox style={{ fontSize: resolution === "MOBILE" ? 15 : 30 }}>
          {userInfo.gameName + "#KR"}
        </S.RowBox>
      </S.RowBox>
    </S.MainContainer>
  );
};

export default LOL;
