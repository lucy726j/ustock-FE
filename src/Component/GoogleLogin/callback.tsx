import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CallBackPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
    window.location.reload();
  };

  const RedirectPage = async (code: string) => {
    const data = { code };
    console.log("dd", data);
    try {
      const res = await axios.post(
        `http://localhost/8080/member/oauth2/google`,
        data
      );
      if (res.status === 200) {
        const accessToken = res.data.data.accessToken;
        console.log("token : ", accessToken);
        localStorage.setItem("token", accessToken);
        handleHome();
      } else {
        throw new Error("로그인 실패");
      }
    } catch (error) {
      console.log("error : ", error);
      window.alert("TLqkf");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");
    console.log("code : ", code);
    if (code) {
      RedirectPage(code);
    } else {
      console.log("로그인 재시도하세요.");
      navigate("/login");
    }
  }, [navigate]);

  if (loading) {
    return <div>로그인중입니다... 잠시만 기다려주세요!</div>;
  }

  return null;
};

export default CallBackPage;
