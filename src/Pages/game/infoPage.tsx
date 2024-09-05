import { useParams } from "react-router-dom";

const InfoPage = () => {
    const { year } = useParams<{ year: string }>();
    return <div>{year}년 정보거래소 페이지</div>;
};

export default InfoPage;
