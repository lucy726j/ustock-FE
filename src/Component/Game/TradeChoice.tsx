import { useEffect, useRef, useState } from "react";
import "./TradeChoiceStyle.css";

interface TradeChoiceProps {
    title: string;
    choiceLeft: string;
    choiceRight: string;
    selectedOption: string;
    onLeftClick: () => void;
    onRightClick: () => void;
}

const TradeChoice = ({
    title,
    choiceLeft,
    choiceRight,
    selectedOption,
    onLeftClick,
    onRightClick,
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
        document.addEventListener("click", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="TradeChoice" style={{ margin: "30px 0" }}>
            <h2
                style={{
                    color: isSelected ? "#615EFC" : "#a8a8a8",
                }}
            >
                {title}
            </h2>
            <div
                className="choice-section"
                ref={choiceSectionRef}
                onClick={handleClick}
                style={{
                    border: isSelected ? "3px solid #615EFC" : "none",
                }}
            >
                <div
                    className="choice-button"
                    onClick={onLeftClick}
                    style={{
                        border: isSelected
                            ? "3px solid #615EFC"
                            : "3px solid #a8a8a8",
                        color: isSelected ? "#615EFC" : "#a8a8a8",
                    }}
                >
                    {choiceLeft}
                </div>
                <h3
                    style={{
                        color: isSelected ? "#615EFC" : "#a8a8a8",
                    }}
                >
                    {selectedOption}
                </h3>
                <div
                    className="choice-button"
                    onClick={onRightClick}
                    style={{
                        border: isSelected
                            ? "3px solid #615EFC"
                            : "3px solid #a8a8a8",
                        color: isSelected ? "#615EFC" : "#a8a8a8",
                    }}
                >
                    {choiceRight}
                </div>
            </div>
        </div>
    );
};

export default TradeChoice;
