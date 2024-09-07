import info from "../../img/GameButton/infoImg.png";
import trade from "../../img/GameButton/tradeImg.png";
import pass from "../../img/GameButton/passImg.png";
import "./GameButtonsStyle.css";
import { useNavigate, useParams } from "react-router-dom";

interface GameButtonsProps {
    openTradeModal: () => void;
}

const GameButtons = ({ openTradeModal }: GameButtonsProps) => {
    const nav = useNavigate();
    const { year } = useParams<{ year: string }>();

    // 정보 거래소로 이동
    const goToInfoPage = () => {
        if (year) {
            nav(`/game/info/${year}`);
        }
    };

    return (
        <div className="GameButtonsWrapper">
            <div className="GameButton" onClick={goToInfoPage}>
                <img src={info}></img>
                <span>정보거래소</span>
            </div>
            <div className="GameButton" onClick={openTradeModal}>
                <img src={trade}></img>
                <span>거래하기</span>
            </div>
            <div className="GameButton">
                <img src={pass}></img>
                <span>넘어가기</span>
            </div>
        </div>
    );
};

export default GameButtons;
