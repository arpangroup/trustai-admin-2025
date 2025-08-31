
import { LuTrash } from "react-icons/lu";

export default function FieldOptionRow({ onRemove  }) {
    return (
        <>
            <div class="mb-4">
                <div class="option-remove-row row">
                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="site-input-groups">
                            <input name="fields[1][name]" class="box-input"
                                type="text" value="Enter PAN Number" required
                                placeholder="Field Name" />
                        </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="site-input-groups">
                            <select name="fields[1][type]"
                                class="form-select form-select-lg mb-3">
                                <option value="text"
                                    selected >Input Text</option>
                                <option value="textarea"
                                >Textarea</option>
                                <option value="file"
                                >File upload</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-xl-3 col-lg-6 col-md-6 col-sm-6 col-12">
                        <div class="site-input-groups mb-0">
                            <select name="fields[1][validation]"
                                class="form-select form-select-lg mb-1">
                                <option value="required"
                                    selected >Required</option>
                                <option value="nullable"
                                >Optional</option>
                            </select>
                        </div>
                    </div>

                    <div class="col-xl-1 col-lg-6 col-md-6 col-sm-6 col-12">
                        <button 
                        class="delete-option-row delete_desc" 
                        type="button"
                        onClick={onRemove}>
                            <LuTrash />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}