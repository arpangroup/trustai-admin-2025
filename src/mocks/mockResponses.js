import { API_ROUTES } from "../constants/apiRoutes";

export const mockResponses = {
  [API_ROUTES.USERS]: async (queryParams) => USERS,
  [API_ROUTES.USER_BY_ID(1)]: async () => USER_BY_ID,
  // Transactions:
  [API_ROUTES.TRANSACTIONS]: async (queryParams) => TRANSACTIONS,
  [API_ROUTES.USER_TRANSACTIONS(1)]: async () => TRANSACTIONS,
  // Deposit:
  [API_ROUTES.DEPOSIT_LIST]: async () => TRANSACTIONS,

  [API_ROUTES.KYC_LIST]: async () => KYC_LIST,
  [API_ROUTES.RANK_CONFIGS]: async () => RANK_CONFIGS,
  [API_ROUTES.SCHEMA_LIST]: async () => SCHEMA_LIST,
  // [API_ROUTES.SCHEMA_By_ID(1)]: async () => SCHEMA_LIST.content[0],
  [API_ROUTES.SCHEMA_By_ID(':id')]: async ({ id }) => SCHEMA_LIST.content.find(s => s.id === Number(id)),
  [API_ROUTES.CONFIG_PROPERTIES]: async () => CONFIG_PROPERTIES,
};



const USERS = { content:[
    {id:1,username:`mockuser1`,email:`mock1@example.com`,rankCode:"RANK_1",walletBalance:1000,profitBalance:100,referralCode:`REF1`,createdAt:new Date().toISOString(),kycStatus:"Verified",active:true,accountStatus:"Active"},
    {id:1,username:`mockuser2`,email:`mock2@example.com`,rankCode:"RANK_2",walletBalance:2000,profitBalance:200,referralCode:`REF2`,createdAt:new Date().toISOString(),kycStatus:"Verified",active:true,accountStatus:"Pending"},
] };

const TRANSACTIONS = { content:[
  {"id":11,"userId":1,"amount":-5000.00,"txnType":"BONUS","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.423931"},
  {"id":10,"userId":1,"amount":-5000.00,"txnType":"INTEREST","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.415475"},
  {"id":9,"userId":1,"amount":-5000.00,"txnType":"EXCHANGE","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.405128"},
  {"id":8,"userId":1,"amount":-5000.00,"txnType":"REFERRAL","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.394505"},
  {"id":7,"userId":1,"amount":-5000.00,"txnType":"REFUND","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.384488"},
  {"id":6,"userId":1,"amount":-5000.00,"txnType":"DEPOSIT","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.374489"},
  {"id":5,"userId":1,"amount":-5000.00,"txnType":"SIGNUP_BONUS","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.357449"},
  {"id":4,"userId":1,"amount":-5000.00,"txnType":"INVESTMENT","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.346174"},
  {"id":3,"userId":1,"amount":-5000.00,"txnType":"SUBTRACT","status":"CANCELLED","txnDate":"2025-07-10T12:52:55.335173"},
  {"id":2,"userId":1,"amount":5000.00,"txnType":"REFUND","status":"PENDING","txnDate":"2025-07-10T12:52:55.32642"},
  {"id":1,"userId":1,"amount":-5000.00,"txnType":"INVESTMENT","status":"SUCCESS","txnDate":"2025-07-10T12:52:55.292279"}
]};

const KYC_LIST = { content:[
 {"kycId":1,"fullname":"Mock User1","documentType":"NATIONAL_ID","createdAt":"2025-07-10T18:44:58.884196","status":"PENDING"},
 {"kycId":1,"fullname":"Mock User2","documentType":"NATIONAL_ID","createdAt":"2025-07-10T18:44:58.884196","status":"REJECTED"},
 {"kycId":1,"fullname":"Mock User2","documentType":"NATIONAL_ID","createdAt":"2025-07-10T18:44:58.884196","status":"VERIFIED"}
]};

