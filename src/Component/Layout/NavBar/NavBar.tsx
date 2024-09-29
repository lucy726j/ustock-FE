import styled from "styled-components";
import SkrrrGame from "../../../img/SkerrImg.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { NavBoxProps } from "../../../constants/interface";
import { IconWrapperProps } from "../../../constants/interface";
import { HiOutlineHome } from "react-icons/hi2";
import { BiLineChart } from "react-icons/bi";
import { SlPieChart } from "react-icons/sl";
import { Colors } from "../../../Styles/Colors";

// Navigation container
const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  border-top: 1px solid rgba(200, 200, 200, 0.5);
  padding: 12px;
  background-color: white;
  z-index: 2;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: space-evenly;
  }
`;

// Style for icons
const ImgStyle = styled.div<{ $active?: boolean }>`
  width: 25px;
  height: 25px;
  color: ${({ $active }) => ($active ? Colors.main : "#ada9bb")};
`;

// Style for text
const TextStyle = styled.div<{ $active?: boolean }>`
  font-size: 12px;
  color: ${({ $active }) => ($active ? Colors.main : "#ada9bb")};
`;

// Style for each nav box
const NavBoxStyle = styled.div<{ $isActive?: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  &:hover ${ImgStyle}, &:hover ${TextStyle} {
    color: ${Colors.main}; /* Change both icon and text color on hover */
  }
`;

// NavBox Component
const NavBox: React.FC<NavBoxProps> = ({
  id,
  onClick,
  children,
  $isActive,
}) => {
  return (
    <NavBoxStyle onClick={() => onClick(id)} $isActive={$isActive}>
      {children}
    </NavBoxStyle>
  );
};

// IconWrapper Component
const IconWrapper: React.FC<IconWrapperProps> = ({
  IconComponent,
  $isActive,
}) => <ImgStyle as={IconComponent} $active={$isActive} />;

// NavBar Component
const NavBar: React.FC = () => {
  const nav = useNavigate();
  const [current, setCurrent] = useState<string | null>("/");

  const handleClick = (id: string) => {
    setCurrent(id); // Update the current state
    nav(id); // Navigate to the clicked route
  };

  return (
    <NavContainer>
      <NavBox id="/" onClick={handleClick} $isActive={current === "/"}>
        <IconWrapper
          IconComponent={HiOutlineHome}
          $isActive={current === "/"}
        />
        <TextStyle $active={current === "/"}>홈</TextStyle>
      </NavBox>
      <NavBox
        id="stocks"
        onClick={handleClick}
        $isActive={current === "stocks"}
      >
        <IconWrapper
          IconComponent={BiLineChart}
          $isActive={current === "stocks"}
        />
        <TextStyle $active={current === "stocks"}>종목 조회</TextStyle>
      </NavBox>
      <NavBox
        id="portfolio"
        onClick={handleClick}
        $isActive={current === "portfolio"}
      >
        <IconWrapper
          IconComponent={SlPieChart}
          $isActive={current === "portfolio"}
        />
        <TextStyle $active={current === "portfolio"}>포트폴리오</TextStyle>
      </NavBox>
      <NavBox id="game" onClick={handleClick} $isActive={current === "game"}>
        <img
          src={SkrrrGame}
          alt="스껄게임 버튼 이미지"
          style={{ width: "25px", height: "25px" }}
        />
        <TextStyle $active={current === "game"}>스껄 게임</TextStyle>
      </NavBox>
    </NavContainer>
  );
};

export default NavBar;
