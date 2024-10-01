import { useEffect } from "react";

const PreventBackNavigation: React.FC = () => {
  useEffect(() => {
    // 현재 페이지 상태를 푸시하여 뒤로가기를 막음
    const pushCurrentState = () => {
      window.history.pushState(null, "", window.location.href);
    };

    const handlePopState = () => {
      // 사용자에게 뒤로가기를 확인하는 경고창 표시
      const userConfirmed = window.confirm(
        "정말로 뒤로가시겠습니까? 확인을 누르면 메인화면으로 이동합니다."
      );

      if (userConfirmed) {
        // 사용자가 확인을 눌렀을 때 메인 화면으로 이동
        window.location.href = "/";
      } else {
        // 취소를 누른 경우 뒤로가기를 취소하고 현재 페이지 유지
        pushCurrentState(); // 페이지 상태를 다시 푸시하여 페이지 유지
      }
    };

    // 페이지 로드시 상태 푸시
    pushCurrentState();

    // 페이지 로드 이후 지속적으로 상태를 푸시하여 히스토리 덮어씌우기
    const interval = setInterval(pushCurrentState, 100);

    // 뒤로가기 이벤트 감지
    window.addEventListener("popstate", handlePopState);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("popstate", handlePopState);
      clearInterval(interval);
    };
  }, []);

  return null;
};

export default PreventBackNavigation;
