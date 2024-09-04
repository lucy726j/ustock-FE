import styled from "styled-components";
import { Colors } from "../../Styles/Colors";
import { GameHeaderProp } from "../../constants/interface";

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
`;

const GameHeader: React.FC<GameHeaderProp> = ({ text }) => {
  return <Container>{text}</Container>;
};

export default GameHeader;
