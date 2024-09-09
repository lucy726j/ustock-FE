import RankBox from "./rankBox";
import { RankListProps } from "../../../constants/interface";

const RankList: React.FC<RankListProps> = ({ data }) => {
  return (
    <div>
      {data.map((item, index) => {
        return <RankBox key={index} index={index} {...item} />;
      })}
    </div>
  );
};

export default RankList;
