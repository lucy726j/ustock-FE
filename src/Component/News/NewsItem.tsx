import { NewsProps } from "../../constants/interface";
import { HiOutlineExternalLink } from "react-icons/hi";

const NewsItem: React.FC<NewsProps> = ({
  code,
  title,
  publisher,
  date,
  name,
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
          <div className="stock">{name}</div>
          <h3>{publisher}</h3>
          <p>{date}</p>
        </div>
      </div>
      <HiOutlineExternalLink />
    </a>
  );
};

export default NewsItem;
