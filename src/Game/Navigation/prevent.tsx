import { useEffect } from "react";

const PreventNavigation: React.FC = () => {
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    // 페이지가 새로고침이 되었는지 확인
    if (navigationEntries[0] && navigationEntries[0].type === "reload") {
      // 새로고침이 발생한 경우 홈 화면으로 리다이렉트
      window.location.href = "/";
      localStorage.removeItem("hasSeenTutorial");
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 홈 화면으로 리다이렉트
      // window.location.href = "/";
      // localStorage.removeItem("hasSeenTutorial");

      // 이벤트 취소, 기본 새로고침 막기
      event.preventDefault();
      event.returnValue = ""; // Chrome을 위한 설정 (메시지를 비워야 경고 메시지 표시)
    };

    // 새로고침 또는 페이지를 떠나기 전 경고 메시지 설정
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return <></>;
};

export default PreventNavigation;
