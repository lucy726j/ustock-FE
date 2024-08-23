import React from "react";
import "./PfCardStyle.css";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import { getGrowthColor, formatROR } from "../../util/util";

const PfCard: React.FC = () => {
    const budget = usePortfolioStore((state) => state.budget);
    const principal = usePortfolioStore((state) => state.principal);
    const profitLoss = usePortfolioStore((state) => state.ret);
    const ror = usePortfolioStore((state) => state.ror);

    return (
        <div className="PfCard">
            <h3>총 자산</h3>
            <p>₩ {budget.toLocaleString()}</p>
            <div className="detail-section">
                <div className="total-value">
                    <div className="title-area">투자 총 금액</div>
                    <div className="value-area">₩ {principal.toLocaleString()}</div>
                </div>
                <div className="gain-and-loss">
                    <div className="title-area">평가 손익</div>
                    <div className="value-area"
                        style={{ color: getGrowthColor(ror) }}
                    >₩ {profitLoss.toLocaleString()} ({formatROR(ror)}%)</div>
                </div>
            </div>
        </div>
    );
};

export default PfCard;
