import { RankDataProps } from "../../../constants/interface";
import * as S from "./rankBoxStyle";
import gold from "../../../img/goldMedal.png";
import silver from "../../../img/silverMedal.png";
import bronze from "../../../img/bronzeMedal.png";
import skrr from "../../../img/SkerrImg.png";

const RankBox: React.FC<RankDataProps> = ({
  nickname,
  budget,
  rate,
  index = 0,
}) => {
  const rank = index + 1;

  return (
    <S.Container>
      {/* 메달 or 순위 */}
      {rank >= 4 ? (
        <S.IndexBox>{rank}</S.IndexBox>
      ) : (
        <S.Medal src={rank === 1 ? gold : rank === 2 ? silver : bronze} />
      )}

      <S.UserContainer>
        <S.Nickname>{nickname}</S.Nickname>
        <S.Budget>{budget}</S.Budget>
        <S.Rate>{rate} %</S.Rate>
      </S.UserContainer>
    </S.Container>
  );
};

export default RankBox;
