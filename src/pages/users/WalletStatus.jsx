import BalanceCard from "../../components/card/BalanceCard";

const WalletStatus = ({currency, walletBalance, profitBalance}) => {
    return (
        <div className="site-card">
            <div className="site-card-body">
                <div className="row">
                    <div className="col-xl-12">
                        <BalanceCard
                            cardTitle={"Main Wallet"}
                            currency={currency}
                            amount={walletBalance} />
                        <BalanceCard
                            cardTitle={"Profit Wallet"}
                            currency={currency}
                            amount={profitBalance} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WalletStatus;
