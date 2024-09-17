import { useEffect, useState } from "react";
import Portal from "./Portal";
import "./exStyle.scss";

interface TutorialProps {
  fir: boolean;
  setFir: (value: boolean) => void;
  setSec: (value: boolean) => void;
  step: number;
  closeSecondTutorial: () => void;
  tutorialClose: () => void;
  sec: boolean;
}

const ExSAm: React.FC<TutorialProps> = ({
  step,
  tutorialClose,
  setFir,
  setSec,
  fir,
  sec,
  closeSecondTutorial,
}) => {
  const [currentStep, setCurrentStep] = useState(step);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  const onNextStep = () => {
    setCurrentStep((prevStep) => prevStep + 1); // 단계 증가
  };

  useEffect(() => {
    const tutorialSeen = localStorage.getItem("hasSeenTutorial");
    if (tutorialSeen === "true") {
      setHasSeenTutorial(true);
    } else {
      setHasSeenTutorial(false);
    }
    // 튜토리얼 중일때 스크롤 막기
    if (sec) {
      document.body.style.overflow = "hidden";

      // 5일 때 자동 스크롤
      if (currentStep === 5) {
        const scrollTimer = setTimeout(() => {
          const element = document.querySelector(".stock");
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }); // DOM이 렌더링 된 후에 스크롤 실행
      }
      // step이 1~6일때 3초마다 다음 단계로 자동 진행
      if (currentStep > 1 && currentStep < 8) {
        const timer = setTimeout(() => {
          onNextStep(); //  다음 단계로 넘어감
        }, 3000);
        return () => clearTimeout(timer); // 진행 타이머 정리
      }
    } else {
      // 튜토리얼 종료 시 스크롤 허용
      document.body.style.overflow = "auto";
    }
    // 컴포넌트 언마운트 시 스크롤 허용
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sec, currentStep, onNextStep]);

  const handleComlete = () => {
    // 튜토리얼 완료 시 로컬스토리지에 값 저장
    localStorage.setItem("hasSeenTutorial", "true");
    setHasSeenTutorial(true);
  };

  if (hasSeenTutorial) {
    return null;
  }

  return (
    <Portal>
      <main id="tutorial">
        {/* 첫번째 튜토리얼 */}
        {fir && currentStep == 1 && (
          <div id="page">
            <div className="background"></div>
            <div className="contentBg">
              <div className="welcomeBox">
                <div className="welcomeModal">
                  <section id="title">
                    <h2 style={{ marginBottom: "0.5rem" }}>만나서 반가워요</h2>
                    <p>스껄 게임 사용법을 알려드릴게요!</p>
                  </section>
                  <section id="bottomBox">
                    <button
                      type="button"
                      onClick={tutorialClose}
                      style={{ color: "#919eab;" }}
                    >
                      그만 볼래요
                    </button>
                    <button
                      onClick={() => {
                        setFir(false);
                        setSec(true);
                        setCurrentStep(2);
                      }}
                      type="button"
                      style={{ color: "#4194F1" }}
                    >
                      좋아요
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 -2 */}
        {sec && currentStep === 2 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon" />
                <p>
                  2014년부터 게임이 시작되고, <br />
                  게임 한 회당 1년단위로 진행됩니다!
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 -2 */}
        {sec && currentStep === 3 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox2">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon2" />
                <p>게임 시작 시 50만원을 지급받습니다!</p>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 -4 */}
        {sec && currentStep === 4 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox3">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon3" />
                <p>
                  더보기를 누르면 <br />
                  내가 보유한 종목 정보를{" "}
                  <em
                    style={{
                      color: "#FF5759",
                      fontStyle: "unset",
                    }}
                  >
                    자세히{" "}
                  </em>
                  알 수 있습니다 😉
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 - 5 */}
        {sec && currentStep === 5 && (
          <div id="page" className="stock">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox4">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon4" />
                <p>
                  아래 표에서는{" "}
                  <em
                    style={{
                      color: "#FF5759",
                      fontStyle: "unset",
                    }}
                  >
                    전년도
                  </em>
                  는 얼마였는지,
                  <br />
                  전년도 대비 얼마나{" "}
                  <em
                    style={{
                      color: "#FF5759",
                      fontStyle: "unset",
                    }}
                  >
                    수익률
                  </em>
                  이 났는지 확인할 수 있어요.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 - 6 */}
        {sec && currentStep === 6 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox5">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon5" />
                <p>
                  매 회 정보거래소에서 원하는 종목의 뉴스를 구매해서 확인할 수
                  있습니다.
                  <br /> 정보는 매 회 단계별 1개씩, 총{" "}
                  <em
                    style={{
                      color: "#FF5759",
                      fontStyle: "unset",
                    }}
                  >
                    3번만
                  </em>{" "}
                  확인할 수 있습니다!
                </p>
              </div>
            </div>
          </div>
        )}
        {/* 두번째 튜토리얼 - 7 */}
        {sec && currentStep === 7 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox6">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon6" />
                <p>원하는 종목을 구매할 수 있습니다.</p>
              </div>
            </div>
          </div>
        )}

        {/* 두번째 튜토리얼 - 7 */}
        {sec && currentStep === 8 && (
          <div id="page">
            <div className="background">
              {" "}
              {/* // 어두운 배경 */}
              <div className="rowBox7">
                {/* // 강조할 부분 (뚫릴 부분) */}
                <div className="mainIcon7" />
                <p>
                  이번 턴의 종목 거래가 끝났다면,
                  <br /> 넘어가기 버튼을 통해서 다음 턴으로 넘어가세yo!
                </p>
                <button
                  onClick={() => {
                    closeSecondTutorial();
                    handleComlete();
                  }}
                >
                  {">>"} 게임 시작하기
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </Portal>
  );
};

export default ExSAm;
