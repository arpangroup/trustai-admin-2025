import PageTitle from "../../components/page_title/PageTitle";
import SendEmailPanel from "../users/SendEmailPanel";

export default function SendEmail() {
    return (
        <div className="main-content">
            <PageTitle 
                title="Send Notification to All" 
                subtitle="<small>Notification will be sent to all <b>ACTIVE</b> members only</small>"
            />


            <div className="container-fluid">
                <div className="row">
                    <SendEmailPanel sendToAll={true} />
                </div>
            </div>
        </div>
    )
}