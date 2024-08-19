import "./PfCardStyle.css"

const PfCard = () => {
    return (
        <div className="PfCard">
            <h3>총 자산</h3>
            <p>₩ 1,100,000</p>
            <div className="detail-section">
                <div className="total-value">
                    <div className="title-area">투자 총 금액</div>
                    <div className="value-area">₩ 1,100,000</div>
                </div>
                <div className="gain-and-loss">
                    <div className="title-area">평가 손익</div>
                    <div className="value-area">₩ 1,100,000 (+ 10.00%)</div>
                </div>
            </div>
        </div>
    )
}

export default PfCard