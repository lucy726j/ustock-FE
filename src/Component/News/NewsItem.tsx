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
    >
      <div className="news-section">
        <div className="news-content">{title}</div>
        <div className="news-info">
          <h3>{publisher}</h3>
          <p>{date}</p>
        </div>
      </div>
      <div className="img-section">
        <img src={img} alt="뉴스 이미지" />
      </div>
    </a>
  );
};

export default NewsItem;
