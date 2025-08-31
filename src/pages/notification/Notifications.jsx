import PageTitle from "../../components/page_title/PageTitle";
import { LuCheck } from "react-icons/lu";
import SingleNotificationList from "./SingleNotificationList";
import {notifications} from '../../data/notificationData';

export default function Notifications() {
  const ActionLink = (props) => {
    return (
      <a href="#"
        onClick={(e) => {
          e.preventDefault();
        }}
        class="title-btn">
        <LuCheck />
        <span> Mark all read</span>
      </a>
    );
  };


  return (
    <div className="main-content">
      <PageTitle
        title="All Notifications"
        actionLink={<ActionLink />}
      />


      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-12">
              <div className="site-card">
                <div className="site-card-body">
                  <div className="notification-list">
                    {notifications.map((it) => (
                      <SingleNotificationList key={it.id} notification={it} />
                    ))}
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>



    </div>
  )
}