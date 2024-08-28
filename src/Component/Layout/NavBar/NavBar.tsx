import styled from "styled-components";
import homeImg from "../../../img/home.png";
import chartImg from "../../../img/chart.png";
import portfolioImg from "../../../img/portfolio.png";
import gameImg from "../../../img/shutUp.png";
import { useNavigate } from "react-router-dom";
import { NavBoxProps } from "../../../constants/interface";

const NavContainer = styled.div`
  position: fixed;
  bottom: 0;
  width: 500px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0px -2px 5px -2px #ada9bb;
  padding: 12px;
  background-color: white;
  z-index: 2;
`;

const NavBoxStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const ImgStyle = styled.img`
  width: 25px;
  height: 25px;
`;

const TextStyle = styled.div`
  font-size: 12px;
  color: #ada9bb;
`;

const NavBox: React.FC<NavBoxProps> = ({ id, onClick, children }) => {
  return <NavBoxStyle onClick={() => onClick(id)}>{children}</NavBoxStyle>;
};

const NavBar = () => {
  const nav = useNavigate();

  const handleClick = (id: string) => {
    nav(id);
  };

  return (
    <NavContainer>
      <NavBox id="/" onClick={handleClick}>
        <ImgStyle src={homeImg} alt="홈 버튼 이미지" />
        <TextStyle>홈</TextStyle>
      </NavBox>
      <NavBox id="stocks" onClick={handleClick}>
        <ImgStyle src={chartImg} alt="종목 조회 버튼 이미지" />
        <TextStyle>종목 조회</TextStyle>
      </NavBox>
      <NavBox id="portfolio" onClick={handleClick}>
        <ImgStyle src={portfolioImg} alt="포트폴리오 버튼 이미지" />
        <TextStyle>포트폴리오</TextStyle>
      </NavBox>
      <NavBox id="game" onClick={handleClick}>
        <ImgStyle src={gameImg} alt="스껄게임 버튼 이미지" />
        <TextStyle>스껄 게임</TextStyle>
      </NavBox>
    </NavContainer>
  );
};

export default NavBar;
