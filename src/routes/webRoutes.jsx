// React:
import { act } from "react";

// Dashboard:
import Dashboard from "../pages/dashboard/Dashboard";

// Users:
import Users from '../pages/users/Users';
import EditUser from "../pages/users/EditUser";
import EditUserV1 from "../pages/users/EditUserV1";
import UserProfit from "../pages/users/UserProfit";

// Roles:
import EditRole from '../pages/role/EditRole';
import Roles from '../pages/role/Roles';

import SendEmail from "../pages/email/SendEmail";

// KYC:
import KycList from '../pages/kyc/KycList';
import KycFormEdit from '../pages/kyc/KycFormEdit';
import KycForms from '../pages/kyc/KycForms';
import KycFormCreate from '../pages/kyc/KycFormCreate';

// Schema:
import StakeEditor from '../pages/schema/StakeEditor';
import SchemaForm from '../pages/schema/SchemaForm';
import Schema from '../pages/schema/Schema';

// Transactions:
import Transactions from '../pages/transaction/Transactions';

// Investments:
import Investments from '../pages/investment/Investments';

// Payment Gateway:
import PaymentGateway from '../pages/gateway/PaymentGateway';

// Notifications:
import Notifications from '../pages/notification/Notifications';

// Deposits:
import DepositHistory from '../pages/deposit/DepositHistory';

// Withdrawals:
import WithdrawMethodManual from '../pages/withdraw/WithdrawMethodManual';
import WithdrawSchedule from '../pages/withdraw/WithdrawSchedule';
import WithdrawHistory from '../pages/withdraw/WithdrawHistory';

// Rankings:
import UserRanking from '../pages/ranking/UserRanking';
import UserRankingFormV1 from '../pages/ranking/UserRankingFormV1';

// Settings:
import NotificationTuneSetting from '../pages/settings/NotificationTuneSetting';
import NotificationSetting from '../pages/settings/NotificationSetting';
import SmsSetting from '../pages/settings/SmsSetting';
import PluginSetting from '../pages/settings/PluginSetting';
import EmailSetting from '../pages/settings/EmailSetting';
import SiteSetting from '../pages/settings/SiteSetting';

// Templates:
import EmailTemplate from '../pages/email/EmailTemplate';
import EmailTemplateEdit from '../pages/email/EmailTemplateEdit';
import SmsTemplate from '../pages/sms/SmsTemplate';
import SmsTemplateEdit from '../pages/sms/SmsTemplateEdit';
import PushNotificationTemplate from '../pages/notification/PushNotificationTemplate';
import PushNotificationTemplateEdit from '../pages/notification/PushNotificationTemplateEdit';

// Support Ticket:
import SupportTicket from '../pages/support/SupportTicket';
import TicketDetails from '../pages/support/TicketDetails';

// Custom CSS:
import CustomCss from '../pages/custom_css/CustomCss';
import Stakes from "../pages/schema/Stakes";


