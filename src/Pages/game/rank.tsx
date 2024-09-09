import { useState, useEffect } from "react";
import GameHeader from "../../Component/Game/GameHeader";
import { RankDataProps, RankListProps } from "../../constants/interface";
import axios from "axios";
import RankList from "../../Component/Game/Rank/rankList";

const dataList: RankListProps = {
  data: [
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
    {
      nickname: "string",
      budget: 0,
      rate: 0,
    },
  ],
};

const Rank = () => {
  const [rankList, setRankList] = useState<RankDataProps[]>([]);

  // 더미 데이터 ver
  useEffect(() => {
    setRankList(dataList.data);
  });

  // 랭킹리스트 불러오는 api
  // useEffect(() => {
  //   axios
  //     .get(`${process.env.REACT_APP_API_URL}/v1/game/ranking`)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         const list = res.data;
  //         setRankList(list);
  //       }
  //     });
  // }, []);

  return (
    <div>
      <GameHeader text={"명예의 전당"} />

      <RankList data={rankList} />
    </div>
  );
};

export default Rank;
