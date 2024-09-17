import styled from "styled-components";
import { SaySkrrProps } from "../../../constants/interface";
import { Colors } from "../../../Styles/Colors";
import SpeechBubbleImg from "../../../img/speechBubble.png";

const Say = styled.div`
  position: relative;
`;
//   /* 말풍선 모양.. */
//   position: absolute;
//   width: 230px;
//   height: 100px;
//   top: 20px;
//   left: 10px;
//   background: white;
//   border: 1px solid #484848;
//   color: ${Colors.main};
//   border-radius: 80px;
//   padding-left: 1.8rem;
//   padding-top: 1.2rem;

//   ::after {
//     border-top: 30px solid #484848;
//     border-left: 30px solid transparent;
//     border-right: 1px solid transparent;
//     border-bottom: 0px solid transparent;
//     content: "";
//     position: absolute;
//     top: 98px;
//     left: 160px;
//   }

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
            <Colored>{money}원</Colored>
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
