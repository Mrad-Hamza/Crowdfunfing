import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { projectService } from "./projectService";
import "./projects.css";
import logo from "../../assets/layout/images/project-logo.png";

const DeletedProjectComponent = () => {
    const projects = useSelector((state) => state.projects.projects);

    const renderList = projects.map((project) => {
        const activateUser = () => {
            projectService.activate(project._id);
        };
        const { _id, projectName, image } = project;
        return (
            <div className="col-12 md:col-2 lg:col-3 projectComponent" key={_id}>
                <div className="card m-3 border-1 surface-border">
                    <div className="text-center">
                        <img className="w-9 shadow-2 my-3 mx-0" src={require("../../assets/layout/images/" + image)} />
                        <div className="text-xl font-bold mb-3"> {projectName}</div>
                        <div className="flex align-items-center justify-content-between">
                            <div className="d-flex col-12 button-container">
                                <div className="row col-12">
                                    <Button icon="pi pi-undo" className="button" label="Activate" onClick={activateUser}/>
                                </div>
                            </div>
                            {/* <Button icon="pi pi-shopping-cart" /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return renderList;
};

export default DeletedProjectComponent;
