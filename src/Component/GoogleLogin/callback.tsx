import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext";

const CallBackPage = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleHome = () => {
    navigate("/");
  };

  const RedirectPage = async (code: string) => {
    try {
      const res = await axios.post(
        "https://api.ustock.site/",
        { code },
        { withCredentials: true }
      );
      const userData = res.data;
      login(userData.username);
      handleHome();
    } catch (error) {
      alert("로그인에 실패했습니다!");
      console.log("error : ", error);
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
