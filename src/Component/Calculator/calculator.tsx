import styled from "styled-components";
import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/button";
import Img from "../../img/calcul.png";
import { Colors } from "../../Styles/Colors";
import { useState } from "react";
import { CalculResultProps } from "../../constants/interface";
import { Input } from "../Input/input";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CalculResult from "./calculResult";
import swal from "sweetalert";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 50px;
  border-top: 2px solid rgb(0, 0, 0, 0.2);
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: end;
  gap: 5px;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const User = styled.span`
  color: ${Colors.main};
`;

const DropContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3px;
`;

const Label = styled.div`
  margin-bottom: 0.5rem;
  margin-left: 1rem;
`;

const Calculator = () => {
  // CHECK API 연결할 떄,, 현재 시점 보다 미래의 날짜를 했을 때, 검색 불가하게 막기 필요
  //       없는 날짜를 검색하면 검색 불가하게 막기 필요
  const year = [
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
    "2021",
    "2022",
    "2023",
    "2024",
  ];
  const month = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
  ];
  const day = [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
  ];

  const [price, setPrice] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2014");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [result, setResult] = useState<CalculResultProps | null>(null);
  const [error, setError] = useState("");

  const location = useLocation();
  const code = location.pathname.split("/")[2];

  const ConfirmHandler = async () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/stocks/${code}/skrrr?date=${
          selectedYear + "/" + selectedMonth + "/" + selectedDay
        }&price=${price}`
      )
      .then((res) => {
        console.log("계신기 값 : ", res.data);
        const data = res.data;
        setResult(data);
        setError("해당 주식이 상장되지 않은 날짜입니다.");
      })
      .catch((error) => {
        console.log(error);
        setIsValid(false);
        swal({
          title: "서버에러발생...",
          icon: "error",
        });
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPrice(e.target.value);
    if (e.target.value) {
      setIsValid(true);
    }
    if (value === "") {
      setError("금액을 입력해주세요");
      setIsValid(false);
    } else if (isNaN(Number(value))) {
      setError("숫자를 입력해주세요");
      setIsValid(false);
    }
  };

  const handleSelectedYear = (category: number | string) => {
    if (typeof category === "string") {
      setSelectedYear(category);
    }
  };

  const handleSelectedMonth = (category: number | string) => {
    if (typeof category === "string") {
      setSelectedMonth(category);
    }
  };

  const handleSelectedDay = (category: number | string) => {
    if (typeof category === "string") {
      setSelectedDay(category);
    }
  };

  const handleRetry = () => {
    setResult(null);
  };

  return result ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: "2rem",
      }}
    >
      <CalculResult {...result} />
      <Button
        children={"다시 계산하기"}
        state="normal"
        size="gradientBtn"
        colorType="gradient"
        onClick={handleRetry}
      />
    </div>
  ) : (
    <Container>
      <TitleContainer>
        <img src={Img} alt="앵무새가 컴퓨터 보는 이미지" />
        <span style={{ fontSize: "20px" }}>
          만약 <User>스껄</User>님이 이 때 샀다면?
        </span>
      </TitleContainer>
      <div style={{ marginBottom: "0.5rem" }}>
        <div>
          <Label>날짜 선택</Label>
          <DropContainer>
            <Dropdown dropList={year} onSelect={handleSelectedYear} />
            <Dropdown dropList={month} onSelect={handleSelectedMonth} />
            <Dropdown dropList={day} onSelect={handleSelectedDay} />
          </DropContainer>
        </div>
        <div>
          <Label>금액</Label>

          <Input
            placeholder="금액"
            size="small"
            colorType="strokeType"
            errorMessage={error}
            value={price}
            onChange={handleInputChange}
            isValid={isValid}
          />
        </div>
      </div>
      <Button
        children={"결과 확인하기"}
        state="normal"
        size="gradientBtn"
        colorType="gradient"
        onClick={ConfirmHandler}
      />
    </Container>
  );
};

export default Calculator;
