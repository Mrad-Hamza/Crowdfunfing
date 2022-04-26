import React, { useState, useEffect } from "react";
import { Input, Textarea, SubmitButton } from "../User/Login/UserLogin/accountBox/common";
import { Marginer } from "../User/Login/UserLogin/marginer";
import { projectService } from "../../pages/User/_services/project.service";
import { useSelector, useDispatch } from "react-redux";
import { selectedProject, setTasks, setInvoiceProjects, setComplaintProjects } from "../../features/actions/projects.actions";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FileUpload } from "primereact/fileupload";
import axios from "axios";
import URL from "../../features/constants/services.constants";

const ProjectUpdate = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();

    // const projectById = projectService.getProjectById(_id);

    const project = useSelector((state) => state.project);
    console.log("🚀 ~ file: projectUpdate.js ~ line 21 ~ ProjectUpdate ~ project", project);
    const fetchProjectDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        console.log("project details", result);
        dispatch(selectedProject(result.data));
    };
    console.log("project :", project);
    const [projectById, setProjectById] = useState({});
    // state.compaign = _id;
    console.log(projectById);
    // const showResponse = (response) => {
    //     console.log(response);
    //     //call to a backend to verify against recaptcha with private key
    // };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "projectName") {
            setProjectById((prevState) => {
                return { ...prevState, projectName: value };
            });
        } else if (name === "projectDescription") {
            setProjectById((prevState) => {
                return { ...prevState, projectDescription: value };
            });
        } else if (name === "projectCollectedAmount") {
            setProjectById((prevState) => {
                return { ...prevState, projectCollectedAmount: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(projectById);
        if (projectById.projectName && projectById.projectDescription && projectById.projectCollectedAmount) {
            projectService.UpdateProject(projectById);
            history.push("/projects");
        }
    };

    const onUpload = (e) => {
        console.log(e.files[0]);
        setProjectById((prevState) => {
            return { ...prevState, image: e.files[0] };
        });
    };
    useEffect(() => {
        if (_id && _id !== "") {
            console.log("id", _id);
            fetchProjectDetails();
            console.log("🚀 ~ file: projectUpdate.js ~ line 74 ~ useEffect ~   fetchProjectDetails();", fetchProjectDetails());
        }
    }, [_id]);

    useEffect(() => {
        console.log("hello");
        if (project && Object.keys(project).length > 0) {
            setProjectById({ id: _id, projectName: project.projectName, projectDescription: project.projectDescription, projectCollectedAmount: project.projectCollectedAmount, image: project.image });
        }
    }, [project, _id]);

    return (
        <div>
            <div>
                <div className="form-style-5 col-6">
                    <h3>Creat New Project</h3>
                    {projectById && Object.keys(projectById).length > 0 && (
                        <form>
                            <div className="form-group">
                                <label>Name: </label>
                                <Input id="projectName" name="projectName" value={projectById.projectName} type="text" placeholder="Name" onChange={handleChange} className="mb-2" />
                            </div>
                            <div className="form-group">
                                <label>Description: </label>
                                <Textarea id="projectDescription" name="projectDescription" value={projectById.projectDescription} placeholder="Description" onChange={handleChange} className="mb-2" />
                            </div>
                            <div className="form-group">
                                <label>Collected amount: </label>
                                <Input id="projectCollectedAmount" name="projectCollectedAmount" value={projectById.projectCollectedAmount} type="number" placeholder="Collected amount" onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Collected amount: </label>
                                <FileUpload name="demo[]" customUpload={true} uploadHandler={onUpload} multiple accept="image/png" maxFileSize={1000000} />
                            </div>
                            <div className="form-group">
                                <Marginer direction="vertical" margin={10} />
                                <SubmitButton type="submit" onClick={handleSubmit}>
                                    Update project
                                </SubmitButton>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectUpdate;
