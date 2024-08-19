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
      const res = await axios
        .post(
          `http://localhost:8080/`, // 나중에 url수정해야함
          { withCredentials: true }
        )
        .then((res) => {
          alert(JSON.stringify(res.data));
        })
        .then(() => {
          handleHome();
        })
        .catch((error) => {
          alert("로그인에 실패했습니다!");
          console.log("error : ", error);
        });
    } catch (error) {
      console.log("error: ", error);
      alert("로그인 실패");
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
