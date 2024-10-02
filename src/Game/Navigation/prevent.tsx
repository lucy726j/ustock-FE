import { useEffect } from "react";

export const PreventNavigation: React.FC = () => {
  useEffect(() => {
    const navigationEntries = performance.getEntriesByType(
      "navigation"
    ) as PerformanceNavigationTiming[];

    // 페이지가 새로고침되었는지 확인
    if (
      navigationEntries[0] &&
      navigationEntries[0].type === "reload" &&
      window.location.pathname !== "/game"
    ) {
      // 새로고침이 발생한 경우 리다이렉트하지 않고 경고만 표시
      window.location.href = "/";
      console.log("Page was reloaded.");
    }

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 경고 메시지 설정
      event.preventDefault();
      event.returnValue = ""; // Chrome에서는 이 설정이 필요함
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
