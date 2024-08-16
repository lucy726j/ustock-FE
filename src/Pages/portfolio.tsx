import MyStockItem from "../Component/List/MyStockItem";

const Portfolio = () => {
  return (
    <>
      <div>포트폴리오 메인 페이지</div>
      <MyStockItem
        id={1}
        name="Sample Stock"
        logo="path/to/logo.png"
        code="05462"
        price={10000}
        growth={5}
      />
    </>
  );
};

export default Portfolio;
