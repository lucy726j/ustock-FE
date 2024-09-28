import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import { GameHeaderProp } from "../../constants/interface";
import RuleModal from "../../Game/Tutorial/rule";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 60px;
  background-color: ${Colors.main};
  color: white;
  font-family: "SCDream6";
  font-size: x-large;
  text-align: center;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  padding-top: 15px;
  position: relative;
`;

const GameHeader: React.FC<GameHeaderProp> = ({ text }) => {
  const location = useLocation();
  const rule = location.pathname.split("/")[2];

  return (
    <Container>
      <>{text}</>
      {rule === "gameStocks" ||
      rule === "total" ||
      rule === "rank" ||
      rule === "info" ? (
        <></>
      ) : (
        <RuleModal />
      )}
    </Container>
  );
};

export default GameHeader;
