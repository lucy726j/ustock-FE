import MyStockItem from "../Component/List/MyStockItem";
import EmblaCarousel from "../Component/Carousel/EmblaCarousel";
import { data } from "../data/data"
import { EmblaOptionsType } from 'embla-carousel'
import "../Styles/pfStyle.css"
import HyperText from "../Component/Animation/HyperText";

const OPTIONS: EmblaOptionsType = { loop: true }


const Portfolio = () => {
  return (
        <div className="Portfolio">
            <div className="asset">
                <div className="title">내 자산</div>
                <p>모든 포트폴리오 자산의 총 합입니다.</p>
                <div className="asset-value">
                    <div className="total-value">
                        <HyperText 
                        text="₩ 1,110,000"  // 적용할 텍스트
                        duration={1200}       // 애니메이션 지속 시간
                        className="text-xl font-bold"  // 필요한 클래스명 추가
                        />
                        <div className="total-growth">+ 12.00%</div>
                    </div>
                </div>
                <div className="my-portfolio">
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div className="title">내 포트폴리오</div>
                        <button className="circle-button">
                            <span className="plus-icon">+</span>
                        </button>
                        </div>
                    <EmblaCarousel data={data} options={OPTIONS} />   
                </div>
            </div>
        </div>
    );
};

export default Portfolio;
