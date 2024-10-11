import { styled } from "styled-components";

export const ButtonDiv = styled.div`
    display: flex;
    margin-top: 2rem;
    margin-left: 2rem;
    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

export const GameTitle = styled.p`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    font-weight: 900;
    margin-bottom: 1rem;
`;
