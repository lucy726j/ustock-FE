import { useParams } from "react-router-dom";
import GameButtons from "../../Component/Game/GameButtons";
import GameHeader from "../../Component/Game/GameHeader";
import GameMoney from "../../Component/Game/GameMoney";
import StocksTable from "../../Component/Game/StocksTable";
import styled from "styled-components";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const PlayPage = () => {
    const { year } = useParams<{ year: string }>();
    return (
        <Container>
            <GameHeader text={year || "Default"} />
            <GameMoney />
            <StocksTable />
            <GameButtons />
        </Container>
    );
};

export default PlayPage;
