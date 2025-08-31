import Dashboard from '../pages/dashboard/Dashboard';
import Users from '../pages/users/Users';
import EditUser from '../pages/users/EditUser';
import EditUserV1 from '../pages/users/EditUserV1';
import KycList from '../pages/kyc/KycList';
import KycFormEdit from '../pages/kyc/KycFormEdit';
import KycForms from '../pages/kyc/KycForms';
import KycFormCreate from '../pages/kyc/KycFormCreate';
import EditRole from '../pages/role/EditRole';
import Roles from '../pages/role/Roles';
import StakeEditor from '../pages/schema/StakeEditor';
import SchemaForm from '../pages/schema/SchemaForm';
import Schema from '../pages/schema/Schema';
import Transactions from '../pages/transaction/Transactions';
import PaymentGateway from '../pages/gateway/PaymentGateway';
import DepositHistory from '../pages/deposit/DepositHistory';
import WithdrawMethodManual from '../pages/withdraw/WithdrawMethodManual';
import UserRankingFormV1 from '../pages/ranking/UserRankingFormV1';
import NotificationTuneSetting from '../pages/settings/NotificationTuneSetting';
import NotificationSetting from '../pages/settings/NotificationSetting';
import SmsSetting from '../pages/settings/SmsSetting';
import PluginSetting from '../pages/settings/PluginSetting';
import EmailSetting from '../pages/settings/EmailSetting';
import SiteSetting from '../pages/settings/SiteSetting';
import SupportTicket from '../pages/support/SupportTicket';
import TicketDetails from '../pages/support/TicketDetails';
import CustomCss from '../pages/custom_css/CustomCss';
import PushNotificationTemplateEdit from '../pages/notification/PushNotificationTemplateEdit';
import PushNotificationTemplate from '../pages/notification/PushNotificationTemplate';
import SmsTemplateEdit from '../pages/sms/SmsTemplateEdit';
import SmsTemplate from '../pages/sms/SmsTemplate';
import EmailTemplateEdit from '../pages/email/EmailTemplateEdit';
import EmailTemplate from '../pages/email/EmailTemplate';
import SendEmail from '../pages/email/SendEmail';
import UserProfit from '../pages/users/UserProfit';
import Investments from '../pages/investment/Investments';
import Notifications from '../pages/notification/Notifications';
import WithdrawSchedule from '../pages/withdraw/WithdrawSchedule';
import WithdrawHistory from '../pages/withdraw/WithdrawHistory';
import UserRanking from '../pages/ranking/UserRanking';

const adminRoutes = [
  { path: '', element: <Dashboard /> },
  { path: 'users', element: <Users /> },
  { path: 'users/active', element: <Users status="ACTIVE" /> },
  { path: 'users/disabled', element: <Users status="DISABLED" /> },
  { path: 'users/pending', element: <Users status="PENDING" /> },
  { path: 'users/:userId', element: <EditUser /> },
  { path: 'users/:userId/edit', element: <EditUserV1/> },
  { path: 'users/mail-send/all', element: <SendEmail /> },
  { path: 'users/profit', element: <UserProfit /> },

  // KYC
  { path: 'kyc', element: <KycList /> },
  { path: 'kyc/pending', element: <KycList status={'PENDING'} /> },
  { path: 'kyc/rejected', element: <KycList status={'REJECTED'} /> },
  { path: 'kyc/verified', element: <KycList status={'VERIFIED'} /> },
  { path: 'kyc/unverified', element: <KycList status={'UNVERIFIED'} /> },
  { path: 'kyc/:userId/edit', element: <KycFormEdit /> },
  { path: 'kyc_forms', element: <KycForms /> },
  { path: 'kyc_forms/create', element: <KycFormCreate /> },
  
  { path: 'roles', element: <Roles /> },
  { path: 'roles/:id/edit', element: <EditRole /> },

  { path: 'schemas', element: <Schema/> },
  { path: 'schemas/create', element: <SchemaForm/> },
  { path: 'schemas/edit/:schemaId', element: <SchemaForm/> },
  { path: 'schemas/stakes', element: <StakeEditor/> },

  { path: 'transactions', element: <Transactions/> },
  { path: 'investments', element: <Investments/> },
  { path: 'notifications', element: <Notifications/> },

  { path: 'payment/gateway', element: <PaymentGateway/> },
  
  { path: 'deposit/pending', element: <DepositHistory status='PENDING' /> },
  { path: 'deposit/rejected', element: <DepositHistory status='REJECTED' /> },
  { path: 'deposit/history', element: <DepositHistory status='PENDING' /> },
  
  { path: 'withdraw/method/auto', element: <WithdrawMethodManual /> },
  { path: 'withdraw/method/manual', element: <WithdrawMethodManual /> },
  { path: 'withdraw/pending', element: <WithdrawMethodManual /> },
  { path: 'withdraw/schedule', element: <WithdrawSchedule /> },
  { path: 'withdraw/history', element: <WithdrawHistory /> },

  { path: 'rankings', element: <UserRanking /> },
  { path: 'rankings/create', element: <UserRankingFormV1 /> },
  { path: 'rankings/edit/:rankingId', element: <UserRankingFormV1 /> },

  
  { path: 'setting/site', element: <SiteSetting /> },
  { path: 'setting/mail', element: <EmailSetting /> },
  { path: 'setting/plugin', element: <PluginSetting /> },
  { path: 'setting/sms', element: <SmsSetting /> },
  { path: 'setting/notification', element: <NotificationSetting /> },
  { path: 'setting/tune', element: <NotificationTuneSetting /> },

  
  { path: 'template/email', element: <EmailTemplate /> },  
  { path: 'template/email/:id/edit', element: <EmailTemplateEdit /> },  
  { path: 'template/sms', element: <SmsTemplate /> },
  { path: 'template/sms/:id/edit', element: <SmsTemplateEdit /> },
  { path: 'template/notification', element: <PushNotificationTemplate /> },
  { path: 'template/email', element: <PushNotificationTemplateEdit /> },
  
  { path: 'tickets', element: <SupportTicket /> },  
  { path: 'tickets/:id/details', element: <TicketDetails /> },  
  { path: 'custom-css', element: <CustomCss /> },
  
];

export default adminRoutes;
