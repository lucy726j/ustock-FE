import GameNews from "./gameNews";
import { GameNewsListProps } from "../../constants/interface";
import styled from "styled-components";

const NewsContainer = styled.div`
  margin: 30px 0px;
  width: 100%;
  height: 300px;
  overflow: scroll;
  scrollbar-width: none;
`;

const GameNewsList = ({ data }: GameNewsListProps) => {
  return (
    <NewsContainer>
      {data.map((item, index) => (
        <GameNews key={index} {...item} />
      ))}
    </NewsContainer>
  );
};

export default GameNewsList;
