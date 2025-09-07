import ReactDOM from 'react-dom';

const WithdrawApproveForm = ({ isOpen, onClose, userId, depositRequestId }) => {
    return (
        <>

            <ul class="list-group mb-4">
                <li class="list-group-item">
                    UPI BANK ACCOUNT:  <strong>oaaoaosjwn27646ybl</strong>
                </li>
            </ul>

            <form action="#" method="post">
                <input type="hidden" name="_token" value="6uNwVKwHHRc8JgwVXPyPPcMCbWrA8kRaWXOJrYqQ" />
                <input type="hidden" name="id" value="188" />

                <div class="site-input-groups">
                    <label for="" class="box-input-label">Details Message(Optional)</label>
                    <textarea name="message" class="form-textarea mb-0" placeholder="Details Message"></textarea>
                </div>

                <div class="action-btns">
                    <button type="submit" name="approve" value="yes" class="site-btn-sm primary-btn me-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="check" icon-name="check" class="lucide lucide-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Approve
                    </button>
                    <button type="submit" name="reject" value="yes" class="site-btn-sm red-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="x" icon-name="x" class="lucide lucide-x"><path d="M18 6 6 18"></path><path d="m6 6 12 12"></path></svg>
                        Reject
                    </button>
                </div>

            </form>

        </>
    );
}

export default WithdrawApproveForm;