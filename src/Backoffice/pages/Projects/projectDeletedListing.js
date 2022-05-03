import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";
import DeletedProjectComponent from "./deletedprojectComponent";
import { setProjects } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.constants";
import "./projects.css";
//import ProjectService from "../../features/services/ProjectService";
import axios from "axios";

const ProjectDeletedListing = () => {
    const projects = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchProjects = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fectchDeletedProjects).catch((err) => {
            console.log("Err", err);
        });
        console.log("🚀 ~ file: ProjectDeletedListing.js ~ line 17 ~ fectchDeletedProjects ~ result", result);
        dispatch(setProjects(result.data));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    console.log("Projects:", projects);

    return (
        <div>
            <div style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                <Grid container className="projects-list-container" columns={{ xs: 4, md: 12 }}>
                    <DeletedProjectComponent />
                </Grid>
            </div>
        </div>
    );
};

export default ProjectDeletedListing;
