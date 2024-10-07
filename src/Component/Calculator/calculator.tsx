import Dropdown from "../Dropdown/Dropdown";
import Button from "../Button/button";
import Img from "../../img/SkerrImg.png";
import { useState } from "react";
import { CalculResultProps } from "../../constants/interface";
import { Input } from "../Input/input";
import axios from "axios";
import { useLocation } from "react-router-dom";
import CalculResult from "./calculResult";
import { useNavigate } from "react-router-dom";
import * as S from "./calculStyle";
import * as D from "./calculData";

const Calculator = () => {
  const nav = useNavigate();

  const [price, setPrice] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [selectedYear, setSelectedYear] = useState("2014");
  const [selectedMonth, setSelectedMonth] = useState("01");
  const [selectedDay, setSelectedDay] = useState("01");
  const [result, setResult] = useState<CalculResultProps | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

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
        if (res.status === 200) {
          const data = res.data;
          setResult(data);
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.status === 400) {
          const message = error.response.data.message;
          setErrorMsg(message);
          setIsValid(false);
        } else {
          nav("/error");
        }
      });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value.includes("-")) {
      setErrorMsg("음수 값은 입력 불가합니다");
      setIsValid(false);
      return;
    }

    setPrice(e.target.value);

    if (e.target.value) {
      setIsValid(true);
    }
    if (value === "" || parseInt(value) === 0) {
      setErrorMsg("금액을 입력해주세요");
      setIsValid(false);
    } else if (isNaN(Number(value))) {
      setErrorMsg("숫자를 입력해주세요");
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

  // 사용자 이름 적용
  let userName: string = "사용자";

  const userData = localStorage.getItem("user");
  if (userData) {
    userName = JSON.parse(userData).name;
  }

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
        $state="normal"
        $size="gradientBtn"
        $colorType="gradient"
        onClick={handleRetry}
      />
    </div>
  ) : (
    <S.Container>
      <S.TitleContainer>
        <img
          src={Img}
          alt="앵무새가 컴퓨터 보는 이미지"
          style={{ width: "45px", height: "30px" }}
        />
        <span style={{ fontSize: "20px" }}>
          만약 <S.User>{userName}</S.User>님이 이 때 샀다면?
        </span>
      </S.TitleContainer>
      <div style={{ marginBottom: "0.5rem" }}>
        <div>
          <S.Label>날짜 선택</S.Label>
          <S.DropContainer>
            <Dropdown dropList={D.year} onSelect={handleSelectedYear} />
            <Dropdown dropList={D.month} onSelect={handleSelectedMonth} />
            <Dropdown dropList={D.day} onSelect={handleSelectedDay} />
          </S.DropContainer>
        </div>
        <div>
          <S.Label>금액</S.Label>

          <Input
            placeholder="금액"
            size="small"
            colorType="strokeType"
            errorMessage={errorMsg}
            value={price}
            onChange={handleInputChange}
            isValid={isValid}
            maxLength={13}
          />
        </div>
      </div>
      <Button
        children={"결과 확인하기"}
        $state="normal"
        $size="gradientBtn"
        $colorType="gradient"
        onClick={ConfirmHandler}
      />
    </S.Container>
  );
};

export default Calculator;
