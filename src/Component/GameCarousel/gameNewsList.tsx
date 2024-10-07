import GameNews from "./gameNews";
import { GameNewsListProps } from "../../constants/interface";
import * as S from "./gameNewsStyle";

const GameNewsList = ({ data }: GameNewsListProps) => {
  return (
    <S.NewsContainer>
      {data.map((item, index) => (
        <GameNews key={index} {...item} />
      ))}
    </S.NewsContainer>
  );
};

export default GameNewsList;
