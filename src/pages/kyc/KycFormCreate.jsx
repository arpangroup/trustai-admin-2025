import PageTitle from "../../components/page_title/PageTitle";
import { LuTrash } from "react-icons/lu";
import FieldOptionRow from "./FieldOptionRow";
import { useState } from "react";
import { LuCornerDownLeft } from "react-icons/lu";
import { useNavigate } from "react-router";

export default function KycFormCreate() {
  const navigate = useNavigate();
  const [fieldOptions, setFieldOptions] = useState([0, 1]); // initial two rows

    // handler to add new field option
    const addFieldOption = (e) => {
        e.preventDefault(); // prevent anchor default behavior
        setFieldOptions((prev) => [...prev, prev.length]); // add new index
    };

    // Remove handler: remove option by key
    const removeFieldOption = (keyToRemove) => {
        setFieldOptions((prev) => prev.filter((key) => key !== keyToRemove));
    };


    return (
        <div className="main-content">
            <div class="page-title">
                <div class="container-fluid">
                    <div class="row justify-content-center">
                        <div class="col-xl-8">
                            <div class="title-content">
                                <h2 class="title">Add New KYC Form</h2>
                                <a 
                                    onClick={(e) => {e.preventDefault(); navigate(-1);}}
                                    class="title-btn">
                                        <LuCornerDownLeft/>
                                        <span>Back</span>
                                    </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-xl-8 col-lg-12 col-md-12 col-12">
                        <div class="site-card">
                            <div class="site-card-body">
                                <form action="#" method="post" class="row">
                                    <input type="hidden" name="_method" value="PUT" />
                                    <input type="hidden" name="_token" value="fgpBEaTjxA9GoVm7n9MYp7N9YkJPVyAJOjsqLTxo" />
                                    <div class="col-xl-12">
                                        <div class="site-input-groups">
                                            <label class="box-input-label" for="">Name:</label>
                                            <input type="text" name="name" value="PAN Verify"
                                                class="box-input" placeholder="KYC Type Name" required />
                                        </div>
                                    </div>

                                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-12 col-12">
                                        <a 
                                            onClick={addFieldOption}
                                            href="#" 
                                            id="generate"
                                            class="site-btn-xs primary-btn mb-3">Add Field option</a>
                                    </div>

                                    <div className="addOptions">
                                        {fieldOptions.map((key) => (
                                            <FieldOptionRow 
                                                key={key}
                                                id={key} 
                                                onRemove={() => removeFieldOption(key)}/>
                                        ))}
                                    </div>

                                    <div class="col-xl-12">
                                        <div class="row">
                                            <div class="col-xl-4 col-lg-4 col-md-6 col-sm-6">
                                                <div class="site-input-groups">
                                                    <label class="box-input-label" for="">Status:</label>
                                                    <div class="switch-field">
                                                        <input
                                                            type="radio"
                                                            id="active-status"
                                                            name="status"
                                                            checked value="1"
                                                        />
                                                        <label for="active-status">Active</label>
                                                        <input
                                                            type="radio"
                                                            id="deactivate-status"
                                                            name="status"
                                                            value="0"
                                                        />
                                                        <label for="deactivate-status">Deactivate</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-xl-12">
                                        <button type="submit" class="site-btn primary-btn w-100">
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}