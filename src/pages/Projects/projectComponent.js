import * as React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import "./projects.css";
import logo from "../../assets/layout/images/project-logo.png";

const ProjectComponent = () => {
    const projects = useSelector((state) => state.projects.projects);
    const renderList = projects.map((project) => {
        const { _id, projectName, projectDescription, projectCollectedAmount, image } = project;
        return (
            <div className="col-12 md:col-2 lg:col-3" key={_id}>
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between"></div>
                    <div className="text-center">
                        <img className="w-9 shadow-2 my-3 mx-0" src={logo} />
                        <div className="text-xl font-bold mb-3"> {projectName}</div>
                        <Link to={`/projects/${_id}`}>
                            <div className="text font-semibold">
                                {projectDescription} : {projectCollectedAmount}DT
                            </div>
                        </Link>
                    </div>
                    {/* <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-star-fill" label="I'm Interested" />
                        <Button icon="pi pi-share-alt" />

                        {/* <Button icon="pi pi-shopping-cart" /> */}
                    {/* </div> */}
                </div>
            </div>
        );
    });

    return renderList;
};

export default ProjectComponent;
