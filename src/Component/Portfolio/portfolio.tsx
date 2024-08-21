import EmblaCarousel from "../Carousel/EmblaCarousel";
import { data } from "../../data/data";
import { EmblaOptionsType } from "embla-carousel";
import HyperText from "../Button/Animation/HyperText";
import { useState } from "react";
import "./pfStyle.css";
import AddPortfolioModal from "../Modal/AddPortfolio";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const OPTIONS: EmblaOptionsType = { loop: true };

const Portfolio = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [portfolioName, setPortfolioName] = useState("");
  const navigate = useNavigate();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    console.log("handleConfirm called");
    axios
      .post(
        "http://localhost:8080/v1/portfolio",
        { name: portfolioName },
        { withCredentials: true }
      )
      .then((response) => {
        console.log(response);
        console.log(response.data);
        if (response.status === 200) {
          console.log("포트폴리오가 만들어졌음:", response);
          closeModal();
          swal({
            title: "포트폴리오를 생성했습니다.",
            icon: "success",
          });
          navigate("/portfolio");
        } else {
          console.log("error status code : ", response.status);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
        swal({
          title: "포트폴리오 생성에 실패하셨습니다.",
          text: "다시 시도해주세요!",
          icon: "error",
        });
        console.log(error);
      });
  };

  return (
    <div className="Portfolio">
      <div className="asset">
        <div className="title">내 자산</div>
        <p>모든 포트폴리오 자산의 총 합입니다.</p>
        <div className="asset-value">
          <div className="total-value">
            <HyperText
              text="₩ 1,110,000" // 적용할 텍스트
              duration={1200} // 애니메이션 지속 시간
              className="text-xl font-bold" // 필요한 클래스명 추가
            />
            <div className="total-growth">+ 12.00%</div>
          </div>
        </div>
        <div className="my-portfolio">
          <div style={{ display: "flex", alignItems: "center" }}>
            <div className="title">내 포트폴리오</div>
            <button className="circle-button" onClick={openModal}>
              <span className="plus-icon">+</span>
            </button>
          </div>
          <EmblaCarousel data={data} options={OPTIONS} />
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
