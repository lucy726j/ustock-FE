import { NewsProps } from "../../constants/interface";

const NewsItem: React.FC<NewsProps> = ({ id, title, publisher, date, img, url }) => {
    const handleClick = () => {
        window.location.href = url;
    }
    
    return(
        <div className="NewsItem" onClick={handleClick}>
            <div className="news-section">
                <div className="news-content">{title}</div>
                <div className="news-info">
                    <h3>{publisher}</h3>
                    <p>{date}</p>
                </div>
            </div>
            <div className="img-section">
                <img src={img}/>
            </div>
        </div>
    )
}

export default NewsItem;