import { NewsProps } from "../../constants/interface";

const NewsItem: React.FC<NewsProps> = ({
  id,
  title,
  publisher,
  date,
  img,
  url,
}) => {
  //   const handleClick = () => {
  //     window.location.href = url;
  //   };

  return (
    // noopener, noreferrer, nofollow 설정을 위해서 <a/>으로 변경
    <a
      href={url}
      className="NewsItem"
      target="_blank"
      rel="noopener noreferrer nofollow"
      // onClick={handleClick}
      // style={{ textDecoration: "none", color: "black" }}
    >
      <div className="news-section">
        <div className="news-content">{title}</div>
        <div className="news-info">
          <div className="stock">삼성전자</div>
          <h3>{publisher}</h3>
          <p>{date}</p>
        </div>
      </div>
    </a>
  );
};

export default NewsItem;
