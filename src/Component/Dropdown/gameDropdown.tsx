import { Variants, motion } from "framer-motion";
import { useState } from "react";
import { Colors } from "../../Styles/Colors";
import { Stock, useStock } from "../../store/stockContext";
import styled from "styled-components";
import {
  itemVariants,
  dropdownVariants,
  Ul,
  Li,
  Button,
  Menu,
} from "./gameStyle";

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
            stockData.map((item) => (
              <Li
                variants={itemVariants}
                key={item.stockId}
                onClick={() => handleSelect(item)}
                style={{ marginTop: "0.5rem" }}
              >
                <span>{item.name}</span>
              </Li>
            ))}
        </Ul>
      </Menu>
    </>
  );
};

export default StockItem;
