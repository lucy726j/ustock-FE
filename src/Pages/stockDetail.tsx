import Chart from "../Component/Chart/chart";
import Dropdown from "../Component/Dropdown/Dropdown";

const StockDetail = () => {
  return (
    <>
      <div>
        <div>삼성 전자</div>
        <div>
          <span>005930</span>
          <span>첨단 기술</span>
        </div>
        <div>
          <div>80,000원</div>
          <span>3,000원</span>
          <span>2.4%</span>
        </div>
      </div>
      <div>
        <div>일</div>
        <div>주</div>
        <div>월</div>
        <div>1년</div>
      </div>
      <Chart />

      <div>
        <div>
          <img src="" alt="" />
          <span>만약 스껄님이 이 떄 샀다면?</span>
        </div>
        <div>
          <div>년도월</div>
          <div>
            <Dropdown />
            <Dropdown />
            <Dropdown />
          </div>
        </div>
        <div>
          <div>년도월</div>
          <input />
        </div>
        <button>결과 확인하기</button>
      </div>
    </>
  );
};

export default StockDetail;
