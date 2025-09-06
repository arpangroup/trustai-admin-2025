import React from 'react';
import { FiUsers, FiUserCheck, FiUserX, FiSend, FiCheckSquare, FiAirplay, } from 'react-icons/fi';
import {
  LuLayoutDashboard, LuMegaphone, LuFileWarning, LuContact, LuUserCog, LuAlbum, LuAlarmClock, LuCast, LuAnchor, LuCreditCard, LuDoorOpen,
  LuWorkflow, LuCompass, LuColumns2, LuClipboardCheck, LuLandmark, LuWallet, LuPiggyBank,
  LuSettings2, LuAlignEndHorizontal, LuExpand, LuMedal, LuSettings,
  LuInbox, LuToyBrick, LuMessageCircle, LuBellRing, LuVolume2,
  LuLanguages,
  LuPalette, LuRollerCoaster, LuWarehouse, LuEgg,
  LuMail, LuMessageSquare,
  LuWrench, LuBraces, LuInfo,
  LuBan,
  // LuChevronDownCircle // ✅ replacing LuArrowDownCircle
} from "react-icons/lu";


const menuData = [
  {
    type: 'link',
    label: 'Dashboard',
    href: '/',
    icon: <LuLayoutDashboard />,
  },
  {
    type: 'sectionTitle',
    label: 'Customer Management',
  },
  {
    type: 'dropdown',
    label: 'Customers',
    icon: <FiUsers />,
    items: [
      { label: 'All Customers', href: '/users', icon: <FiUsers /> },
      { label: 'Active Customers', href: '/users/active', icon: <FiUserCheck /> },
      { label: 'Disabled Customers', href: '/users/disabled', icon: <FiUserX /> },
      // { label: 'Notifications', href: '/notifications', icon: <LuMegaphone /> },
      { label: 'Send Email to all', href: '/users/mail-send/all', icon: <FiSend /> }
    ],
  },
  {
    type: 'dropdown',
    label: 'KYC Management',
    icon: <FiCheckSquare />,
    items: [
      { label: 'Pending KYC', href: '/kyc/pending', icon: <FiAirplay /> },
      { label: 'Rejected KYC', href: '/kyc/rejected', icon: <LuFileWarning /> },
      { label: 'All KYC Logs', href: '/kyc', icon: <LuContact /> },
      // { label: 'KYC Form', href: '/kyc_forms', icon: <FiCheckSquare /> },
    ],
  },
  // {
  //   type: 'sectionTitle',
  //   label: 'Staff Management',
  // },
  // {
  //   type: 'link',
  //   label: 'Manage Roles',
  //   href: '/roles',
  //   icon: <LuContact />,
  // },
  // {
  //   type: 'link',
  //   label: 'Manage Staff',
  //   href: '#',
  //   icon: <LuUserCog />,
  // },
  {
    type: 'sectionTitle',
    label: 'Plans',
  },
  {
    type: 'dropdown',
    label: 'Manage Schema',
    icon: <LuAlbum />,
    items: [
      // { label: 'Schedule', href: '#', icon: <LuAlarmClock /> },
      { label: 'Investment Schemas', href: '/schemas', icon: <FiAirplay /> },
      { label: 'Stakes', href: '/schemas/stakes', icon: <FiAirplay /> },
    ],
  },

  {
    type: 'sectionTitle',
    label: 'Transactions',
  },
  {
    type: 'link',
    label: 'Transactions',
    href: '/transactions',
    icon: <LuCast />,
  },
  {
    type: 'link',
    label: 'Investments',
    href: '/investments',
    icon: <LuAnchor />,
  },

  {
    type: 'link',
    label: 'User Profits',
    href: '/users/profit',
    icon: <LuCreditCard />,
  },

  {
    type: 'sectionTitle',
    label: 'Essentials',
  },
  // {
  //   type: 'link',
  //   label: 'Automatic Gateways',
  //   href: '/payment/gateway',
  //   icon: <LuDoorOpen />,
  // },

  {
    type: 'dropdown',
    label: 'Deposits',
    icon: <LuWallet  />,
    items: [
      // { label: 'Automatic Methods', href: '/deposit/method/auto', icon: <LuWorkflow /> },
      // { label: 'Manual Methods', href: '/deposit/method/manual', icon: <LuCompass /> },
      { label: 'Pending Manual Deposits', href: '/deposit/pending', icon: <LuWallet /> },
      { label: 'Rejected Deposits', href: '/deposit/rejected', icon: <LuBan /> },
      { label: 'Deposit History', href: '/deposit/history', icon: <LuClipboardCheck /> },
    ],
  },

  {
    type: 'dropdown',
    label: 'Withdraw',
    icon: <LuLandmark />,
    items: [
      // { label: 'Automatic Methods', href: '/withdraw/method/auto', icon: <LuWorkflow /> },
      // { label: 'Manual Methods', href: '/withdraw/method/manual', icon: <LuCompass /> },
      { label: 'Pending Withdraws', href: '/withdraw/pending', icon: <LuWallet /> },
      { label: 'Withdraw Schedule', href: '/withdraw/schedule', icon: <LuAlarmClock /> },
      { label: 'Withdraw History', href: '/withdraw/history', icon: <LuPiggyBank /> },
    ],
  },


  // {
  //   type: 'dropdown',
  //   label: 'Manage Referral',
  //   icon: <LuSettings2 />,
  //   items: [
  //     { label: 'Multi Level Referral', href: '#', icon: <LuAlignEndHorizontal /> },
  //     { label: 'Targets Referral', href: '#', icon: <LuExpand /> }
  //   ],
  // },
  // {
  //   type: 'link',
  //   label: 'User Rankings',
  //   href: '/rankings',
  //   icon: <LuMedal />,
  // },
  {
    type: 'dropdown',
    label: 'User Rankings',
    icon: <LuMedal />,
    items: [
      { label: 'Rankings', href: '/rankings', icon: <LuAlarmClock /> },
    ],
  },
  



  {
    type: 'sectionTitle',
    label: ' Site Settings',
  },
  {
    type: 'dropdown',
    label: ' Settings',
    icon: <LuSettings />,
    items: [
      { label: 'Site Settings', href: '/setting/site', icon: <LuSettings2 /> },
      { label: 'Email Settings', href: '/setting/mail', icon: <LuInbox /> },
      { label: 'Plugin Settings', href: '/setting/plugin', icon: <LuToyBrick /> },
      { label: 'SMS Settings', href: '/setting/sms', icon: <LuMessageCircle /> },
      { label: 'Push Notification', href: '/setting/notification', icon: <LuBellRing /> },
      { label: 'Notification Tune', href: '/setting/tune', icon: <LuVolume2 /> }
    ],
  },



  // {
  //   type: 'link',
  //   label: 'Language Settings',
  //   href: '#',
  //   icon: <LuLanguages />,
  // },
  // {
  //   type: 'link',
  //   label: 'Page Settings',
  //   href: '#',
  //   icon: <LuLayoutDashboard />,
  // },

  // {
  //   type: 'sectionTitle',
  //   label: ' Site Essentials',
  // },
  // {
  //   type: 'dropdown',
  //   label: ' Theme Manage',
  //   icon: <LuPalette />,
  //   items: [
  //     { label: 'Site Theme', href: '#', icon: <LuRollerCoaster /> },
  //     { label: 'Dynamic Landing Theme', href: '#', icon: <LuWarehouse /> }
  //   ],
  // },
  // {
  //   type: 'dropdown',
  //   label: ' Landing Page',
  //   icon: <LuWarehouse />,
  //   items: [
  //     { label: 'Hero Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Schema Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Calculation Section', href: '#', icon: <LuEgg /> },
  //     { label: 'How it works Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Recent Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Why Choose Us Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Counter Section', href: '#', icon: <LuEgg /> },
  //     { label: 'FAQ Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Call To Action', href: '#', icon: <LuEgg /> },
  //     { label: 'Blog Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Gateway Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Newslatter Section', href: '#', icon: <LuEgg /> }
  //   ],
  // },
  // {
  //   type: 'dropdown',
  //   label: ' Pages',
  //   icon: <LuLayoutDashboard />,
  //   items: [
  //     { label: 'Hero Section', href: '#', icon: <LuEgg /> },
  //     { label: 'Schema', href: '#', icon: <LuEgg /> },
  //     { label: 'How It Works', href: '#', icon: <LuEgg /> },
  //     { label: 'About Us', href: '#', icon: <LuEgg /> },
  //     { label: 'FAQ', href: '#', icon: <LuEgg /> },
  //     { label: 'Rankings', href: '#', icon: <LuEgg /> },
  //     { label: 'Blog', href: '#', icon: <LuEgg /> },
  //     { label: 'Contact Us', href: '#', icon: <LuEgg /> },
  //     { label: 'Privacy Policy', href: '#', icon: <LuEgg /> },
  //     { label: 'Terms and Conditions', href: '#', icon: <LuEgg /> },
  //     { label: 'Login', href: '#', icon: <LuEgg /> },
  //     { label: 'Registration', href: '#', icon: <LuEgg /> },
  //     { label: 'Forgot Password', href: '#', icon: <LuEgg /> },
  //     { label: 'Add New Page', href: '#', icon: <LuEgg /> }
  //   ],
  // },

  {
    type: 'sectionTitle',
    label: 'Templates',
  },

  {
    type: 'link',
    label: 'Email Template',
    href: '/template/email',
    icon: <LuMail />,
  },
  {
    type: 'link',
    label: 'SMS Template',
    href: '/template/sms',
    icon: <LuMessageSquare />,
  },
  {
    type: 'link',
    label: 'Push Notification Template',
    href: '/template/notification',
    icon: <LuBellRing />,
  },


  {
    type: 'sectionTitle',
    label: 'Others',
  },

  {
    type: 'link',
    label: 'Support Tickets',
    href: '/tickets',
    icon: <LuWrench />,
  },

  {
    type: 'link',
    label: 'Custom CSS',
    href: '/custom-css',
    icon: <LuBraces />,
  },
  {
    type: 'link',
    label: 'Application Details 2.3',
    href: '#',
    icon: <LuInfo />,
  },


];


export default menuData;