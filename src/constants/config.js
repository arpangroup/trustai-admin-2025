// export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const API_VERSION = '/api/v1';

export const APP_NAME = 'TrustAI'
export const MIN_INVEST_AMOUNT = '100';

export const CURRENCY_UNIT = "USDT";
export const CURRENCY_UNIT_DEFAULT = "INR";
export const CURRENCY_SYMBOL = "$"; // "₹"
export const CURRENCY_SYMBOL_DEFAULT = "₹"; 

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
