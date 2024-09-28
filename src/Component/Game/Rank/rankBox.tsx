import { RankDataProps } from "../../../constants/interface";
import * as S from "./rankBoxStyle";
import gold from "../../../img/goldMedal.png";
import silver from "../../../img/silverMedal.png";
import bronze from "../../../img/bronzeMedal.png";
import { formatPrice, formatRateColor } from "../../../util/gameUtil";

const RankBox: React.FC<RankDataProps> = ({
  nickname,
  total,
  profitRate,
  index = 0,
}) => {
  const rank = index + 1;

  return (
    <S.Container>
      {rank >= 4 ? (
        <S.IndexBox>{rank}</S.IndexBox>
      ) : (
        <S.Medal src={rank === 1 ? gold : rank === 2 ? silver : bronze} />
      )}

      <S.UserContainer>
        <S.Nickname>{nickname}</S.Nickname>
        <S.Budget>{formatPrice(total)}</S.Budget>
        <S.Rate style={formatRateColor(profitRate)}>{profitRate} %</S.Rate>
      </S.UserContainer>
    </S.Container>
  );
};

export default RankBox;
