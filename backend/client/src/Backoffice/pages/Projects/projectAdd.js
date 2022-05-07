import React, { useState } from "react";
import { Input, Textarea, SubmitButton } from "../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../User/Login/UserLogin/marginer";
import { projectService } from "../../pages/User/_services/project.service";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";

function ProjectAdd(props) {
    const { _id } = useParams();
    let history = useHistory();

    const [state, setState] = useState({ projectName: "", projectDescription: "", projectCollectedAmount: "", compaign: _id, image: "bg.png", user: localStorage.getItem("currentUserId"), userMail: localStorage.getItem("currentMailAddress") });
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
            history.push("/projects");
        }
    };

    const onUpload = (e) => {
        console.log(e.files[0]);
        setState((prevState) => {
            return { ...prevState, image: e.files[0] };
        });
    };

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Create New Project</h3>
                    <form>
                        <div className="form-group">
                            <label>Name: </label>
                            <Input id="projectName" name="projectName" type="text" placeholder="Name" onChange={handleChange} className="ml-1" />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <Textarea id="projectDescription" name="projectDescription" placeholder="Description" onChange={handleChange} className="ml-1" />
                        </div>
                        <div className="form-group">
                            <label>Collected amount: </label>
                            <Input id="projectCollectedAmount" name="projectCollectedAmount" type="number" placeholder="Collected amount" onChange={handleChange} className="ml-1" />
                        </div>
                        <div className="form-group">
                            <label>Project logo: </label>
                            <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
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
