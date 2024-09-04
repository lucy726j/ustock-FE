import styled from "styled-components";
import GameHeader from "../../Component/Game/GameHeader";

const Say = styled.div`
  position: relative;
  background: #00aabb;
  border-radius: 0.4em;

  ::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 20px solid transparent;
    border-top-color: #00aabb;
    border-bottom: 0;
    border-left: 0;
    margin-left: -10px;
    margin-bottom: -20px;
  }
`;

const TotalResult = () => {
  return (
    <div>
      <GameHeader text={"최 종  결 과"} />
      <Say>
        <h1>1등 Skrrr</h1>
        <p>10년 전에 투자했으면</p>
        <p>1000000원 벌었을텐데...</p>
      </Say>
    </div>
  );
};

export default TotalResult;
