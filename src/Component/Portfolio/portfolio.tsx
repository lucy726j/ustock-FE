import EmblaCarousel from "../Carousel/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";
import HyperText from "../Button/Animation/HyperText";
import { useEffect, useState } from "react";
import "./pfStyle.css";
import AddPortfolioModal from "../Modal/AddPortfolio";
import axios from "axios";
import swal from "sweetalert";
import { useAsyncError, useNavigate } from "react-router-dom";
import { formatPrice, formatROR } from "../../util/util";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const OPTIONS: EmblaOptionsType = { loop: true };

// 포트폴리오 데이터 구조 타입 정의
interface Portfolio {
  id: number;
  name: string;
  budget: number;
  profitRate: number;
  average: number;
}

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const navigate = useNavigate();
  const [totalAsset, setTotalAsset] = useState(0);
  const [totalROR, setTotalROR] = useState(0);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]); // 초기 타입 지정

  const [add, setAdd] = useState(0);
  const setChange = usePortfolioStore((state) => state.setChange);
  const change = usePortfolioStore((state) => state.change);

  const openModal = () => {
    setPortfolioName("");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // 포트폴리오 추가
  const handleConfirm = () => {
    axios
      .post(
        `${process.env.REACT_APP_API_URL}/v1/portfolio`,
        { name: portfolioName },
        { withCredentials: true }
      )
      .then((response) => {
        if (response.status === 200) {
          const newPortfolio: Portfolio = response.data;
          // 기존 포트폴리오 데이터에 새로 생성된 포트폴리오를 추가
          setPortfolioData((prevData) => [...prevData, newPortfolio]);
          setAdd(add + 1);
          closeModal();
          swal({
            title: "포트폴리오를 생성했습니다.",
            icon: "success",
          });
          navigate("/portfolio");
        }
      })
      .catch((error) => {
        swal({
          title: "포트폴리오 생성에 실패하셨습니다.",
          text: "다시 시도해주세요!",
          icon: "error",
        });
      });
  };

  // 포트폴리오 전체 조회
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/portfolio`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setTotalAsset(res.data.budget);
          setTotalROR(res.data.ror);
          setPortfolioData(res.data.list); // 포트폴리오 리스트 업데이트
        } else if (res.status === 401) {
          navigate("/error");
        }
      })
      .catch((e) => {
        navigate("/error");
      });
  }, [add, change]);

  return (
    <div className="Portfolio">
      <div className="asset">
        <div className="title">내 자산</div>
        <p>모든 포트폴리오 자산의 총 합입니다.</p>
        <div className="asset-value">
          <div className="total-value">
            <HyperText
              text={`₩ ${formatPrice(totalAsset)}`} // 적용할 텍스트
              duration={1200} // 애니메이션 지속 시간
              className="text-xl font-bold" // 필요한 클래스명 추가
            />
            <div
              className="total-growth"
              style={{
                color: formatROR(totalROR).color,
                fontSize: "15px",
              }}
            >{`${formatROR(totalROR).value} %`}</div>
          </div>
        </div>
        <div className="my-portfolio">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="title">내 포트폴리오</div>
            <button className="circle-button" onClick={openModal}>
              <span className="plus-icon">+</span>
            </button>
          </div>
          <EmblaCarousel
            data={portfolioData}
            options={OPTIONS}
            portfolioName={portfolioName}
          />
        </div>
      </div>
      <AddPortfolioModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleConfirm}
        portfolioName={portfolioName}
        setPortfolioName={setPortfolioName}
      />
    </div>
  );
};

export default Portfolio;
