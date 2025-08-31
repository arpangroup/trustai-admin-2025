import { act } from "react";

export const API_ROUTES = {

  AUTH_API: {
    ACCESS_TOKEN: "/api/auth/accessToken",
    REFRESH_TOKEN: "/api/auth/refresh",
  },

  USERS: "/api/v1/users",
  USER_BY_ID: (id) => `/api/v1/users/${id}`,
  // KYC
  KYC_LIST: "/api/v1/kyc",
  KYC_BY_ID: (kycId) => `/api/v1/kyc/${kycId}`,
  KYC_SUBMIT: (kycId, action) => `/api/v1/kyc/${kycId}/${action}`, // ['approve', 'reject']  
  // Transactions:
  TRANSACTIONS: "/api/v1/transactions",
  USER_TRANSACTIONS: (userId) => `/api/v1/transactions/user/${userId}`,
  TRANSACTION_ADJUST_BALANCE: (isCredit) => `/api/v1/transactions/adjustments/${isCredit ? 'add' : 'subtract'}`,
  // Deposit:
  DEPOSIT_LIST: "/api/v1/deposits", 
  DEPOSIT_REQUEST: (isManual) => !isManual ? "/api/v1/deposits" : `/api/v1/deposits/manual`, 
  DEPOSIT_ACTION: (action, id) => `/api/v1/deposits/${action}/${id}`, // ['approve', 'reject']
  //...
  RANK_CONFIGS: "/api/v1/rankings",
  RANK_CONFIGS_BY_ID: (rankId) => `/api/v1/rankings/${rankId}`,
  RANK_CONFIGS_UPDATE: "/api/v1/rankings/update",
  RANK_CONFIGS_BULK_UPSERT: "/api/v1/investment-schemas/bulk-upsert",
  SCHEMA_LIST: `/api/v1/investment-schemas`,
  SCHEMA_LIST_FILTER: (filters = {}) => {
    const queryString = new URLSearchParams(filters).toString();
    return `/api/v1/investment-schemas${queryString ? `?${queryString}` : ''}`;
  },
  SCHEMA_By_ID: (id) =>`/api/v1/investment-schemas/${id}`,
  // Team Income Config:
  TEAM_INCOME_CONFIGS: '/api/v1/income/configs',
  // Investment:
  INVESTMENTS: "/api/v1/investments",
  INVESTMENT_SUBSCRIBE: "/api/v1/investments/subscribe",
  INVESTMENTS_BY_USER_ID: (userId) => `/api/v1/investments/user/${userId}`,
  // Referral tree View
  REFERRAL_TREE: (userId, maxLevel = 3) => `/api/v1/tree/${userId}?maxLevel=${maxLevel}`,
  // Notification Templates
  MAIL_CONNECTION_TEST: "/api/v1/notifications/mail-connection-test",
  SEND_MAIL: "/api/v1/notifications/send-email",
  TEMPLATE_LIST: (type) => `/api/v1/templates/${type}`,
  TEMPLATE_BY_ID: (type, id) => `/api/v1/templates/${type}/${id}`,
  // Configs...
  CONFIG_PROPERTIES: "http://localhost:8888/nft_app/dev",
  UPDATE_CONFIG: "http://localhost:8888/api/v1/configs/update",
  // Add more as needed...
};
