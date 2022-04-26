import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { projectService } from "./projectService";

const ProjectComponent = () => {
    const projects = useSelector((state) => state.projects.projects);

    const renderList = projects.map((project) => {
        const deleteProject = () => {
            projectService.delete(project._id);
           // window.location.reload(false);
        };
        const { _id, projectName, image } = project;
        return (
            <div className="xs:col-12 md:col-8 lg:col-3 projectComponent " key={_id}>
                <div className="card m-3 border-1 surface-border shadow-4">
                    <div className="text-center">
                        <img className="w-9 shadow-2 my-3 mx-0" src={require("../../../assets/layout/images/" + image)} />
                        <div className="text-xl font-bold mb-3"> {projectName}</div>
                        <div className="d-flex col-12 button-container">
                        </div>
                    </div>
                </div>
            </div>
        );
    });

    return renderList;
};

export default ProjectComponent;