const RANK_CONFIGS = { content: [
  {"id":1,"code":"RANK_0","displayName":"TrustAI Member","rankOrder":0,"minDepositAmount":15.0000,"minInvestmentAmount":15.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":0,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":0,"requiredLevelCounts":{"1":0,"2":0,"3":0},"commissionPercentage":0.00,"rankBonus":10,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":2,"code":"RANK_1","displayName":"TrustAI Leader","rankOrder":1,"minDepositAmount":40.0000,"minInvestmentAmount":0.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":0,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":0,"2":0,"3":0},"commissionPercentage":1.00,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":3,"code":"RANK_2","displayName":"TrustAI Captain","rankOrder":2,"minDepositAmount":300.0000,"minInvestmentAmount":100.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":4,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":4,"2":5,"3":1},"commissionPercentage":1.70,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":4,"code":"RANK_3","displayName":"TrustAI Victor","rankOrder":3,"minDepositAmount":600.0000,"minInvestmentAmount":200.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":6,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":6,"2":25,"3":5},"commissionPercentage":2.30,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":5,"code":"RANK_4","displayName":"TrustAI Champion","rankOrder":4,"minDepositAmount":1500.0000,"minInvestmentAmount":300.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":12,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":12,"2":35,"3":10},"commissionPercentage":2.80,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":6,"code":"RANK_5","displayName":"TrustAI Silver","rankOrder":5,"minDepositAmount":3000.0000,"minInvestmentAmount":400.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":16,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":16,"2":70,"3":20},"commissionPercentage":3.30,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":7,"code":"RANK_6","displayName":"TrustAI Gold","rankOrder":6,"minDepositAmount":6000.0000,"minInvestmentAmount":500.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":20,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":20,"2":160,"3":40},"commissionPercentage":3.80,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"},
  {"id":8,"code":"RANK_7","displayName":"TrustAI Platinum","rankOrder":7,"minDepositAmount":15000.0000,"minInvestmentAmount":500.0000,"minReferralTotalDeposit":0.0000,"minReferralTotalInvestment":0.0000,"minTotalEarnings":0.0000,"minDirectReferrals":35,"minTeamSize":0,"minTeamVolume":0,"txnPerDay":1,"requiredLevelCounts":{"1":35,"2":350,"3":50},"commissionPercentage":4.50,"rankBonus":20,"description":null,"active":true,"achievable":false,"imageUrl":null,"rewardType":"CASH","rankType":"PERFORMANCE"}
]};

