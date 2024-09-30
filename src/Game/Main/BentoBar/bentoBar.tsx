import { useEffect, useRef, useState } from "react";
import { CgMenuGridO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { ListBox, Restart, IconDiv } from "./bentoStyle";

const BentoBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const outsideRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const Nav = (location: string) => {
    if (location === "game") {
      navigate("/game");
      localStorage.removeItem("hasSeenTutorial");
    } else if (location === "rank") {
      navigate("/game/rank");
      localStorage.removeItem("hasSeenTutorial");
    } else {
      navigate("/");
      localStorage.removeItem("hasSeenTutorial");
    }
  };

  // 슬라이드 토글
  const toggleSlide = () => {
    setIsOpen((prev) => !prev);
  };

  // 외부 클릭 감지 및 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        outsideRef.current &&
        !outsideRef.current.contains(e.target as Node) &&
        iconRef.current &&
        !iconRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [outsideRef]);

  return (
    <div style={{ width: "500px", position: "fixed", bottom: "0px" }}>
      <IconDiv
        ref={iconRef}
        style={{
          // position: "absolute",
          // top: "750px",
          // left: "420px",

          left: "430px",
          minWidth: "25px",
          bottom: "30px",
        }}
        onClick={toggleSlide}
      >
        <CgMenuGridO style={{ width: "25px", height: "25px" }} />

        {isOpen ? (
          <ListBox ref={outsideRef}>
            <Restart onClick={() => Nav("game")}>게임 재시작</Restart>
            <Restart onClick={() => Nav("rank")}>랭킹</Restart>
            <Restart onClick={() => Nav("home")}>홈</Restart>
          </ListBox>
        ) : (
          <></>
        )}
      </IconDiv>
    </div>
  );
};

export default BentoBar;
