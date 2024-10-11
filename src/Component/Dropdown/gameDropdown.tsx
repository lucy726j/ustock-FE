import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { useStock } from "../../store/stockContext";
import {
  itemVariants,
  dropdownVariants,
  Ul,
  Li,
  Button,
  Menu,
} from "./gameStyle";
import { useHintStore } from "../../store/hintStore";

export interface StockItemProps {
  onSelectStock: (stockId: number) => void;
}

interface Stock {
  stockId: number;
  name: string;
  current: number;
  prev: number;
  change: number;
  changeRate: number;
}

const StockItem: React.FC<StockItemProps> = ({ onSelectStock }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);
  // const { stockData, setStockData } = StocksStore();
  const { stockData, setStockData } = useStock();
  const { purchaseHints, setPurchaseHints } = useHintStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (item: Stock) => {
    setSelectedStock(item.name);
    setIsOpen(false);
    onSelectStock(item.stockId);
  };

  return (
    <>
      <Menu initial={false} animate={isOpen ? "open" : "closed"}>
        <Button whileTap={{ scale: 0.97 }} onClick={toggleDropdown}>
          {selectedStock || "종목 선택"}
          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 },
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </Button>
        <Ul
          variants={dropdownVariants}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          {stockData &&
            stockData.map((item) => {
              // 해당 종목에서 구매한 단계들 찾기
              const purchasedLevels = purchaseHints[item.stockId]
                ? Object.keys(purchaseHints[item.stockId])
                    .filter(
                      (level) => purchaseHints[item.stockId][level].purchased
                    ) // 구매된 단계만 필터링
                    // .map((level) => "🔑".repeat(parseInt(level)))
                    .join(", ") // 구매된 단계들을 문자열로 합침
                : null;

              return (
                <Li
                  variants={itemVariants}
                  key={item.stockId}
                  onClick={() => handleSelect(item)}
                  style={{ marginTop: "0.5rem" }}
                >
                  <span>{item.name}</span>
                  {purchaseHints[item.stockId] && (
                    <span
                      style={{
                        marginLeft: "8px",
                        color: "black",
                        fontSize: "12px",
                        textAlign: "right",
                      }}
                    >
                      {purchasedLevels} ✅
                    </span>
                  )}
                </Li>
              );
            })}
        </Ul>
      </Menu>
    </>
  );
};

export default StockItem;
