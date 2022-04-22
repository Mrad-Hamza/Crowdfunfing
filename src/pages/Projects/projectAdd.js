import React, { useState } from "react";
import { BoxContainer, FormContainer, Input, Textarea, SubmitButton } from "../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../User/Login/UserLogin/marginer";
import { projectService } from "../../pages/User/_services/project.service";
import { useParams } from "react-router-dom";

function ProjectAdd(props) {
    const { _id } = useParams();
    const [state, setState] = useState({ projectName: "", projectDescription: "", projectCollectedAmount: "", compaign: _id });
    state.compaign = _id;
    const showResponse = (response) => {
        console.log(response);
        //call to a backend to verify against recaptcha with private key
    };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "projectName") {
            setState((prevState) => {
                return { ...prevState, projectName: value };
            });
        } else if (name === "projectDescription") {
            setState((prevState) => {
                return { ...prevState, projectDescription: value };
            });
        } else if (name === "projectCollectedAmount") {
            setState((prevState) => {
                return { ...prevState, projectCollectedAmount: value };
            });
        } else if (name === "compaign") {
            setState((prevState) => {
                return { ...prevState, _id };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(state);
        if (state.projectName && state.projectDescription && state.projectCollectedAmount && state.compaign) {
            projectService.addProject(state);
        }
    };

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Creat New Project</h3>
                    <form>
                        <div className="form-group">
                            <label>Name: </label>
                            <Input id="projectName" name="projectName" type="text" placeholder="Name" onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <Textarea id="projectDescription" name="projectDescription" placeholder="Description" onChange={handleChange} className="mb-2" />
                        </div>
                        <div className="form-group">
                            <label>Project name: </label>
                            <Input id="projectCollectedAmount" name="projectCollectedAmount" type="number" placeholder="Collected amount" onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <Marginer direction="vertical" margin={10} />
                            <SubmitButton type="submit" onClick={handleSubmit}>
                                Add new project
                            </SubmitButton>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ProjectAdd;
