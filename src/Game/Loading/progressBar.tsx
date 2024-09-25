import styled from "styled-components";
import Mario from "./mario.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect, useRef } from "react";

const Container = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 10px auto;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  padding: 5px;
  display: flex;
  border: 2px solid #ff79c6;
`;

const Bar = styled.div`
  background: linear-gradient(90deg, #ff79c6, #8be9fd);
  height: 30px;
  border-radius: 50px;
  transition: width 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.span`
  color: white;
  font-weight: bold;
  z-index: 1;
  font-size: 12px;
`;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  max-width: 500px;
  align-items: center;
  position: relative;
  transition: left 0.4s ease; /* 부드럽게 이동 */
  height: 0;
`;

const Label = styled.p`
  font-size: 12px;
  font-weight: bold;
  padding: 0;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (progress === 0 && playerRef.current) {
      playerRef.current.stop();
    }
  }, [progress]);

  return (
    <>
      <Wrapper>
        {/* <Label style={{ marginLeft: `${progress}%` }}>게임 진행도...</Label> */}
        <Player
          ref={playerRef}
          src={Mario}
          style={{
            height: "80px",
            width: "80px",
            top: "-45px",
            left: `${progress}%`,
            position: "absolute",
            transform: "translateX(-50%)",
          }}
          loop
          autoplay={true}
        />
      </Wrapper>
      <Container>
        <Bar
          style={{
            width: `${progress}%`,
          }}
        >
          <Text>{progress.toFixed(0)}%</Text>
        </Bar>
      </Container>
    </>
  );
};

export default ProgressBar;
