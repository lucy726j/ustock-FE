import RankBox from "./rankBox";
import { RankListProps } from "../../../constants/interface";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 2rem;
`;

const RankList: React.FC<RankListProps> = ({ data }) => {
  return (
    <Container>
      {data.map((item, index) => {
        return <RankBox key={index} index={index} {...item} />;
      })}
    </Container>
  );
};

export default RankList;
