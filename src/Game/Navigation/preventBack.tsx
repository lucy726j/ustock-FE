import { useEffect, useState } from "react";

const PreventBackNavigation: React.FC = () => {
  const [isPopStateTriggered, setIsPopStateTriggered] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      // popstate 이벤트가 처음 발생했는지 확인
      if (!isPopStateTriggered) {
        window.history.pushState(null, "", window.location.href);
        setIsPopStateTriggered(true); // 이벤트가 트리거된 후 상태 변경
      } else {
        setIsPopStateTriggered(false); // 무한 루프 방지
      }
    };

    // 페이지가 처음 로드될 때 상태를 대체
    window.history.replaceState(null, "", window.location.href);

    // 뒤로가기 이벤트 감지
    window.addEventListener("popstate", handlePopState);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener("popstate", handlePopState);
    };
  }, [isPopStateTriggered]);

  return null;
};

export default PreventBackNavigation;
