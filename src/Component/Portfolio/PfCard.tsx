import React from "react"
import "./PfCardStyle.css"
import { PortfolioProps } from "../../constants/interface"
import { getGrowthColor, formatROR } from "../../util/util"

interface PfCardProps{
    data: PortfolioProps
}

const PfCard: React.FC<PfCardProps> = ({ data }) => {
    const totalValue = data.budget;
    const principal = data.principal;
    const profitLoss = data.ret;
    const ror = data.ror;
    console.log(data)

    return (
        <div className="PfCard">
            <h3>총 자산</h3>
            <p>₩ {totalValue.toLocaleString()}</p>
            <div className="detail-section">
                <div className="total-value">
                    <div className="title-area">투자 총 금액</div>
                    <div className="value-area">₩ {principal.toLocaleString()}</div>
                </div>
                <div className="gain-and-loss">
                    <div className="title-area">평가 손익</div>
                    <div className="value-area"
                        style={{color : getGrowthColor(ror)}}
                    >₩ {profitLoss.toLocaleString()} ({formatROR(ror)}%)</div>
                </div>
            </div>
        </div>
    );
};

export default PfCard;
