import React, { useState } from "react";
import { Input, SubmitButton, Textarea } from "../../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../../User/Login/UserLogin/marginer";
import { InvoiceProjectService } from "../../User/_services/invoiceProject.service";
import { useParams, useHistory } from "react-router-dom";

import "./invoice.css";

function TaskProjectAdd(props) {
    const { _id } = useParams();
    let history = useHistory();

    const [state, setState] = useState({ taskName: "", taskDescription: "", project: _id, user: localStorage.getItem("currentUserId") });
    state.project = _id;
    console.log(state);
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "taskName") {
            setState((prevState) => {
                return { ...prevState, taskName: value };
            });
        } else if (name === "taskDescription") {
            setState((prevState) => {
                return { ...prevState, taskDescription: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(state);
        if (state.taskName && state.taskDescription && state.project && state.user) {
            TaskProjectService.addTask(state);
            // history.push(`/projects/${_id}`);
        }
    };

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Creat New Complaint</h3>
                    <form>
                        <div className="form-group">
                            <label>Task title: </label>
                            <Input id="taskName" name="taskName" type="text" placeholder="Task title" onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <label>Description </label>
                            <Textarea id="taskDescription" name="taskDescription" placeholder="Task description " onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <Marginer direction="vertical" margin={10} />
                            <SubmitButton type="submit" onClick={handleSubmit}>
                                Add new Task
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default TaskProjectAdd;
