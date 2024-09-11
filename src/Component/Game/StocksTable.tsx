import { StocksData } from "../../constants/interface";
import { formatPrice, formatChangeRate } from "../../util/gameUtil";
import data from "../../data/data.json";
import "./StocksTableStyle.css";

const StocksTable: React.FC = () => {
    const stocks: StocksData = {
        header: ["번호", "종목", "전년", "올해", "등락"],
        data: data,
    };

    return (
        <div className="StocksTable">
            <table>
                <thead>
                    <tr>
                        {stocks.header.map((item, index) => (
                            <th key={index}>{item}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {stocks.data.map((stock) => (
                        <tr
                            key={stock.id}
                            style={{
                                background:
                                    stock.id % 2 === 1 ? "#ededed" : "white",
                            }}
                        >
                            <td>{stock.id}</td>
                            <td>{stock.name}</td>
                            <td>{formatPrice(stock.prev)}</td>
                            <td
                                style={{
                                    color:
                                        stock.changeRate > 0
                                            ? "red"
                                            : stock.changeRate < 0
                                            ? "blue"
                                            : "black",
                                }}
                            >
                                {formatPrice(stock.price)}
                            </td>
                            <td
                                style={{
                                    color:
                                        stock.changeRate > 0
                                            ? "red"
                                            : stock.changeRate < 0
                                            ? "blue"
                                            : "black",
                                }}
                            >
                                {formatChangeRate(stock.changeRate)}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default StocksTable;
