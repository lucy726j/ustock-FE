import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import { Input } from "../Input/input";
import Button from "../Button/button";
import Img from "../../img/calcul.png";
import { Colors } from "../../Styles/Colors";
import { useState } from "react";

const Container = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0px 4px 4px rgb(0, 0, 0, 0.25);
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 5px;
`;

const User = styled.span`
  color: ${Colors.main};
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

const Label = styled.div``;

const Calculator = () => {
  // CHECK API 연결할 떄,, 현재 시점 보다 미래의 날짜를 했을 때, 검색 불가하게 막기 필요
  //       없는 날짜를 검색하면 검색 불가하게 막기 필요
  const year = [
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
  ];
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];

  const [price, setPrice] = useState("");

  // const handle;

  return (
    <Container>
      <TitleContainer>
        <img src={Img} alt="앵무새가 컴퓨터 보는 이미지" />
        <span>
          만약 <User>스껄</User>님이 이 때 샀다면?
        </span>
      </TitleContainer>
      <div>
        <Label>년도 월 일</Label>
        <DropContainer>
          <Dropdown dropList={year} />
          <Dropdown dropList={month} />
          <Dropdown dropList={day} />
        </DropContainer>
      </div>
      <div>
        <Label>금액</Label>
        {/* <Input
          placeholder="금액"
          size="small"
          colorType="strokeType"
          errorMessage="금액을 입력해주세요"
          // value={}
          // isValid={}
        /> */}
      </div>
      <Button
        children={"결과 확인하기"}
        state="normal"
        size="gradientBtn"
        colorType="main"
      />
    </Container>
  );
};

export default Calculator;
