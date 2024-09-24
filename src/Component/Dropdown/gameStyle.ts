import styled from "styled-components";
import { Variants, motion } from "framer-motion";

export const Menu = styled(motion.nav)`
  /* filter: drop-shadow(1px 1px 1px #4700b3); */
  width: 100%;
  position: relative;
`;

export const Button = styled(motion.button)`
  -webkit-appearance: button;
  background: #fafafa;
  color: #6600ff;
  border: none;
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  text-align: left;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Ul = styled(motion.ul)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: white;
  list-style: none;
  margin: 0;
  padding: 10px;
  position: absolute; /* 부모 요소 기준으로 위치 고정 */
  top: 100%; /* 버튼 바로 아래에 위치 */
  left: 0;
  width: 100%;
  z-index: 1000;
  max-height: 300px; /* 최대 높이를 설정 */
  overflow-y: auto; /* 넘칠 경우 스크롤 활성화 */
  border: 1px solid #6600ff;
  scrollbar-width: none;
`;

export const Li = styled(motion.li)`
  list-style: none;
  margin: 0;
  padding: 10px;
  color: #6600ff;
  display: block;
  z-index: 3000;
`;

export const dropdownVariants: Variants = {
  open: {
    clipPath: "inset(0% 0% 0% 0% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.7,
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
  closed: {
    clipPath: "inset(10% 50% 90% 50% round 10px)",
    transition: {
      type: "spring",
      bounce: 0,
      duration: 0.3,
    },
  },
};

export const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
