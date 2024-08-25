import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const CallBackPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasFetchedRef = useRef(false);

  const handleHome = () => {
    navigate("/");
  };

  useEffect(() => {
    const handler = async () => {
      if (hasFetchedRef.current) return; // 두 번째 실행 방지
      hasFetchedRef.current = true;
      try {
        const res = await axios.get(
          "${process.env.REACT_APP_API_URL}/v1/user",
          {
            withCredentials: true,
          }
        );
        if (res.status === 200) {
          const { name, profile } = res.data;
          login({ name, profile });
          handleHome();
        } else if (res.status === 401) {
          console.log("망할망할 ~~~~");
        } else {
          throw new Error(`status code: ${res.status}`);
        }
      } catch (error) {
        alert("로그인에 실패했습니다!");
        console.log("Login error : ", error);
      } finally {
        console.log("로그인 왜 안되냐 진짜 짜증나게 하지마셈;;;;");
        setLoading(false);
      }
    };
    handler();
  }, [navigate, login]);

  if (loading) {
    return <div>로그인중입니다... 잠시만 기다려주세요!</div>;
  }

  return null;
};

export default CallBackPage;
