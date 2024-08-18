import Dropdown from "../Dropdown/Dropdown";

const Calculator = () => {
  return (
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
  );
};

export default Calculator;
