import PageTitle from "../../components/page_title/PageTitle";
import SendEmailPanel from "../users/SendEmailPanel";

export default function SendEmail() {
    return (
        <div className="main-content">
            <PageTitle title="Send Email to All" />


            <div class="container-fluid">
                <div class="row">
                    <SendEmailPanel isAllEmail={true} />
                </div>
            </div>
        </div>
    )
}