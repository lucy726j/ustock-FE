import { useState } from "react";
import Tutorial from "../../img/Tutotial.png";
import Portal from "./Portal";
import Role from "../../img/role.png";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8); /* 반투명한 검정색 배경 */
  z-index: 10; /* 모달 뒤에 위치, 모달보다 낮은 z-index */
`;

const Container = styled.div`
  /* width: 400px; */
  height: 850px;
  z-index: 11;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: auto;
  display: flex;
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  padding: 20px;
  box-sizing: border-box; /* 패딩 포함 계산 */
`;

const Box = styled.div`
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center; /* 수직 중앙 정렬 */
  align-items: center; /* 수평 중앙 정렬 */
`;

const ModalContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  margin-left: 390px;
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const Button = styled.button`
  background: none;
  border: none;
`;

const RuleModal = () => {
  const [onModal, setOnModal] = useState(false);

  // 모달 외부를 클릭하면 모달을 닫기 위한 함수
  const handleClickOutside = (e: React.MouseEvent) => {
    // e.target이 모달 콘텐츠가 아닌 경우에만 모달 닫기
    if (e.target === e.currentTarget) {
      setOnModal(false);
    }
  };

  return (
    <ModalContainer onClick={() => setOnModal(true)}>
      <p style={{ color: "black", fontSize: "12px", marginRight: "0.6rem" }}>
        룰 설명
      </p>
      <img src={Role} style={{ width: "50px", height: "50px" }} />
      {onModal && (
        <Overlay onClick={handleClickOutside}>
          <Container>
            <Box onClick={(e) => e.stopPropagation()}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center", // 수직 중앙 정렬
                  width: "100%", // 부모의 전체 너비 사용
                  justifyContent: "space-between",
                }}
              >
                <Button onClick={() => setOnModal(false)}>X</Button>
              </div>
              <div>
                <img
                  src={Tutorial}
                  style={{
                    width: "300px",
                    height: "600px",
                    marginTop: "0.5rem",
                  }}
                />
                <p
                  style={{
                    position: "absolute",
                    top: "186px",
                    color: "black",
                    fontSize: "10px",
                    left: "173px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  2014년부터 게임이 시작됩니다.
                  <br /> 게임 한 회당 1년단위로 진행됩니다!
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "230px",
                    color: "black",
                    fontSize: "10px",
                    left: "60px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  게임 시작 시 총 50만원을 지급받습니다. <br />
                  50만원으로 자신의 자산을 불려보세요!
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "305px",
                    color: "black",
                    fontSize: "10px",
                    left: "120px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  더보기를 누르면 자신이 보유한 <br />
                  종목 정보/실시간 랭킹을 확인 할 수 있습니다.{" "}
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "380px",
                    color: "black",
                    fontSize: "10px",
                    left: "70px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  전년도 대비 수익금과 수익률을 종목별로 확인할 수 있어요.
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "705px",
                    color: "black",
                    fontSize: "10px",
                    left: "30px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  매 회 정보거래소에서 원하는 종목의 뉴스를 구매해서 확인할 수
                  있습니다.
                  <br /> 정보는 매 회 단계별 1개씩, 총 3번만 확인할 수 있습니다!
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "590px",
                    color: "black",
                    fontSize: "10px",
                    left: "90px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  원하는 종목을 사기/팔기 할 수 있습니다.
                </p>
                <p
                  style={{
                    position: "absolute",
                    top: "690px",
                    color: "black",
                    fontSize: "8px",
                    left: "150px",
                    background: "white",
                    borderRadius: "10px",
                    padding: "0.3rem",
                  }}
                >
                  넘어가기 버튼을 통해 다음 턴으로 넘어가세요.
                </p>
              </div>
            </Box>
          </Container>
        </Overlay>
      )}
    </ModalContainer>
  );
};

export default RuleModal;
