import { useState } from "react";
import TutorialImg from "../../img/tutorialImg.png";
import Portal from "./Portal";

import { IoGameController } from "react-icons/io5";
import styled from "styled-components";

const Container = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 500px;
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
`;

const ModalContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 600px;
  width: 500px;
  height: 100vh;
`;

const RollModal = () => {
  const [onModal, setOnModal] = useState(false);

  // 모달 외부를 클릭하면 모달을 닫기 위한 함수
  const handleClickOutside = (e: React.MouseEvent) => {
    // e.target이 모달 콘텐츠가 아닌 경우에만 모달 닫기
    if (e.target === e.currentTarget) {
      setOnModal(false);
    }
  };

  return (
    <Portal>
      <ModalContainer onClick={() => setOnModal(true)}>
        <IoGameController style={{ width: "50px", height: "50px" }} />
        {onModal && (
          <Container onClick={handleClickOutside}>
            <Box onClick={(e) => e.stopPropagation()}>
              <button onClick={() => setOnModal(false)}>X</button>
              <div>
                <img src={TutorialImg} />
              </div>
            </Box>
          </Container>
        )}
      </ModalContainer>
    </Portal>
  );
};

export default RollModal;
