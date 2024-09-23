import styled from "styled-components";
import GameHeader from "../../Component/Game/GameHeader";
import Button from "../../Component/Button/button";
import SkrrImg from "../../img/SkerrImg.png";
import SaySkrr from "../../Component/Game/Rank/saySkrr";
import axios from "axios";
import { useEffect, useState } from "react";
import { RankDataProps } from "../../constants/interface";
import RankList from "../../Component/Game/Rank/rankList";
import { useNavigate } from "react-router-dom";
import BentoBar from "../../Game/Main/BentoBar/bentoBar";
import swal from "sweetalert";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

const SkrrContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: relative;
`;

const ImgStyle = styled.img`
  margin-left: 200px;
`;

const TextStyle = styled.div`
  margin-top: 3rem;
  margin-bottom: 1rem;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2rem;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TotalResult = () => {
  const nav = useNavigate();
  const [rankList, setRankList] = useState<RankDataProps[]>([]);
  const [userRank, setUserRank] = useState<number>(0);
  const [userMoney, setUserMoney] = useState<number>(0);

  // 랭킹 리스트 요청 api
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/result`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const list = res.data;
          setRankList(list);

          // 사용자 순위 저장
          const userIndex = list.findIndex(
            (item: any) => item.playerType === "USER"
          );
          setUserRank(userIndex + 1);

          // 사용자 최종 수익금 저장
          const userBudget = list[userIndex].total;
          setUserMoney(userBudget);
        }
      });
  }, []);

  // 게임 결과 저장
  const handleRankBtn = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/game/result/save`,
        {},
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          nav("/game/rank");
        } else {
          {
            swal({
              title: "등록에 실패하셨습니다.",
              text: "다시 시도해주세요!",
              icon: "error",
            });
          }
        }
      });
  };

  return (
    <Container>
      <GameHeader text={"최 종  결 과"} />

      <SkrrContainer>
        <SaySkrr rank={userRank} money={userMoney} />
        <ImgStyle src={SkrrImg} alt="껄무새 이미지" />
      </SkrrContainer>

      <RankList data={rankList} />

      <BtnContainer>
        <BtnBox>
          <TextStyle>내가 거래한 주식의 정체는?</TextStyle>
          <Button
            children="🔎 주식 정체 확인하러 가기"
            $state="normal"
            $colorType="gradient"
            $size="gradientBtn"
            onClick={() => {
              nav("/game/gameStocks");
            }}
          />
        </BtnBox>
        <BtnBox>
          <TextStyle>랭킹 등록</TextStyle>
          <Button
            children="내 랭킹 등록하기"
            $state="normal"
            $colorType="gradient"
            $size="medium"
            onClick={() => {
              handleRankBtn();
            }}
          />
        </BtnBox>
      </BtnContainer>
      <BentoBar />
    </Container>
  );
};

export default TotalResult;