export const WEB_ROUTES = {
  DASHBOARD:      { path: '', element: <Dashboard /> },

  USERS: {
    BASE:         { path: '/users', element: <Users /> },
    ACTIVE:       { path: '/users/active', element: <Users status="ACTIVE" /> },
    DISABLED:     { path: '/users/disabled', element: <Users status="DISABLED" /> },
    PENDING:      { path: '/users/pending', element: <Users status="PENDING" /> },
    USER_DETAIL:  { path: '/users/:userId', element: <EditUser  /> },
    USER_EDIT:    { path: '/users/:userId/edit', element: <EditUserV1 /> },
    SEND_EMAIL:   { path: '/users/mail-send/all', element: <SendEmail /> },
    PROFIT:       { path: '/users/profit', element: <UserProfit /> },
  },

  ROLES: {
    BASE:         { path: 'roles', element: <Roles /> },
    EDIT:         { path: 'roles/:id/edit', element: <EditRole /> },
  },

  KYC: {
    BASE:         { path: 'kyc', element: <KycList /> },
    PENDING:      { path: 'kyc/pending', element: <KycList status={'PENDING'} /> },
    REJECTED:     { path: 'kyc/rejected', element: <KycList status={'REJECTED'} /> },
    VERIFIED:     { path: 'kyc/verified', element: <KycList status={'VERIFIED'} /> },
    UNVERIFIED:   { path: 'kyc/unverified', element: <KycList status={'UNVERIFIED'} /> },
    EDIT:         { path: 'kyc/:userId/edit', element: <KycFormEdit /> },
    FORMS:        { path: 'kyc_forms', element: <KycForms /> },
    CREATE:       { path: 'kyc_forms/create', element: <KycFormCreate /> },
  },

  SCHEMA: {    
    BASE:         { path: 'schemas', element: <Schema/> },
    CREATE:       { path: 'schemas/create', element: <SchemaForm/> },
    EDIT:         { path: 'schemas/edit/:schemaId', element: <SchemaForm/> },
    // STAKES:       { path: 'schemas/stakes', element: <StakeEditor/> },
    STAKES:       { path: 'schemas/stakes', element: <Stakes/> },
  },

  TRANSACTIONS:   { path: 'transactions', element: <Transactions/> },
  INVESTMENTS:    { path: 'investments', element: <Investments/> },
  PAYMENT_GATEWAY:{ path: 'payment/gateway', element: <PaymentGateway/> },
  NOTIFICATIONS:  { path: 'notifications', element: <Notifications/> },


  DEPOSIT: {
    HISTORY:      { path: 'deposit/history', element: <DepositHistory status='PENDING' /> },
    PENDING:      { path: 'deposit/pending', element: <DepositHistory status='PENDING' /> },
    REJECTED:     { path: 'deposit/rejected', element: <DepositHistory status='REJECTED' /> },
  },

  WITHDRAW: {
    AUTO:         { path: 'withdraw/method/auto', element: <WithdrawMethodManual /> },
    MANUAL:       { path: 'withdraw/method/manual', element: <WithdrawMethodManual /> },
    PENDING:      { path: 'withdraw/pending', element: <WithdrawMethodManual /> },
    SCHEDULE:     { path: 'withdraw/schedule', element: <WithdrawSchedule /> },
    HISTORY:      { path: 'withdraw/history', element: <WithdrawHistory /> },
  },

  RANKINGS: {
    BASE:         { path: 'rankings', element: <UserRanking /> },
    CREATE:       { path: 'rankings/create', element: <UserRankingFormV1 /> },
    EDIT:         { path: 'rankings/edit/:rankingId', element: <UserRankingFormV1 /> },
  },

  SETTING: {
    SITE:         { path: 'setting/site', element: <SiteSetting /> },
    MAIL:         { path: 'setting/mail', element: <EmailSetting /> },
    PLUGIN:       { path: 'setting/plugin', element: <PluginSetting /> },
    SMS:          { path: 'setting/sms', element: <SmsSetting /> },
    PUSH:         { path: 'setting/notification', element: <NotificationSetting /> },
    TUNE:         { path: 'setting/tune', element: <NotificationTuneSetting /> },
  },

  TEMPLATES: {
    EMAIL:        { path: 'template/email', element: <EmailTemplate /> },  
    EMAIL_EDIT:   { path: 'template/email/:id/edit', element: <EmailTemplateEdit /> },  
    SMS:          { path: 'template/sms', element: <SmsTemplate /> },
    SMS_EDIT:     { path: 'template/sms/:id/edit', element: <SmsTemplateEdit /> },
    PUSH:         { path: 'template/notification', element: <PushNotificationTemplate /> },
    PUSH_EDIT:    { path: 'template/notification', element: <PushNotificationTemplateEdit /> },
  },

  SUPPORT_TICKET: {
    BASE:         { path: 'tickets', element: <SupportTicket /> },  
    DETAILS:      { path: 'tickets/:id/details', element: <TicketDetails /> },  
  },

  
  CUSTOM_CSS: { path: 'custom-css', element: <CustomCss /> }, 
  
};
