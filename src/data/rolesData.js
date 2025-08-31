export const modules = [
    {
        title: "Customer Management",
        id: "CustomerManagement",
        permissions: [
            { label: "Customer List", id: "customer-list", value: "1", checked: true },
            { label: "Customer Login", id: "customer-login", value: "2" },
            { label: "Customer Mail Send", id: "customer-mail-send", value: "3" },
            { label: "Customer Basic Manage", id: "customer-basic-manage", value: "4" },
            { label: "Customer Balance Add Or Subtract", id: "customer-balance-add-or-subtract", value: "5" },
            { label: "Customer Change Password", id: "customer-change-password", value: "6" },
            { label: "All Type Status", id: "all-type-status", value: "7" },
        ],
    },
    {
        title: "KYC Management",
        id: "KycManagement",
        permissions: [
            { label: "KYC View", id: "kyc-view", value: "8" },
            { label: "KYC Approve", id: "kyc-approve", value: "9" },
            { label: "KYC List", id: "kyc-list", value: "10" },
            { label: "KYC Action", id: "kyc-action", value: "11" },
            { label: "Kyc Form Manage", id: "kyc-form-manage", value: "12" },
        ],
    },
    {
        title: "Role Management",
        id: "RoleManagement",
        permissions: [
            { label: "Role List", id: "role-list", value: "13" },
            { label: "Role Create", id: "role-create", value: "14" },
            { label: "Role Edit", id: "role-edit", value: "15" },
        ],
    },
    {
        title: "Staff Management",
        id: "StaffManagement",
        permissions: [
            { label: "Staff List", id: "staff-list", value: "16" },
            { label: "Staff Create", id: "staff-create", value: "17" },
            { label: "Staff Edit", id: "staff-edit", value: "18" },
        ],
    },
    {
        title: "Plan Management",
        id: "PlanManagement",
        permissions: [
            { label: "Schedule Manage", id: "schedule-manage", value: "19" },
            { label: "Schema List", id: "schema-list", value: "20" },
            { label: "Schema Create", id: "schema-create", value: "21" },
            { label: "Schema Edit", id: "schema-edit", value: "22" },
        ],
    },
    {
        title: "Transaction Management",
        id: "TransactionManagement",
        permissions: [
            { label: "Transaction List", id: "transaction-list", value: "23" },
            { label: "Investment List", id: "investment-list", value: "24" },
            { label: "Profit List", id: "profit-list", value: "25" },
        ],
    },
    {
        title: "Deposit Management",
        id: "DepositManagement",
        permissions: [
            { label: "Automatic Gateway Manage", id: "deposit-automatic-gateway-manage", value: "26" },
            { label: "Manual Gateway Manage", id: "deposit-manual-gateway-manage", value: "27" },
            { label: "Deposit List", id: "deposit-list", value: "28" },
            { label: "Deposit Action", id: "deposit-action", value: "29" },
        ],
    },
    {
        title: "Withdraw Management",
        id: "WithdrawManagement",
        permissions: [
            { label: "Withdraw List", id: "withdraw-list", value: "30" },
            { label: "Withdraw Method Manage", id: "withdraw-method-manage", value: "31" },
            { label: "Withdraw Action", id: "withdraw-action", value: "32" },
            { label: "Withdraw Schedule", id: "withdraw-schedule", value: "33" },
        ],
    },
    {
        title: "Referral Management",
        id: "ReferralManagement",
        permissions: [
            { label: "Target Manage", id: "referral-target-manage", value: "34" },
            { label: "Referral Create", id: "referral-create", value: "35" },
            { label: "Referral List", id: "referral-list", value: "36" },
            { label: "Referral Edit", id: "referral-edit", value: "37" },
            { label: "Referral Delete", id: "referral-delete", value: "38" },
        ],
    },
    {
        title: "Ranking Management",
        id: "RankingManagement",
        permissions: [
            { label: "Ranking List", id: "ranking-list", value: "39" },
            { label: "Ranking Create", id: "ranking-create", value: "40" },
            { label: "Ranking Edit", id: "ranking-edit", value: "41" },
        ],
    },
    {
        title: "Frontend Management",
        id: "FrontendManagement",
        permissions: [
            { label: "Landing Page Manage", id: "manage-landing-page", value: "42" },
            { label: "Page Manage", id: "manage-page", value: "43" },
            { label: "Footer Manage", id: "manage-footer", value: "44" },
            { label: "Navigation Manage", id: "manage-navifation", value: "45" },
        ],
    },
        {
        title: "Subscriber Management",
        id: "SubscriberManagement",
        permissions: [
            { label: "Subscriber List", id: "subscriber-list", value: "46" },
            { label: "Subscriber Mail Sent", id: "subscriber-mail-sent", value: "47" },
        ],
    },
    
        {
        title: "Support Ticket Management",
        id: "SupportTicketManagement",
        permissions: [
            { label: "Support Ticket List", id: "support-ticket-list", value: "48" },
            { label: "Support Ticket Action", id: "support-ticket-action", value: "49" },
        ],
    },
    {
        title: "Setting Management",
        id: "SettingManagement",
        permissions: [
            { label: "Site Setting", id: "setting-site", value: "50" },
            { label: "Email Setting", id: "setting-email", value: "51" },
            { label: "Plugin Setting", id: "setting-plugins", value: "52" },
            { label: "Language Setting", id: "setting-language", value: "53" },
            { label: "Page Setting", id: "setting-page", value: "54" },
            { label: "Custom Css", id: "setting-css", value: "55" },
            { label: "Email Template", id: "setting-email-template", value: "56" },
        ],
    },
    // Add other modules like Staff Management, Plan Management, etc.
];