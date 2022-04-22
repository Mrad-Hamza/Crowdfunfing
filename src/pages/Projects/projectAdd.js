import React, { useState } from "react";
import { BoxContainer, FormContainer, Input, SubmitButton } from "../User/Login/UserLogin/accountBox/common";
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
            <h3>Creat New Project</h3>
            <div className="form-group col-6 add-form">
                <BoxContainer>
                    <FormContainer>
                        <Input id="projectName" name="projectName" type="text" placeholder="Name" onChange={handleChange} className="mb-2" />
                        <Input id="projectDescription" name="projectDescription" type="text" placeholder="Description" onChange={handleChange} className="mb-2" />
                        <Input id="projectCollectedAmount" name="projectCollectedAmount" type="number" placeholder="Collected amount" onChange={handleChange} />
                    </FormContainer>
                    <Marginer direction="vertical" margin={10} />
                    <SubmitButton type="submit" onClick={handleSubmit}>
                        Add new project
                    </SubmitButton>
                </BoxContainer>
            </div>
        </div>
    );
}

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Button } from "primereact/button";
// import { useSelector, useDispatch } from "react-redux";
// import { useParams } from "react-router-dom";
// import { selectedCompaign } from "../../features/actions/projects.actions";
// // import { setTasks, setInvoiceProjects, setComplaintProjects } from "../../features/actions/projects.actions";
// import URL from "../../features/constants/services.constants";
// import axios from "axios";
// import "./projects.css";

// const ProjectAdd = () => {
//     // const dispatch = useDispatch();
//     const [projectData, setProjectData] = useState(""  );
//         // { projectName: "", projectDescription: "", projectCollectedAmount: 0 }

//     console.log("projectData", projectData);
//     const { _id } = useParams();
//     const handleProjectData = (e) => {
//         console.log(e);
//         const { name, value } = e.target;
//         setProjectData()
//         // setProjectData((state) => ({
//         //     ...state,
//         //     [name]: value,
//         // }));
//     };
//     // Add project id to the body
//     useEffect(() => {
//         if (_id && _id !== "") {
//             setProjectData((state) => ({
//                 ...state,
//                 compaign: _id,
//             }));
//         }
//     }, [_id]);

//     const addProject = async () => {
//         const result = await axios
//             .post(URL.baseApiUrl + URL.projects.addProject, projectData)
//             .then((res) => {
//                 console.log("project added!");
//             })
//             .catch((err) => {
//                 console.log(err);
//             });

//         return result;
//     };

//     return (
//         <div onClick={() => console.log("hello")}>
//             <h3>Creat New Project</h3>
//             <form>
//                 <div className="form-group">
//                     <label>Project name: </label>
//                     <input type="text" required className="fp" name="projectName" value={projectData.projectName} onChange={(e) => handleProjectData(e)} />
//                 </div>

//                 <div className="form-group">
//                     <label>Description: </label>
//                     <input type="text" required className="k" name="projectDescription" value={projectData.projectDescription} onChange={(e) => handleProjectData(e)} />
//                 </div>

//                 <div className="form-group">
//                     <label>project CollectedAmount: </label>
//                     <input type="number" required className="l" name="projectCollectedAmount" value={projectData.projectCollectedAmount} onChange={(e) => handleProjectData(e)} />
//                 </div>
//                 <div className="form-group">
//                     <button onClick={() => console.log("hello")}>test</button>
//                     {/* <input type="submit" value="ADD" className="btn btn-primary" onSubmit={() => console.log("here")} /> */}
//                     {/* <Button icon="pi pi-trash" className="button ml-1 col-5" label="Add" onClick={() => console.log("here")} /> */}
//                 </div>
//             </form>
//         </div>
//         // <div>
//         //     <div>
//         //         <div className="form-style-5">
//         //             <h3>Creat New Project</h3>
//         //             <form>
//         //                 <div className="form-group">
//         //                     <label>Project name: </label>
//         //                     <input type="text" required className="fp" name="projectName" value={projectData.projectName} onChange={(e) => handleProjectData(e)} />
//         //                 </div>

//         //                 <div className="form-group">
//         //                     <label>Description: </label>
//         //                     <input type="text" required className="k" name="projectDescription" value={projectData.projectDescription} onChange={(e) => handleProjectData(e)} />
//         //                 </div>

//         //                 <div className="form-group">
//         //                     <label>project CollectedAmount: </label>
//         //                     <input type="number" required className="l" name="projectCollectedAmount" value={projectData.projectCollectedAmount} onChange={(e) => handleProjectData(e)} />
//         //                 </div>
//         //                 <div className="form-group">
//         //                     <button onClick={() => console.log("hello")}>test</button>
//         //                     {/* <input type="submit" value="ADD" className="btn btn-primary" onSubmit={() => console.log("here")} /> */}
//         //                     {/* <Button icon="pi pi-trash" className="button ml-1 col-5" label="Add" onClick={() => console.log("here")} /> */}
//         //                 </div>
//         //             </form>
//         //         </div>
//         //     </div>
//         //     {/* )} */}
//         // </div>
//     );
// };

export default ProjectAdd;
