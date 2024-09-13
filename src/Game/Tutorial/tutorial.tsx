import React from "react";
import Portal from "./Portal";
import "./tuto.css";

interface TutorialProps {
  isFirstStep: boolean;
  setFirstStep: (value: boolean) => void;
  setSecondStep: (value: boolean) => void;
  onClose: () => void;
  title?: string;
  description?: string;
}

const Tutorial: React.FC<TutorialProps> = ({
  isFirstStep,
  setFirstStep,
  setSecondStep,
  onClose,
  title = "만나서 반가워요",
  description = "스껄게임 사용방법을 알려드릴게요!",
}) => {
  return (
    <Portal>
      <main id="tutorial">
        {isFirstStep && (
          <div id="page">
            {/* 어두운 배경 */}
            <div className="background">
              <div className="rowBox">
                {/* 뚫릴 부분(강조) */}
                <div className="mainIcon" />
                <p>여기서 언제든지 다시 볼 수 있어요.</p>
              </div>
            </div>
            <div className="contentBg">
              <div className="welcomeBox">
                <div className="welcomeModal">
                  <section id="title">
                    <h2>만나서 반가워요</h2>
                    <p>스껄게임 사용방법을 알려드릴게요!</p>
                  </section>
                  <section id="bottonBox">
                    <button type="button" onClick={onClose}>
                      그만 볼래요
                    </button>
                    <button
                      onClick={() => {
                        setFirstStep(false);
                        setSecondStep(true);
                      }}
                      type="button"
                      style={{ color: "#4194F1" }}
                    >
                      좋아요
                    </button>
                    {/* 스킵 버튼 */}
                    <button
                      onClick={() => {
                        setFirstStep(false);
                        setSecondStep(true);
                      }}
                      type="button"
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "#FF0000",
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                      }}
                    >
                      X
                    </button>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </Portal>
  );
};

export default Tutorial;
