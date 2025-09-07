import React, { useState } from "react";
import { LuSettings2, LuMail, LuTrash } from "react-icons/lu";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css"; // Add your preferred theme
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { themeBalham } from 'ag-grid-community';

import PageTitle from "../../components/page_title/PageTitle";
import { NavLink } from "react-router-dom";
import RightPanel from "../../components/panel/RightPanel";
import PaypalSetting from "./PaypalSetting";
ModuleRegistry.registerModules([AllCommunityModule]);

import { LogoRenderer } from "./LogoRenderer";

import StripeIcon from "../../assets/icons/stripe.png";

const iconImports = import.meta.glob('../../assets/icons/*.{png,jpg,jpeg,svg}', { eager: true });
const iconsMap = {};
for (const path in iconImports) {
  const fileName = path.split('/').pop().split('.')[0].toLowerCase(); // "stripe.png" → "stripe"
  iconsMap[fileName] = iconImports[path].default;
}

const styleActionButtonEdit = {
  background: "#ef476f",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "50%",
  marginRight: "3px",
  color: "#ffffff",
  display: "inline-block",
  textAlign: "center",
  color: "#ffffff",
  background: "#5e3fc9",
};



const styleActionButtonDelete = {
  background: "#ef476f",
  width: "30px",
  height: "30px",
  lineHeight: "30px",
  borderRadius: "50%",
  marginRight: "3px",
  color: "#ffffff",
  display: "inline-block",
  textAlign: "center",
  color: "#ffffff",
  background: "#ef476f",
};

const PaymentGateway = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedGateway, setSelectedGateway] = useState(false);

  const ActionLink = (props) => {
    return (
      <>
        <button class="round-icon-btn primary-btn" 
          type='button' 
          onClick={() => handleManageGateway(props.data)}>
          <LuSettings2 />
        </button>
      </>
    );
  };


  const Badge = ({ value }) => {
    if (!value) return null;

    const normalizedValue = value.toLowerCase();

    let badgeType = '';
    switch (normalizedValue) {
      case 'pending':
      case 'unverified':
      case 'deactivated':
        badgeType = 'pending';
        break;
      case 'verified':
      case 'success':
      case 'active':
      case 'activated':
        badgeType = 'success';
        break;
      case 'deactivated':
      case 'inactive':
        badgeType = 'danger';
        break;
      default:
        badgeType = 'default';
        break;
    }

    return (
      <div className={`site-badge ${badgeType}`}>
        {value}
      </div>
    );
  };

  const closePanel = () => {
    setIsPanelOpen(false);
  };

  const handleManageGateway = (data) => {
    console.log("GATEWAY: ", data);
    const {id, name} = data;
    setSelectedGateway(name);
    setIsPanelOpen(true);
  }



  const Avatar = (props) => {
    const rowIndex = props.node?.rowIndex ?? 0;
    const colorIndex = rowIndex % 10;

    const fullName = props.data?.user ?? '';
    const nameParts = fullName.trim().split(' ');
    const initials = nameParts
      .slice(0, 2) // only take the first 2 words
      .map(part => part.charAt(0).toUpperCase())
      .join('');

    return (
      <span className={`avatar-text color-${colorIndex}`}>
        {initials || '?'}
      </span>
    );
  };

  const [rowData] = useState([
    { id: "1", name: "Paypal", supportedCurrency: "30", withdrawsAvailable: "Yes", status: "Deactivated", logo: iconsMap["paypal"] || ""},
    { id: "2", name: "Stripe", supportedCurrency: "16", withdrawsAvailable: "No", status: "Activated", logo: StripeIcon},
    { id: "3", name: "Mollie", supportedCurrency: "17", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["mobile"] || ""},
    { id: "4", name: "Perfect Money ", supportedCurrency: "4", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["perfectmoney"] || ""},
    { id: "5", name: "Coinbase", supportedCurrency: "12", withdrawsAvailable: "Ye", status: "Activated", logo: iconsMap["coinbase"] || ""},
    { id: "6", name: "Paystack", supportedCurrency: "10", withdrawsAvailable: "NoNo", status: "Activated", logo: iconsMap["paystack"] || ""},
    { id: "7", name: "Voguepay", supportedCurrency: "10", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["voguepay"] || ""},
    { id: "8", name: "Flutterwave", supportedCurrency: "14", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["flutterwave"] || ""},
    { id: "9", name: "CoinGate", supportedCurrency: "11", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["coingate"] || ""},
    { id: "10", name: "Monnify", supportedCurrency: "1", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["monnify"] || ""},
    { id: "11", name: "SecurionPay", supportedCurrency: "10", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["securionpay"] || ""},
    { id: "12", name: "CoinPayments", supportedCurrency: "70", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["coinpayments"] || ""},
    { id: "13", name: "Nowpayments", supportedCurrency: "20", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["nowpayments"] || ""},
    { id: "14", name: "Coinremitter", supportedCurrency: "2", withdrawsAvailable: "Yes", status: "Activated", logo: iconsMap["coinremitter"] || ""},
    { id: "15", name: "Cryptomus", supportedCurrency: "17", withdrawsAvailable: "Yes", status: "Activated", logo: iconsMap["cryptomus"] || ""},
    { id: "16", name: "Paymongo", supportedCurrency: "9", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["paymongo"] || ""},
    { id: "17", name: "Btcpayserver", supportedCurrency: "10", withdrawsAvailable: "No", status: "Activated", logo: iconsMap["btcpayserver"] || ""}
  ]);

  const [colDefs] = useState([
    { field: "logo", cellRenderer: LogoRenderer, width: 100, resizable: false, sortable: false, filter: false, suppressSizeToFit: true },
    { field: "name", width: 150, filter: true, filterParams: {} },
    { field: "withdrawsAvailable"},
    { field: "status", width: 160, cellRenderer: Badge },
    { field: "manage", cellRenderer: ActionLink },
  ]);

  const defaultColDef = {
    // flex: 1,    
    minWidth: 80,
    resizable: true,
  };

  return (
    <div className="main-content">
      <PageTitle title="Payment Gateway" />

      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
            <div className="site-card">
              <div className="site-card-body table-responsive">
                <div className="site-datatable">
                  <div style={{ height: 500 }} className="ag-theme-alpine">
                    <AgGridReact
                      theme={"legacy"}
                      rowData={rowData}
                      columnDefs={colDefs}
                      defaultColDef={defaultColDef}
                      rowHeight={60}
                      pagination={true} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RightPanel isOpen={isPanelOpen} onClose={() => setIsPanelOpen(false)}>
        <h2>{`${selectedGateway} Credential Edit`}</h2>
        <PaypalSetting/>
      </RightPanel>

    </div>
  );
};

export default PaymentGateway;
