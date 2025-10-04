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
    PROFITS: "/api/v1/transactions/profits",
  },

  DEPOSITS: {
    BASE: "/api/v1/deposits",
    REQUEST: (isManual) => (!isManual ? "/api/v1/deposits" : "/api/v1/deposits/manual"),
    ACTION: (action, id) => `/api/v1/deposits/${action}/${id}`,  // ['approve', 'reject']
  },


  WITHDRAWAL: {
    RULES: "/api/v1/withdraw-rules",
    UPDATE_RULE: "/api/v1/withdraw-rules/update",
    BASE: "/api/v1/withdraws",
    ACTION: (action, id) => `/api/v1/withdraws/${action}/${id}`,  // ['approve', 'reject']
  },

  RANKINGS: {
    BASE: "/api/v1/rankings",
    BY_ID: (rankId) => `/api/v1/rankings/${rankId}`,
    UPDATE: "/api/v1/rankings/update",
    EVALUATE_ALL_RANKS: "/api/v1/rankings/re-evaluate/batch",
    EVALUATE_RANK_BY_USERID: (userId) => `/api/v1/rankings/re-evaluate/${userId}`
  },

   //...
  RANK_CONFIGS_BULK_UPSERT: "/api/v1/investment-schemas/bulk-upsert",

  SCHEMAS: {
    BASE: "/api/v1/investment-schemas",
    BY_ID: (id) => `/api/v1/investment-schemas/${id}`,
    FILTER: (filters = {}) => {
      const queryString = new URLSearchParams(filters).toString();
      return `/api/v1/investment-schemas${queryString ? `?${queryString}` : ""}`;
    },
    BULK_UPSERT: "/api/v1/investment-schemas/bulk-upsert",
  },

    

  INCOME: {
    ACTIVITY_REWARD: "/api/v1/income/activity-reward",
    TEAM_CONFIGS: "/api/v1/income/configs",
  },

  
  // Team Income Config:
  TEAM_INCOME_CONFIGS: '/api/v1/income/configs',

  INVESTMENTS: {
    BASE: "/api/v1/investments",
    SUBSCRIBE: "/api/v1/investments/subscribe",
    BY_USER: (userId) => `/api/v1/investments/user/${userId}`,

    SCHEDULE_DAILY: "/api/v1/investments/scheduler/run-daily",
    SCHEDULE_MATURITY: "/api/v1/investments/scheduler/run-maturity",
    SCHEDULE_ALL: "/api/v1/investments/scheduler/run-all",
  },

  NOTIFICATIONS: {
    MAIL_TEST: "/api/v1/notifications/mail-connection-test",
    SEND_MAIL: "/api/v1/notifications/send-email",
  },

  TEMPLATES: {
    LIST: (type) => `/api/v1/templates/${type}`,
    BY_ID: (type, id) => `/api/v1/templates/${type}/${id}`,
  },

  CONFIGS: {
    GET: "/api/v1/configs",
    ADD: "/api/v1/configs/add",
    UPDATE: "/api/v1/configs/update",
    RELOAD: "/api/v1/configs/reload",
  },

  STORAGE: {
    IMAGES: "/api/v1/images",
    UPLOAD: "/api/v1/images/upload-multiple"
  },


  NOTIFICATIONS: {
    MAIL_CONNECTION_TEST: "/api/v1/notifications/mail-connection-test",
    SEND_NOTIFICATION: "/api/v1/notifications/send",
    TEMPLATE_LIST: (type) => `/api/v1/templates/${type}`,
    TEMPLATE_BY_ID: (type, id) => `/api/v1/templates/${type}/${id}`,
  },



  // Referral tree View
  REFERRAL_TREE: (userId, maxLevel = 4) => `/api/v1/tree/${userId}?maxLevel=${maxLevel}`,
  // Notification Templates
  // Configs...
  CONFIG_PROPERTIES: "http://localhost:8888/nft_app/dev",
  UPDATE_CONFIG: "http://localhost:8888/api/v1/configs/update",
  // Add more as needed...
};
