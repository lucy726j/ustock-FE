import { useEffect, useState } from "react";

const PreventBackNavigation: React.FC = () => {
  const [isPopStateTriggered, setIsPopStateTriggered] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      window.location.href = "/"; // 홈 화면으로 리다이렉트
      localStorage.removeItem("hasSeenTutorial");
    };

    // 페이지가 처음 로드될 때 상태를 대체
    window.history.replaceState(null, "", window.location.href);

    // 뒤로가기 이벤트 감지
    window.addEventListener("popstate", handlePopState);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
