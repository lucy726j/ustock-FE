import RankBox from "./rankBox";
import { RankListProps } from "../../../constants/interface";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 1rem;
`;

const RankList: React.FC<RankListProps> = ({ data }) => {
  return (
    <Container>
      {data.length < 1 ? (
        <p>게임 결과가 없습니다!</p>
      ) : (
        <>
          {data.map((item, index) => {
            return <RankBox key={index} index={index} {...item} />;
          })}
        </>
      )}
    </Container>
  );
};

export default RankList;
