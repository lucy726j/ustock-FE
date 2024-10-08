import React from "react";
import styled from "styled-components";
import animation from "./Animation.json";
import Lottie from "react-lottie-player";

const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
`;

interface HappyNewYearModalProps {
    isVisible: boolean;
}

const HappyNewYearModal: React.FC<HappyNewYearModalProps> = ({ isVisible }) => {
    if (!isVisible) return null;
    return (
        <ModalBackground>
            <ModalContent>
                <Lottie
                    loop
                    play
                    animationData={animation}
                    style={{ width: 300, height: 500 }}
                />
            </ModalContent>
        </ModalBackground>
    );
};

export default HappyNewYearModal;
