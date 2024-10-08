import styled from "styled-components";
import { SaySkrrProps } from "../../../constants/interface";
import { Colors } from "../../../Styles/Colors";
import SpeechBubbleImg from "../../../img/speechBubble.png";
import { formatPrice } from "../../../util/util";

const Say = styled.div`
  position: relative;
`;

const SpeechBubble = styled.img`
  width: 220px;
  height: 150px;
  position: absolute;
  top: 1rem;
  left: 1rem;
`;
const TextBox = styled.div`
  position: absolute;
  top: 1.8rem;
  left: 2rem;
  width: 200px;
  height: 80px;
`;

const Colored = styled.span`
  color: ${Colors.main};
  font-family: "SCDream6";
`;

const SaySkrr: React.FC<SaySkrrProps> = ({ rank, money }) => {
  return (
    <Say>
      <SpeechBubble src={SpeechBubbleImg} />
      <TextBox>
        {rank !== 4 ? (
          <div>
            <Colored>{rank}등</Colored> Skrrr
            <br />
            10년 전에 투자했으면
            <br />
            <Colored>{formatPrice(money)}원</Colored>
            <br />
            벌었을텐데...
          </div>
        ) : (
          <div>
            <Colored>{rank}등</Colored> Skrrr
            <br />넌 ... 투자하지 마라...
          </div>
        )}
      </TextBox>
    </Say>
  );
};

export default SaySkrr;
