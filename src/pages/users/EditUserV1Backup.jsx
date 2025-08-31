
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LuUser, LuAnchor, LuCreditCard, LuCast, LuNetwork, LuWrench, } from "react-icons/lu";

import PageTitle from "../../components/page_title/PageTitle";
import EarningTab from "./components/EarningTab";
import InvestmentTab from "./components/InvestmentTab";
import ProfileBasicInfoTab from "./components/ProfileBasicInfoTab";
import ProfileCard from "./components/ProfileCard";
import ReferralTreeTab from "./components/ReferralTreeTab";
import TicketsTab from "./components/TicketsTab";
import TransactionTab from "./components/TransactionTab";
import ButtonsWithTooltips from "./ButtonsWithTooltips";
import WalletStatus from "./WalletStatus";
import AccountStatusForm from "./AccountStatusForm";
import TransactionStatusForm from "./TransactionStatusForm";
import RightPanel from "../../components/panel/RightPanel";
import SendEmailPanel from "./SendEmailPanel";
import BalancePanel from "./BalancePanel";
import apiClient from "../../api/apiClient";
import DepositNow from "../deposit/DepositNow";
import InvestNow from "../investment/InvestNow";
import DepositSuccess from "../deposit/DepositSuccess";
import SendMoney from "../deposit/SendMoney";
import WithdrawRequest from "../deposit/WithdrawRequest";
import { API_ROUTES } from "../../constants/apiRoutes";



const tabs = [
    { id: "info", label: "Informations", icon: <LuUser /> },
    { id: "investments", label: "Investments", icon: <LuAnchor /> },
    { id: "earnings", label: "Earnings", icon: <LuCreditCard /> },
    { id: "transactions", label: "Transactions", icon: <LuCast /> },
    { id: "referral", label: "Referral Tree", icon: <LuNetwork /> },
    { id: "tickets", label: "Ticket", icon: <LuWrench /> },
];

const sidePanelButtons = [
    { id: "deposit_now", label: "Deposit Balance", icon: <LuUser /> },
    { id: "investment_now", label: "Investment Now", icon: <LuAnchor /> },
    { id: "send_money", label: "Send Money", icon: <LuCreditCard /> },
    { id: "withdraw", label: "Withdraw", icon: <LuCast /> },
];

const userStatus = {
    accountStatus: false,
    emailVerified: true,
    kycVerified: true,
    '2FAVerified': false,
};
const transactionStatus = {
    depositStatus: false,
    withdrawStatus: true,
    sendMoneyStatus: true,
};



