import React, { useEffect, useState } from "react";
import "./mainStyle.css";
import Parrot from "../../img/parrot.png";
import FlyParrot from "../../img/fly_parrot.png";
import Button from "../../Component/Button/button";
import { useNavigate } from "react-router-dom";
import { Input } from "../../Component/Input/input";
import axios from "axios";
import swal from "sweetalert";
import { ButtonDiv, GameTitle } from "./styleMain";

const GameMain2: React.FC = () => {
    const [isLoadingFinished, setIsLoadingFinished] = useState(false);
    const [isFlying, setIsFlying] = useState(false);
    const [isGame, setIsGame] = useState(false);
    const [nickname, setNickname] = useState<string>("");
    const navigate = useNavigate();
    const [isValidQuantity, setIsValidQuantity] = useState(true);

    const handleRank = () => {
        navigate("/game/rank");
    };

    const handleConfirm = () => {
        if (!nickname || !nickname.trim()) {
            setIsValidQuantity(false);
            setNickname("");
            return;
        }
        axios
            .get(`${process.env.REACT_APP_API_URL}/v1/game/start`, {
                withCredentials: true,
                params: { nickname },
            })
            .then((res) => {
                if (res.status == 200) {
                    const stock2014 = res.data;
                    // console.log("Navigating to /game with data:", stock2014);

                    localStorage.setItem(
                        "stock2014",
                        JSON.stringify(stock2014)
                    );
                    navigate(`/game/play/2014`, { state: { nickname } });
                } else {
                    swal({
                        icon: "error",
                        title: "닉네임을 입력해주세요!",
                    });
                    setNickname("");
                }
            })
            .catch((error) => {
                console.error("서버 에러 : ", error);
                setNickname("");
            });
    };

    const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        // setNickname(value);
        // 공백을 허용하지 않도록 필터링
        if (value.includes(" ")) {
            swal({
                icon: "error",
                title: "닉네임에 공백을 포함할 수 없습니다.",
            });
            return;
        }
        setNickname(value);
        setIsValidQuantity(true);
    };

    useEffect(() => {
        // Wait for the loading animation to finish (2s + 2s duration of the loading animation)
        const timer = setTimeout(() => {
            setIsLoadingFinished(true);

            const flyTimer = setTimeout(() => {
                setIsFlying(true);

                const gameTimer = setTimeout(() => {
                    setIsGame(true);
                }, 2000);

                return () => clearTimeout(gameTimer);
            }, 2000);

            return () => clearTimeout(flyTimer);
        }, 5000);

        return () => clearTimeout(timer); // Clean up the timer
    }, []);

    return (
        <div className="container">
            {/* {isGame ? <div style={{ marginBottom: "0.5rem" }}>스껄게임</div> : ""} */}
            <div className="macbook">
                <div className="macbook__topBord">
                    <div className="macbook__display">
                        <div className="macbook__load"></div>
                        {isLoadingFinished && (
                            <img
                                style={{
                                    width: "100px",
                                    height: "90px",
                                    marginTop: "0.1rem",
                                }}
                                src={isFlying ? FlyParrot : Parrot}
                                className={`macbook__image ${
                                    isLoadingFinished ? "visible" : ""
                                } ${isFlying ? "fly" : ""}`}
                            />
                        )}
                        {isGame && (
                            <div className="macbook__game">
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                    }}
                                >
                                    U'STOCK{" "}
                                </p>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        margin: 0,
                                    }}
                                >
                                    모의투자
                                </p>
                                <p
                                    style={{
                                        fontSize: "12px",
                                        fontWeight: "600",
                                        margin: 0,
                                    }}
                                >
                                    {" "}
                                    게임해볼래?
                                </p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="macbook__underBord">
                    <div className="macbook__keybord">
                        <div className="keybord">
                            <div className="keybord__touchbar"></div>
                            <ul className="keybord__keyBox">
                                <li className="keybord__key key--01"></li>
                                <li className="keybord__key key--02"></li>
                                <li className="keybord__key key--03"></li>
                                <li className="keybord__key key--04"></li>
                                <li className="keybord__key key--05"></li>
                                <li className="keybord__key key--06"></li>
                                <li className="keybord__key key--07"></li>
                                <li className="keybord__key key--08"></li>
                                <li className="keybord__key key--09"></li>
                                <li className="keybord__key key--10"></li>
                                <li className="keybord__key key--11"></li>
                                <li className="keybord__key key--12"></li>
                                <li className="keybord__key key--13"></li>
                            </ul>
                            <ul className="keybord__keyBox--under">
                                <li className="keybord__key key--14"></li>
                                <li className="keybord__key key--15"></li>
                                <li className="keybord__key key--16"></li>
                                <li className="keybord__key key--17"></li>
                                <li className="keybord__key key--18"></li>
                                <li className="keybord__key key--19"></li>
                                <li className="keybord__key key--20"></li>
                                <li className="keybord__key key--21"></li>
                                <li className="keybord__key key--22"></li>
                                <li className="keybord__key key--23"></li>
                                <li className="keybord__key key--24"></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            {isGame && (
                <>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            margin: "20px 50px",
                            flexDirection: "column",
                        }}
                    >
                        <GameTitle>Skrr 모의 투자 게임</GameTitle>
                        <Input
                            colorType="strokeType"
                            size="nickname"
                            errorMessage="닉네임을 입력해주세요"
                            isValid={isValidQuantity}
                            placeholder="닉네임"
                            onChange={handleChangeQuantity}
                            value={nickname}
                        />
                        <ButtonDiv>
                            <Button
                                $colorType="main"
                                $state="normal"
                                $size="medium"
                                onClick={handleConfirm}
                            >
                                게임시작
                            </Button>
                            <div style={{ marginRight: "1rem" }}></div>
                            <Button
                                $colorType="stroke"
                                $state="normal"
                                $size="medium"
                                onClick={handleRank}
                            >
                                랭킹
                            </Button>
                        </ButtonDiv>
                    </div>
                </>
            )}
        </div>
    );
};

export default GameMain2;

// state로 넘긴 값 사용하는 방법
// useLocation을 사용해서 불러온 다음 , const {stockData, nickname} = location.state || {}; 널처리는 꼭 해줘야함 ~~ 이렇게 하면 사용가능!
