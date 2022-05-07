import React, { useState } from "react";
import { Input, SubmitButton, Textarea } from "../../../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../../../User/Login/UserLogin/marginer";
import { useParams, useHistory } from "react-router-dom";
import "../../InvoiceProjects/invoice.css";
import { ComplaintTaskService } from "../../../User/_services/complaintTask.service";

function ComplaintTaskAdd(props) {
    const { _id } = useParams();
    let history = useHistory();

    const [state, setState] = useState({ complaintTaskTitle: "", complaintDescription: "", task: _id, user: localStorage.getItem("currentUserId") });
    state.project = _id;
    console.log(state);
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "complaintTaskTitle") {
            setState((prevState) => {
                return { ...prevState, complaintTaskTitle: value };
            });
        } else if (name === "complaintDescription") {
            setState((prevState) => {
                return { ...prevState, complaintDescription: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(state);
        if (state.complaintTaskTitle && state.complaintDescription && state.task && state.user) {
            ComplaintTaskService.addComplaint(state);
            history.push(`/projects/task/${_id}`);
        }
    };

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Creat New Complaint Task</h3>
                    <form>
                        <div className="form-group">
                            <label>Title: </label>
                            <Input id="complaintTaskTitle" name="complaintTaskTitle" type="text" placeholder="Problem title" onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <label>Problem: </label>
                            <Textarea id="complaintDescription" name="complaintDescription" placeholder="Problem description " onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <Marginer direction="vertical" margin={10} />
                            <SubmitButton type="submit" onClick={handleSubmit}>
                                Add new complaint
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ComplaintTaskAdd;
