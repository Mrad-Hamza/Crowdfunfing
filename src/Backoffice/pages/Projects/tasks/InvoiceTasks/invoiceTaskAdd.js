import React, { useState } from "react";
import { Input, SubmitButton } from "../../../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../../../User/Login/UserLogin/marginer";
import { InvoiceProjectService } from "../../../User/_services/invoiceProject.service";
import { useParams, useHistory } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import "./invoiceTask.css";
import { InvoiceTaskService } from "../../../User/_services/invoiceTask.service";

function InvoiceTaskAdd(props) {
    const { _id } = useParams();
    let history = useHistory();

    const [state, setState] = useState({ invoiceName: "", invoiceFile: "", task: _id, user: localStorage.getItem("currentUserId") });
    console.log(state);
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "invoiceName") {
            setState((prevState) => {
                return { ...prevState, invoiceName: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(state);
        if (state.invoiceName && state.task && state.user) {
            InvoiceTaskService.addInvoice(state);
            history.push(`/projects/task/${_id}`);
        }
    };

    const onUpload = (e) => {
        console.log(e.files[0]);
        setState((prevState) => {
            return { ...prevState, invoiceFile: e.files[0] };
        });
    };

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Create New Invoice Task</h3>
                    <form>
                        <div className="form-group">
                            <label>Name: </label>
                            <Input id="invoiceName" name="invoiceName" type="text" placeholder="Name" onChange={handleChange} className="mb-2" />
                        </div>

                        <div className="form-group">
                            <label>Invoice file: </label>
                            <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
                        </div>
                        <div className="form-group">
                            <Marginer direction="vertical" margin={10} />
                            <SubmitButton type="submit" onClick={handleSubmit}>
                                Add new invoice
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default InvoiceTaskAdd;
