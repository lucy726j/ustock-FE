import styled from "styled-components";

export const SearchBarStyle = styled.div`
  width: 450px;
  height: 40px;
  box-shadow: 0px 2px 5px -2px #ada9bb;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  margin-bottom: 1rem;
  position: relative;
  @media (max-width: 768px) {
    width: 100%;
    padding: 10px;
  }
`;

export const SearchImg = styled.img`
  width: 15px;
  margin-left: 20px;
`;

export const SearchInput = styled.input`
  width: 350px;
  text-align: center;
  border: none;
`;

export const SearchResult = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: white;
  width: 450px;
  box-shadow: 0px 2px 5px -2px #ada9bb;
  border: none;
  padding: 20px;
  font-size: 12px;
  position: absolute;
  top: 135px;
  z-index: 2;
  max-height: 300px;
  overflow: scroll;
  scrollbar-width: none;
  @media (max-width: 768px) {
    width: 93%;
    margin-top: 1rem;
  }
`;

export const StockItemContainer = styled.li`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: white;
  padding: 10px 10px;
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    background-color: #eaeaea;
    transform: scale(0.98);
  }
`;

export const StockInfo = styled.div`
  display: flex;
  flex-direction: row;
`;

export const StockName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  margin-left: 1rem;
  border-radius: 10px;
`;

export const NoImg = styled.div`
  width: 30px;
  height: 30px;
  margin-right: 20px;
  border-radius: 10px;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #fff;
  background: #615efc;
  margin-left: 1rem;
`;

export const InfoSection = styled.div`
  flex: 1;
`;

export const Name = styled.div`
  font-size: 10px;
  font-weight: 700;
`;

export const Code = styled.div`
  font-size: 8px;
  font-weight: 400;
  color: #6c757d;
`;

export const Price = styled.div`
  font-size: 10px;
  font-weight: 400;
  flex: 1;
  text-align: right;
  margin-right: 30px;
  width: 20%;
`;

export const Growth = styled.div`
  font-size: 8px;
  font-weight: 400;
  margin-right: 30px;
  width: 10%;
  text-align: right;
`;
