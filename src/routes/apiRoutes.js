import { act } from "react";

export const API_ROUTES = {

  AUTH_API: {
    ACCESS_TOKEN: "/api/auth/accessToken",
    REFRESH_TOKEN: "/api/auth/refresh",
  },

  USERS: {
    BASE: "/api/v1/users",
    BY_ID: (id) => `/api/v1/users/${id}`,
    ACCOUNT_STATUS: (userId) => `/api/v1/users/account-status/${userId}`, // ['ACTIVE' : 'DISABLED'];
    TRANSACTION_STATUS: (userId, status) => `/api/v1/users/transaction-status/${userId}?status=${status}`, // ['ENABLED' : 'DISABLED'];
  },

  KYC: {
    BASE: "/api/v1/kyc",
    BY_ID: (kycId) => `/api/v1/kyc/${kycId}`,
    SUBMIT: (kycId, action) => `/api/v1/kyc/${kycId}/${action}`, // ['approve', 'reject']  
  },

  TRANSACTIONS: {
    BASE: "/api/v1/transactions",
    BY_USER: (userId) => `/api/v1/transactions/user/${userId}`,
    ADJUST_BALANCE: (isCredit) =>`/api/v1/transactions/adjustments/${isCredit ? "add" : "subtract"}`,
  },

  DEPOSITS: {
    BASE: "/api/v1/deposits",
    REQUEST: (isManual) => (!isManual ? "/api/v1/deposits" : "/api/v1/deposits/manual"),
    ACTION: (action, id) => `/api/v1/deposits/${action}/${id}`,  // ['approve', 'reject']
  },

  RANKINGS: {
    BASE: "/api/v1/rankings",
    BY_ID: (id) => `/api/v1/rankings/${id}`,
    UPDATE: "/api/v1/rankings/update",
  },

  SCHEMAS: {
    BASE: "/api/v1/investment-schemas",
    FILTER: (filters = {}) => {
      const queryString = new URLSearchParams(filters).toString();
      return `/api/v1/investment-schemas${queryString ? `?${queryString}` : ""}`;
    },
    BY_ID: (id) => `/api/v1/investment-schemas/${id}`,
    BULK_UPSERT: "/api/v1/investment-schemas/bulk-upsert",
  },

  INCOME: {
    TEAM_CONFIGS: "/api/v1/income/configs",
  },

  INVESTMENTS: {
    BASE: "/api/v1/investments",
    SUBSCRIBE: "/api/v1/investments/subscribe",
    BY_USER: (userId) => `/api/v1/investments/user/${userId}`,
  },

  REFERRAL_TREE: (userId, maxLevel = 3) => `/api/v1/tree/${userId}?maxLevel=${maxLevel}`,

  NOTIFICATIONS: {
    MAIL_TEST: "/api/v1/notifications/mail-connection-test",
    SEND_MAIL: "/api/v1/notifications/send-email",
  },

  TEMPLATES: {
    LIST: (type) => `/api/v1/templates/${type}`,
    BY_ID: (type, id) => `/api/v1/templates/${type}/${id}`,
  },

  CONFIGS: {
    GET: "http://localhost:8888/nft_app/dev",
    UPDATE: "http://localhost:8888/api/v1/configs/update",
  },

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
