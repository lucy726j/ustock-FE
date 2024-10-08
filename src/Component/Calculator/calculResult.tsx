import Salary from "../../img/person.png";
import Candy from "../../img/candy.png";
import Soul from "../../img/Gukbap.png";
import Chicken from "../../img/chicken.png";
import Iphone from "../../img/iphone.png";
import Skrrr from "../../img/SkerrImg.png";
import { CalculResultProps } from "../../constants/interface";
import { formatPrice } from "../../util/util";
import * as S from "./calculResultStyle";

const CalculResult: React.FC<CalculResultProps> = ({
  price,
  slave,
  candy,
  soul,
  chicken,
  iphone,
}) => {
  let userName: string = "사용자";

  const userData = localStorage.getItem("user");
  if (userData) {
    userName = JSON.parse(userData).name;
  }

  return (
    <>
      {price !== 0 ? (
        <S.Container>
          <S.SpanContainer>
            <S.SpanStyle $isNegative={true}>{userName}</S.SpanStyle>
            님은
            <S.SpanStyle $isNegative={price < 0}>
              {formatPrice(Math.abs(price))}
            </S.SpanStyle>
            원을 <span>{price >= 0 ? "벌었습니다." : "잃었습니다.."}</span>
          </S.SpanContainer>
          <S.ResultContainer>
            <S.DivContainer>
              <S.ImgStyle src={Salary} alt="" />
              <S.SpanContainer>
                2024년 최저시급 기준{" "}
                <S.SpanStyle $isNegative={price < 0}>
                  {formatPrice(parseInt(slave))}
                </S.SpanStyle>
                시간
              </S.SpanContainer>
            </S.DivContainer>
            <S.DivContainer>
              <S.ImgStyle src={Candy} alt="" />
              <S.SpanContainer>
                새콤달콤
                <S.SpanStyle $isNegative={price < 0}>
                  {formatPrice(parseInt(candy))}
                </S.SpanStyle>
                개
              </S.SpanContainer>
            </S.DivContainer>
            <S.DivContainer>
              <S.ImgStyle src={Soul} alt="" />
              <S.SpanContainer>
                국밥
                <S.SpanStyle $isNegative={price < 0}>
                  {formatPrice(parseInt(soul))}
                </S.SpanStyle>
                그릇
              </S.SpanContainer>
            </S.DivContainer>
            <S.DivContainer>
              <S.ImgStyle src={Chicken} alt="" />
              <S.SpanContainer>
                치킨{" "}
                <S.SpanStyle $isNegative={price < 0}>
                  {formatPrice(parseInt(chicken))}
                </S.SpanStyle>
                마리
              </S.SpanContainer>
            </S.DivContainer>
            <S.DivContainer>
              <S.ImgStyle src={Iphone} alt="" />
              <S.SpanContainer>
                아이폰
                <S.SpanStyle $isNegative={price < 0}>
                  {formatPrice(parseInt(iphone))}
                </S.SpanStyle>
                대
              </S.SpanContainer>
            </S.DivContainer>
            <S.SkrrrBird src={Skrrr} alt="" />
            <S.SkrrrText>{price >= 0 ? "살껄!@" : "팔껄!@"}</S.SkrrrText>
          </S.ResultContainer>
        </S.Container>
      ) : (
        <S.BirdContainer>
          <S.NeverBuyText>그 돈으론 1주도 사지 못했~스껄~,,,@</S.NeverBuyText>
          <S.NeverBuySkrrrBird src={Skrrr} alt="스껄무새 이미지" />
        </S.BirdContainer>
      )}
    </>
  );
};

export default CalculResult;
