import { Player } from "@lottiefiles/react-lottie-player";
import React, { useEffect, useRef } from "react";
import animation from "./gameLoading.json";
import Mario from "./mario.json";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 100vh;
`;

const Loading = ({ loading }: { loading: boolean }) => {
  const playerRef = useRef<Player | null>(null);

  useEffect(() => {
    if (!loading && playerRef.current) {
      playerRef.current.stop();
    }
  }, [loading]);

  return (
    <Container>
      {loading && (
        <Container>
          <p>게임 입장중...</p>
          <Player
            ref={playerRef}
            src={Mario}
            style={{ height: "300px", width: "300px" }}
            loop
            autoplay={true}
          />
        </Container>
      )}
    </Container>
  );
};

export default Loading;