const SCHEMA_LIST = { content: [
  {"id":1,"title":"Fixed 1-Year Plan","schemaBadge":"FIXED_PLAN","schemaType":"FIXED","minimumInvestmentAmount":1000.0,"maximumInvestmentAmount":null,"returnRate":6.5,"interestCalculationMethod":"PERCENTAGE","returnSchedule":{"id":4,"scheduleName":"Weekly","scheduleInHour":168},"returnType":"PERIOD","totalReturnPeriods":52,"cancellationGracePeriodMinutes":1440,"description":"Fixed 1-Year investment with weekly returns.","createdAt":"2025-07-10T19:35:09.76929","updatedAt":"2025-07-10T19:35:09.76929","createdBy":"admin","updatedBy":"admin","currency":"USD","earlyExitPenalty":50.0,"termsAndConditionsUrl":"https://example.com/tc/fixed1yr","active":true,"featured":true,"tradeable":false,"capitalReturned":true,"cancellable":true},
  {"id":2,"title":"Flexible Lifetime Growth Plan","schemaBadge":"LIFETIME_PLAN","schemaType":"RANGE","minimumInvestmentAmount":500.0,"maximumInvestmentAmount":10000.0,"returnRate":4.0,"interestCalculationMethod":"FLAT","returnSchedule":{"id":3,"scheduleName":"Daily","scheduleInHour":24},"returnType":"LIFETIME","totalReturnPeriods":0,"cancellationGracePeriodMinutes":0,"description":"Lifetime income with flexible investment range.","createdAt":"2025-07-10T19:35:09.795262","updatedAt":"2025-07-10T19:35:09.795262","createdBy":"system","updatedBy":"system","currency":"INR","earlyExitPenalty":100.0,"termsAndConditionsUrl":"https://example.com/tc/flexiblelife","active":true,"featured":false,"tradeable":true,"capitalReturned":false,"cancellable":false},
  {"id":3,"title":"Fixed Income for Life","schemaBadge":"CRYPTO","schemaType":"FIXED","minimumInvestmentAmount":2500.0,"maximumInvestmentAmount":null,"returnRate":5.25,"interestCalculationMethod":"PERCENTAGE","returnSchedule":{"id":5,"scheduleName":"Monthly","scheduleInHour":720},"returnType":"LIFETIME","totalReturnPeriods":0,"cancellationGracePeriodMinutes":4320,"description":"Monthly lifetime returns on a fixed deposit.","createdAt":"2025-07-10T19:35:09.805277","updatedAt":"2025-07-10T19:35:09.805277","createdBy":"manager","updatedBy":"manager","currency":"EUR","earlyExitPenalty":75.0,"termsAndConditionsUrl":"https://example.com/tc/lifetimefixed","active":false,"featured":true,"tradeable":true,"capitalReturned":false,"cancellable":true},
  {"id":4,"title":"Dynamic Tiered Plan","schemaBadge":"DYNAMIC","schemaType":"RANGE","minimumInvestmentAmount":1000.0,"maximumInvestmentAmount":20000.0,"returnRate":7.0,"interestCalculationMethod":"PERCENTAGE","returnSchedule":{"id":1,"scheduleName":"2 Week","scheduleInHour":336},"returnType":"PERIOD","totalReturnPeriods":26,"cancellationGracePeriodMinutes":0,"description":"Tiered returns for a range of investments.","createdAt":"2025-07-10T19:35:09.813798","updatedAt":"2025-07-10T19:35:09.813798","createdBy":"admin","updatedBy":"admin","currency":"USD","earlyExitPenalty":150.0,"termsAndConditionsUrl":"https://example.com/tc/dynamictier","active":true,"featured":false,"tradeable":true,"capitalReturned":true,"cancellable":false}
]};

const DEPOSIT_LIST = { content: [
  {"id":4,"txnRefId":"TRX250716035003816D5Z","amount":200.0,"linkedAccountId":null,"paymentGateway":"BINANCE","txnFee":0.0,"currencyCode":"INR","status":"SUCCESS","remarks":"Manual deposit approved","txnDate":"16 Jul Wed, 2025 3:50 AM"},
  {"id":3,"txnRefId":"TRX250716034904OCCIHL","amount":200.0,"linkedAccountId":null,"paymentGateway":"SYSTEM","txnFee":0.0,"currencyCode":"INR","status":"SUCCESS","remarks":"Deposit via SYSTEM","txnDate":"16 Jul Wed, 2025 3:49 AM"}
]};

