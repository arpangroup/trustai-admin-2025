import { LuMail, LuUserPlus, LuWallet } from "react-icons/lu";
import RightPanel from "../../components/panel/RightPanel";
import SendEmailPanel from "./SendEmailPanel";
import { useState } from "react";

const buttons = [
  {
    id: "tooltip-mail",
    Icon: LuMail,
    colorClass: "blue-btn",
    tooltip: "Send Mail",
    action: "sendMail",
  },
  {
    id: "tooltip-login",
    Icon: LuUserPlus,
    colorClass: "red-btn",
    tooltip: "Login As User",
    action: "loginAsUser",
  },
  {
    id: "tooltip-fund",
    Icon: LuWallet,
    colorClass: "primary-btn",
    tooltip: "Fund Add or Subtract",
    action: "fundUpdate",
  },
];

const ButtonsWithTooltips = ({onButtonClick }) => {
  return (
  <div className="btns">
    {buttons.map(({ id, Icon, colorClass, tooltip, action }) => (
      <span className="tooltip-wrapper" key={id}>
        <a type="button" className={`site-btn-round ${colorClass}`} aria-describedby={id} 
            onClick={() => onButtonClick(action)}>
          <Icon />
        </a>
        <span id={id} className="custom-tooltip">
          {tooltip}
        </span>
      </span>
    ))}
  </div>
  );
};

export default ButtonsWithTooltips;
