import { useEffect } from "react";

const PreventNavigation: React.FC = () => {
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = ""; // Chrome을 위한 설정 (메시지를 비워야 경고 메시지 표시)
    };

    // 페이지를 떠나기 전 경고 메시지 설정
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <></>;
};

export default PreventNavigation;