const INVESTMENTS = { content: [
  {"investmentId":1,"schemaName":"Fixed 1-Year Plan","amountRange":"N/A","investedAmount":1000.0,"roiType":"PERCENTAGE","roiValue":6.5,"perPeriodProfit":65.0,"capitalBack":true,"capitalReturned":false,"currencyCode":"USD","totalPeriods":52,"completedPeriods":0,"remainingPeriods":52,"expectedReturn":4380.0,"receivedReturn":0.0,"profit":0.0,"totalEarningPotential":5380.0,"earlyExitPenalty":50.0,"nextReturnAmount":65.0,"subscribedAt":"2025-07-16T01:44:04.311816","nextPayoutDate":"2025-07-23T01:44:04.311816","maturityAt":"2026-07-15T01:44:04.311816","payoutFrequencyLabel":"Daily","investmentStatus":"ACTIVE","canCancelNow":false,"daysRemaining":363,"withdrawableNow":false},
  {"investmentId":2,"schemaName":"Dynamic Tiered Plan","amountRange":"₹1000 – ₹20000","investedAmount":1000.0,"roiType":"PERCENTAGE","roiValue":7.0,"perPeriodProfit":70.0,"capitalBack":true,"capitalReturned":false,"currencyCode":"USD","totalPeriods":26,"completedPeriods":0,"remainingPeriods":26,"expectedReturn":2820.0,"receivedReturn":0.0,"profit":0.0,"totalEarningPotential":3820.0,"earlyExitPenalty":150.0,"nextReturnAmount":70.0,"subscribedAt":"2025-07-16T03:41:08.623124","nextPayoutDate":"2025-07-30T03:41:08.623124","maturityAt":"2026-07-15T03:41:08.623124","payoutFrequencyLabel":"Daily","investmentStatus":"ACTIVE","canCancelNow":false,"daysRemaining":363,"withdrawableNow":false}
]};


const USER_BY_ID = {
    "id": 1,
    "username": "mockuser1",
    "firstname": "Mock",
    "lastname": "User1",
    "country": "INDIA",
    "email": "mock1@example.com",
    "mobile": "9876543210",
    "walletBalance": 1000,
    "profitBalance": 100,
    "referralCode": "REF1",
    "rankCode": "RANK_1",
    "kyc": {
        "kycId": 1,
        "email": null,
        "phone": null,
        "address": null,
        "documentType": "NATIONAL_ID",
        "emailVerifyStatus": "UNVERIFIED",
        "phoneVerifyStatus": "UNVERIFIED",
        "status": "PENDING",
        "kycRejectionReason": null
    },
    "accountStatus": {
        "accountStatus": "PENDING",
        "kycStatus": "PENDING",
        "emailVerifyStatus": "UNVERIFIED",
        "phoneVerifyStatus": "UNVERIFIED",
        "emailVerified": false,
        "phoneVerified": false,
        "kycVerified": false,
        "sendMoneyEnabled": false,
        "depositEnabled": false,
        "withdrawEnabled": false,
        "accountActive": false
    },
    "createdAt": "10 Jul Thu, 2025 12:52 PM"
}


const CONFIG_PROPERTIES = {
  propertySources: [
    {
      name: "database",
      source: {        
        "spring.sql.init.schema-locations": "classpath:schema.sql",
        "bonus.referral.calculation-type": "PERCENTAGE",
        "spring.sql.init.data-locations": "classpath:data.sql",
        "spring.datasource.driverClassName": "com.mysql.cj.jdbc.Driver",
        "mail.password": "apple banana mango orange",
        "spring.jpa.hibernate.ddl-auto": "create",
        "bonus.signup.flat-amount": "1001",
        "spring.sql.init.mode": "NEVER",
        "mail.host": "smtp.gmail.com",
        "transaction.service.url": "http://localhost:8080",
        "bonus.signup.enable": "true",
        "mail.from.address": "noreply@trustai.com",
        "mail.starttls.enable": "true",
        "mail.from.name": "Trust AI",
        "bonus.signup.calculation-type": "FLAT",
        "bonus.referral.percentage-rate": "20",
        "bonus.referral.enable": "true",
        "bonus.referral.flat-amount": "300",
        "mail.smtp.auth": "true",
        "spring.jpa.defer-datasource-initialization": "true",
        "logging.level.org.springframework.jdbc.datasource.init.ScriptUtils": "DEBUG",
        "spring.datasource.password": "password",
        "spring.jpa.show-sql": "false",
        "spring.datasource.username": "root",
        "mail.port": "587",
        "spring.datasource.url": "jdbc:mysql://localhost:3306/nft",
        "logging.level.org.springframework.jdbc.datasource.init": "DEBUG",
        "mail.username": "cloud.trustai@gmail.com",
      }
    }
  ]
};