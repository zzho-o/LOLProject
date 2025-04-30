import { useRecoilState } from "recoil";
import { AnimatePresence, motion } from "framer-motion";
import { atomToastState } from "@/utils/recoil/atoms";
import { Box, Text } from "@chakra-ui/react";

const MotionBox = motion(Box);

const Toast = () => {
  const [toast, setToast] = useRecoilState(atomToastState);

  return (
    <AnimatePresence>
      {toast.isOpen && (
        <MotionBox
          position="fixed"
          top="20px"
          left="50%"
          transform="translateX(-50%)"
          bg={toast.type === "success" ? "green.400" : "red.400"}
          color="white"
          px={6}
          py={3}
          borderRadius="md"
          zIndex={9999}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          onAnimationComplete={() => {
            setTimeout(() => {
              setToast((prev) => ({ ...prev, isOpen: false }));
            }, 3000);
          }}
        >
          <Text>{toast.message}</Text>
        </MotionBox>
      )}
    </AnimatePresence>
  );
};

export default Toast;
