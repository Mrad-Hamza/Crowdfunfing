import React, { useEffect } from "react";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
//import TaskListing from "../tasks/taskListing";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProject } from "../../features/actions/projects.actions";
import { Button } from "primereact/button";
import URL from "../../features/constants/services.constants";
import axios from "axios";
import logo from "../../assets/layout/images/project-logo.png";
import pdf from "../../assets/layout/images/pdf.png";
import "./projects.css";

const ProjectDetails = () => {
    const dispatch = useDispatch();
    // const theme = useTheme();
    // const tasks = useSelector((state) => state);
    // const dispatch = useDispatch();

    // const fetchTasks = async () => {
    //     const result = await axios.get(URL.baseApiUrl + URL.tasks.fetchTasks).catch((err) => {
    //         console.log("Err", err);
    //     });
    //     console.log("🚀 ~ file: projectListing.js ~ line 17 ~ fetchProjects ~ result", result);
    //     dispatch(setTasks(result.data));
    // };

    const project = useSelector((state) => state.project);
    const { projectName, projectDescription, projectCollectedAmount } = project;
    const { _id } = useParams();
    //console.log(_id);
    console.log(project);
    // console.log("Tasks:", tasks);

    const fetchProjectDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedProject(result.data));
    };

    useEffect(() => {
        if (_id && _id !== "") fetchProjectDetails();
    }, [_id]);

    return (
        <div>
            {Object.keys(project).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <div class="projectdisplay">
                        <div class="container col-9">
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div className="font-medium text-500 mb-3">
                                    <CardMedia component="img" height="60" image={logo} alt="logo" />
                                </div>
                                <div class="ff">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {projectName} : {projectCollectedAmount}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {projectDescription}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                            {/* <TaskListing /> */}
                            {/* <List
                                sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
                                component="nav"
                                aria-labelledby="nested-list-subheader"
                                subheader={
                                    <ListSubheader component="div" id="nested-list-subheader">
                                        Nested List Items
                                    </ListSubheader>
                                }
                                class="my-2"
                            >
                                <ListItemButton onClick={handleClick}>
                                    <ListItemText primary="Inbox" />
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItemButton sx={{ pl: 4 }}>
                                            <ListItemIcon>
                                                <StarBorder />
                                            </ListItemIcon>
                                            <ListItemText primary="Starred" />
                                        </ListItemButton>
                                    </List>
                                </Collapse>
                            </List> */}
                        </div>
                        <div class="container col-3">
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div style={{ height: "140px" }} className="border-2 border-dashed surface-border">
                                    <div className="font-medium text-500 my-2">
                                        <CardMedia component="img" height="70" image={pdf} alt="logo" />
                                    </div>
                                    <div class="ff">
                                        <Button icon="pi pi-download" label="Download" className="cc" />
                                    </div>
                                </div>
                            </div>
                            <div className="surface-card p-4 shadow-2 border-round my-2">
                                <div style={{ height: "250px" }} className="border-2 border-dashed surface-border"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
