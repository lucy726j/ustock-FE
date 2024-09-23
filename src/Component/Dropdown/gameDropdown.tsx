import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { Colors } from "../../Styles/Colors";
import { Stock, useStock } from "../../store/stockContext";

const dropdownVariants: Variants = {
    open: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
        },
    },
    closed: {
        opacity: 0,
        height: 0,
        transition: {
            duration: 0.3,
        },
    },
};

export interface StockItemProps {
    onSelectStock: (stockId: number) => void;
}

const StockItem: React.FC<StockItemProps> = ({ onSelectStock }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedStock, setSelectedStock] = useState<string | null>(null);
    const { stockData } = useStock();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleSelect = (item: Stock) => {
        setSelectedStock(item.name);
        setIsOpen(false);
        onSelectStock(item.stockId);
    };

    return (
        <div>
            <div
                onClick={toggleDropdown}
                style={{
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    background: `${Colors.main}`,
                    borderRadius: "5px",
                    color: "#ffffff",
                    fontWeight: "700",
                }}
            >
                {selectedStock || "종목 선택"}
            </div>
            <motion.ul
                variants={dropdownVariants}
                initial="closed"
                animate={isOpen ? "open" : "closed"}
                style={{
                    overflow: "hidden",
                    listStyle: "none",
                    textAlign: "center",
                    padding: "10px",
                    border: `1px solid ${Colors.main}`,
                    borderRadius: "10px",
                }}
            >
                {stockData &&
                    stockData.map((item) => (
                        <li
                            key={item.stockId}
                            onClick={() => handleSelect(item)}
                            style={{ marginTop: "0.5rem" }}
                        >
                            <span>{item.name}</span>
                        </li>
                    ))}
            </motion.ul>
        </div>
    );
};

export default StockItem;
