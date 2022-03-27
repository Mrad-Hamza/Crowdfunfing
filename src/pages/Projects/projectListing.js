import React, { useEffect } from "react";
import Grid from "@mui/material/Grid";
import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import ProjectComponent from "./projectComponent";
import { setProjects } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.constants";
import "./projects.css";
//import ProjectService from "../../features/services/ProjectService";
import axios from "axios";

const ProjectListing = () => {
    const projects = useSelector((state) => state);
    const dispatch = useDispatch();

    const fetchProjects = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects).catch((err) => {
            console.log("Err", err);
        });
        console.log("🚀 ~ file: projectListing.js ~ line 17 ~ fetchProjects ~ result", result);
        dispatch(setProjects(result.data));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    console.log("Projects:", projects);

    return (
        <div>
            {/* <div className=" container">
                ProjectListing
                <button type="submit" name="add new project">
                    add new project
                </button>
            </div>
            <div>

            </div> */}
            <Grid container className="projects-list-container" columns={{ xs: 4, md: 12 }}>
                <ProjectComponent />
            </Grid>
            <Pagination count={10} variant="outlined" color="primary" />
        </div>
    );
};

export default ProjectListing;