export default function EditUserV1() {
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [panel, setPanel] = useState(null);
    const { userId } = useParams(); // 👈 extract userId from URL
    const [activeTab, setActiveTab] = useState("info");
    const [userInfo, setUserInfo] = useState({});
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }))
    };

    const handleClosePanel = () => { setIsPanelOpen(false) }

    const handleButtonClick = (action) => {
        switch (action) {
            case "sendMail":
                setPanel(action)
                setIsPanelOpen(true);
                break;
            case "loginAsUser":
                console.log("Login as user:", userInfo.username);
                break;
            case "fundUpdate":
                console.log("Fund update for:", userInfo.username);
                setPanel(action)
                setIsPanelOpen(true);
                break;
            default:
                console.warn("Unknown action:", action);
        }
    };

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const data = await apiClient.get(API_ROUTES.USER_BY_ID(userId));
                setUserInfo(data);
            } catch (err) {
                console.error("Error fetching user info:", err);
            }
        };

        if (userId) {
            fetchUserInfo();
        }
    }, [userId]);

    return (
        <div className="main-content">
            <PageTitle
                title={`Details of ${userInfo.username}`}
                isBack={true} />


            <div className="container-fluid">


                <div className="row">
                    <div className="col-xl-12">
                        <div className="admin-latest-announcements"key="actions">
                            <div className="content">
                                {sidePanelButtons.map((panel) => (
                                    <a href="#" className="site-btn-xs primary-btn" key={panel.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setPanel(panel.id)
                                            setIsPanelOpen(true);
                                        }}
                                    >
                                        {panel.icon} <span>{panel.label}</span>
                                    </a>
                                ))}


                            </div>
                        </div>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-xxl-3 col-xl-6 col-lg-8 col-md-6 col-sm-12">
                        {/* <ProfileCard /> */}

                        <div className="profile-card">
                            <div className="top">
                                <div className="avatar">
                                    <span className="avatar-text">JD</span>
                                </div>
                                <div className="title-des">
                                    <h4>{userInfo.username}</h4>
                                    <p>{userInfo.country}</p>
                                </div>

                                <ButtonsWithTooltips onButtonClick={handleButtonClick} />


                            </div>

                            <WalletStatus
                                walletBalance={userInfo.walletBalance}
                                profitBalance={userInfo.profitBalance}
                                currency="USD" />

                            {/* Account Status Update */}
                            <AccountStatusForm
                                initialStatus={userInfo.accountStatus || {}}
                                userId={userInfo.id} />


                            {/* Transaction Status Update */}
                            <TransactionStatusForm
                                initialStatus={userInfo.accountStatus || {}}
                                userId={userInfo.id} />


                        </div>
                    </div>


                    <div className="col-xxl-9 col-xl-12 col-lg-12 col-md-12 col-sm-12">
                        <div className="site-tab-bars">
                            <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                {tabs.map((tab) => (
                                    <li className="nav-item" role="presentation" key={tab.id}>
                                        <a
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActiveTab(tab.id);
                                            }}
                                            href=""
                                            className={`nav-link ${activeTab === tab.id ? "active" : ""}`}
                                            id={`pills-${tab.id}-tab`}
                                            data-bs-toggle="pill"
                                            data-bs-target={`#pills-${tab.id}`}
                                            role="tab"
                                            aria-controls={`pills-${tab.id}`}
                                            aria-selected={activeTab === tab.id}
                                        >
                                            {tab.icon} <span>{tab.label}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="tab-content" id="pills-tabContent">
                            <ProfileBasicInfoTab activeTab={activeTab} userInfo={userInfo || {}} onFormChange={handleFormChange} />
                            {/* <InvestmentTab activeTab={activeTab} /> */}
                            {activeTab === "investments" && <InvestmentTab userId={userInfo.id} />}
                            <EarningTab activeTab={activeTab} />
                            {/* <TransactionTab activeTab={activeTab} /> */}
                            {activeTab === "transactions" && <TransactionTab userId={userInfo.id} />}
                            <ReferralTreeTab activeTab={activeTab} />
                            <TicketsTab activeTab={activeTab} />
                        </div>
                    </div>
                </div>
            </div>
            {panel === 'sendMail' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
                    <h3 className="mb-4">{`Send Mail to ${userInfo.username}`}</h3>
                    <SendEmailPanel username={userInfo.username} email={userInfo.email} onClose={handleClosePanel} />
                </RightPanel>
            }

            {panel === 'fundUpdate' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} style={{ width: '500px' }}>
                    <h3 className="mb-4">{`Balance Add or Subtract`}</h3>
                    <BalancePanel userId={userInfo.id} username={userInfo.username} onClose={handleClosePanel} />
                </RightPanel>
            }

            {panel === 'deposit_now' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)} >
                    <h3 className="mb-4">{`Deposit Amount`}</h3>
                    <DepositNow 
                        userId={userInfo.id}                        
                        onClose={() => setIsPanelOpen(false)}
                    />
                    {/* <DepositSuccess userId={userInfo.id} username={userInfo.username} /> */}
                </RightPanel>
            }

            {panel === 'investment_now' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
                    <h3 className="mb-4">Confirm Investment</h3>
                    <InvestNow
                        userId={userInfo.id}             
                        onClose={() => setIsPanelOpen(false)}/>
                </RightPanel>
            }
            
            {panel === 'send_money' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
                    <h3 className="mb-4">{`Send Money`}</h3>
                    <SendMoney senderId={userInfo.id} senderName={userInfo.username} email={"hello"}/>
                </RightPanel>
            }

            {panel === 'withdraw' &&
                <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
                    <h3 className="mb-4">{`Withdraw Money`}</h3>
                    <WithdrawRequest senderId={userInfo.id} senderName={userInfo.username} email={"hello"}/>
                </RightPanel>
            }
        </div>
    )
}