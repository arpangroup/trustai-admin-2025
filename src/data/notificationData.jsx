
import { LuShield , LuFingerprint, LuNewspaper, LuWallet, LuUserPlus } from "react-icons/lu";

export const notifications = [
    {
        id: "notif_12345",
        title: "New Login from Chrome",
        message: "We noticed a new login to your account from a Chrome browser on Windows.",
        type: "security", // other examples: "info", "warning", "success", "error"
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuShield/>, // for UI rendering
        link: "/account/security", // optional route to go to
        userId: "user_98765", // optional association
    },
    {
        id: "notif_1",
        title: "Withdraw Request details",
        message: "Withdraw Request details: TRX2ZGFNUAAZS WITHDRAWAL 5000INR",
        type: "WithdrawRequest",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuWallet/>,
        link: "/withdraw/pending",
        userId: "user_98765",
    },
    {
        id: "notif_2",
        title: "Withdraw Request details",
        message: "Withdraw Request details: TRXLXUMEFJWGP WITHDRAWAL 100INR",
        type: "WithdrawRequest",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuWallet/>,
        link: "/withdraw/pending",
        userId: "user_98765",
    },
    {
        id: "notif_3",
        title: "The manual deposit request details",
        message: "The manual deposit request details: TRX8GMNTM9TIT Testbep201234567890 5000",
        type: "DepositManual",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuNewspaper/>,
        link: "/deposit/manual-pending",
        userId: "user_98765",
    },
    {
        id: "notif_4",
        title: "Thanks for joining us Monuking1000k King",
        message: "Thanks for joining us Monuking1000k King .New User added our system.",
        type: "NewUserRegistration",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuUserPlus/>,
        link: "/users/9/edit",
        userId: "user_98765",
    },

    {
        id: "notif_5",
        title: "Thanks for joining us Sanjay yadav Yadav",
        message: "Thanks for joining us Sanjay yadav Yadav .New User added our system.",
        type: "NewUserRegistration",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuUserPlus/>,
        link: "/users/10/edit",
        userId: "user_98765",
    },
    {
        id: "notif_6",
        title: "KYC Requested",
        message: "Test Test Kyc requested Test@gmail.com",
        type: "KYCRequested",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuFingerprint/>,
        link: "/kyc/pending",
        userId: "user_98765",
    },
    {
        id: "notif_7",
        title: "KYC Requested",
        message: "Amit Sharma Kyc requested amit@gmail.com",
        type: "KYCRequested",
        isRead: false,
        createdAt: "2025-06-08T12:45:00Z",
        icon: <LuFingerprint/>,
        link: "/kyc/pending",
        userId: "user_98765",
    }
]