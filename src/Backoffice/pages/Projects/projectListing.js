import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
// import Pagination from "@mui/material/Pagination";
import { useSelector, useDispatch } from "react-redux";
import ProjectComponent from "./projectComponent";
import { setProjects } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.constants";
import "./projects.css";
// import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";
import axios from "axios";

const ProjectListing = () => {
    const projects = useSelector((state) => state.projects.projects);
    const dispatch = useDispatch();

    const [searchedName, setSearchedName] = useState("");

    const handleChange = (e) => {
        e.preventDefault();
        setSearchedName(e.target.value);
    };

    const fetchProjects = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects).catch((err) => {
            console.log("Err", err);
        });
        console.log("🚀 ~ file: projectListing.js ~ line 17 ~ fetchProjects ~ result", result);
        dispatch(setProjects(result.data));
    };
    const searchHandel = () => {
        return projects.filter((project) => project.projectName.toLowerCase().includes(searchedName.toLowerCase()));
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    console.log("Projects:", projects);
    console.log("searched Name", searchedName);

    return (
        <div>
            <TextField id="standard-basic" label="Search" variant="standard" style={{ width: "1070px" }} className="ml-5" name="searchedName" onChange={handleChange} />
            <div style={{ maxHeight: "500px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                <Grid container className="projects-list-container " columns={{ xs: 8, md: 8, lg: 12 }}>
                    <ProjectComponent projects={searchHandel()} />
                </Grid>
            </div>
            {/* <Pagination count={10} variant="outlined" color="primary" /> */}
        </div>
    );
};

export default ProjectListing;
