// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const API_VERSION = '/api/v1';

export const APP_NAME = 'TrustAI'

export const CURRENCY_UNIT = "USDT";
export const CURRENCY_UNIT_DEFAULT = "INR";
export const CURRENCY_SYMBOL = "$"; // "₹"
export const CURRENCY_SYMBOL_DEFAULT = "₹";
export const REFERRAL_TREE_MAX_DEPTH = 4;

export const SCHEDULE_OPTIONS = [
  { label: "Hourly", value: 1, disabled: true,},
  { label: "Daily", value: 2, disabled: false, },
  { label: "Weekly", value: 3, disabled: true, },
  { label: "2 Week", value: 4, disabled: true, },
  { label: "Monthly", value: 5, disabled: true, },
  { label: "No Schedule", value: 6, disabled: true, }
];

const imageFileTypes = "image/png, image/jpeg, image/gif";
const allFileTypes = "";
export const ACCEPTED_FILE_TYPES = imageFileTypes;



export const RANK_LABEL_MAP = {
  RANK_0: "Lv0",
  RANK_1: "Lv1",
  RANK_2: "Lv2",
  RANK_3: "Lv3",
  RANK_4: "Lv4",
  RANK_5: "Lv5",
  RANK_6: "Lv6",
  RANK_7: "Lv7",
  RANK_8: "Lv8",
  RANK_9: "Lv9",
  RANK_10: "Lv10",
};

export const RANK_TO_NUMBER_MAP = {
  RANK_0: "0",
  RANK_1: "1",
  RANK_2: "2",
  RANK_3: "3",
  RANK_4: "4",
  RANK_5: "5",
  RANK_6: "6",
  RANK_7: "7",
  RANK_8: "8",
  RANK_9: "9",
  RANK_10: "10",
};
