import styled from "styled-components";
 

export const NewsContainer = styled.div`
  margin: 30px 0px;
  width: 100%;
  height: 300px;
  overflow: scroll;
  scrollbar-width: none;
`;


export const NewsItem = styled.a`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #d1d1d1;
  padding: 15px 15px;
  cursor: pointer;
  text-decoration: none;
  color: black;
`;

export const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: start;
  width: 100%;
`;

export const NewsInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: end;
  gap: 5px;
`;

export const Title = styled.div`
  font-size: 17px;
`;
export const Publisher = styled.p`
  font-size: 15px;
`;
export const Date = styled.p`
  font-size: 15px;
`;
