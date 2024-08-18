import React from "react";
import newPortfolio from "../../img/newPortfolio.png";
import { Input } from "../Input/input";
import "./AddPortfolioStyle.css";
import icon from "../../img/Icon.png";
import Button from "../Button/button";

const AddPortfolio: React.FC = () => {
    const showConfirmButton = true; // 이 값을 조건에 따라 true 또는 false로 설정

    return (
        <div className="AddPortfolio">
            <img src={newPortfolio} alt="New Portfolio" />
            <h1>새 포트폴리오 추가</h1>
            <p>이름</p>
            <Input 
                placeholder="포트폴리오 이름을 입력하세요"
                size="medium"
                colorType="fillType"
                icon={<img src={icon} alt="Icon" />}
            />
            <div className="button-section">
                <Button state="normal" colorType="main" size="small">취소</Button>
                {showConfirmButton && (
                    <Button state="normal" colorType="main" size="small">확인</Button>
                )}
            </div>
        </div>
    );
}

export default AddPortfolio;
