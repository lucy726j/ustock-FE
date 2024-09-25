import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { formatPrice } from "../../util/gameUtil";

interface TradeChoiceProps {
    title: string;
    choiceLeft: string;
    choiceRight: string;
    selectedOption: string | number;
    onLeftClick: () => void;
    onRightClick: () => void;
    currentPrice?: number | null;
    onQuantityChange?: (value: number) => void; // 수량 변경 핸들러 추가
}

const TradeChoice = ({
    title,
    choiceLeft,
    choiceRight,
    selectedOption,
    onLeftClick,
    onRightClick,
    currentPrice,
    onQuantityChange, // 수량 변경 핸들러
}: TradeChoiceProps) => {
    const [isSelected, setIsSelected] = useState(false);
    const choiceSectionRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsSelected(true);
    };

    const handleOutsideClick = (e: MouseEvent) => {
        if (
            choiceSectionRef.current &&
            !choiceSectionRef.current.contains(e.target as Node)
        ) {
            setIsSelected(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    // input의 값이 직접 입력되면 호출되는 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        if (newValue === "") {
            onQuantityChange?.(0);
        } else {
            const parsedValue = parseInt(newValue, 10);
            if (!isNaN(parsedValue) && parsedValue >= 0) {
                onQuantityChange?.(parsedValue);
            }
        }
    };

    return (
        <TradeChoiceContainer>
            <Title isSelected={isSelected}>{title}</Title>

            {title === "종목" && (
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <ChoiceSection
                        ref={choiceSectionRef}
                        onClick={handleClick}
                        isSelected={isSelected}
                    >
                        <ChoiceButton
                            isSelected={isSelected}
                            onClick={onLeftClick}
                        >
                            {choiceLeft}
                        </ChoiceButton>
                        <SelectedOption isSelected={isSelected}>
                            {selectedOption}
                        </SelectedOption>
                        <ChoiceButton
                            isSelected={isSelected}
                            onClick={onRightClick}
                        >
                            {choiceRight}
                        </ChoiceButton>
                    </ChoiceSection>
                    {/* 가격 정보 표시 */}
                    {currentPrice !== undefined && (
                        <CurrentPrice isSelected={isSelected}>
                            {currentPrice !== null
                                ? `${formatPrice(currentPrice)}원`
                                : "가격 정보 없음"}
                        </CurrentPrice>
                    )}
                </div>
            )}

            {title === "수량" && (
                <ChoiceSection
                    ref={choiceSectionRef}
                    onClick={handleClick}
                    isSelected={isSelected}
                >
                    <ChoiceButton isSelected={isSelected} onClick={onLeftClick}>
                        {choiceLeft}
                    </ChoiceButton>
                    <QuantityInput
                        type="number"
                        value={selectedOption}
                        onChange={handleInputChange}
                        min={0}
                        isSelected={isSelected}
                    />
                    <ChoiceButton
                        isSelected={isSelected}
                        onClick={onRightClick}
                    >
                        {choiceRight}
                    </ChoiceButton>
                </ChoiceSection>
            )}
        </TradeChoiceContainer>
    );
};

const TradeChoiceContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    margin: 30px 0;
`;

const Title = styled.h2<{ isSelected: boolean }>`
    font-size: 15px;
    color: ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
    margin-left: -200px;
    margin-bottom: 8px;
`;

const ChoiceSection = styled.div<{ isSelected: boolean }>`
    width: 250px;
    height: 80px;
    border-radius: 20px;
    background-color: #f0f0f0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 20px;
    border: ${(props) => (props.isSelected ? "3px solid #615EFC" : "none")};
    font-size: 13px;
`;

const ChoiceButton = styled.div<{ isSelected: boolean }>`
    width: 30px;
    height: 30px;
    border-radius: 50px;
    border: 2.5px solid ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 15px;
    font-weight: 700;
    color: ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
`;

// 수량을 입력받는 인풋 필드
const QuantityInput = styled.input<{ isSelected: boolean }>`
    width: 60px;
    text-align: center;
    border: none;
    font-size: 16px;
    color: ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
    background-color: transparent;
    outline: none;
`;

const SelectedOption = styled.h3<{ isSelected: boolean }>`
    width: 80px;
    color: ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
`;

const CurrentPrice = styled.div<{ isSelected: boolean }>`
    margin-top: -25px;
    font-size: 13px;
    color: ${(props) => (props.isSelected ? "#615EFC" : "#656565")};
`;

export default TradeChoice;
