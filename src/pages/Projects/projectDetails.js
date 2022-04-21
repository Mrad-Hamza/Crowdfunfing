import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
// import TaskListing from "../tasks/taskListing";
import TaskComponent from "../tasks/taskComponent";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProject } from "../../features/actions/projects.actions";
import { setTasks } from "../../features/actions/projects.actions";
import { Button } from "primereact/button";
import URL from "../../features/constants/services.constants";
import axios from "axios";
// import logo from "../../assets/layout/images/project-logo.png";
import pdf from "../../assets/layout/images/pdf.png";
import "./projects.css";

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project);
    const tasksList = useSelector((state) => state.projects.tasksList);
    const { projectName, projectDescription, projectCollectedAmount, image } = project;
    // const img = "../../assets/layout/images/" + image;
    const { _id } = useParams();
    //console.log(_id);
    console.log(project);
    console.log("tasksList:", tasksList);

    const fetchProjectDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedProject(result.data));
    };

    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    const fetchTasks = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.tasks.gettaskbyidproject + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setTasks(result.data));
    };

    useEffect(() => {
        if (_id && _id !== "") {
            fetchProjectDetails();
            fetchTasks();
        }
    }, [_id]);

    return (
        <div>
            {Object.keys(project).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <div className="projectdisplay">
                        <div
                            className="container col-9"
                            style={{
                                backgroundImage: "../../assets/layout/images/" + image,
                            }}
                        >
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div className="font-medium text-500 mb-1">
                                    <CardMedia component="img" height="80" image={require("../../assets/layout/images/" + image)} alt="logo" />
                                </div>
                                <div className="ff">
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
                            {/* <div className="surface-card p-4 shadow-2 border-round mt-1"> */}
                            <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav" className="surface-card p-4 shadow-2 border-round my-2">
                                {tasksList.map((task) => {
                                    return (
                                        <div key={task._id}>
                                            <ListItemButton onClick={handleClick}>
                                                <ListItemText primary={task.taskName} />
                                                {open ? <ExpandLess /> : <ExpandMore />}
                                            </ListItemButton>
                                            <Collapse in={open} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    <ListItemButton sx={{ pl: 4 }}>
                                                        <ListItemIcon>
                                                            <StarBorder />
                                                        </ListItemIcon>
                                                        <ListItemText primary={task.taskDescription} />
                                                    </ListItemButton>
                                                </List>
                                            </Collapse>
                                        </div>
                                    );
                                })}
                            </List>
                            {/* </div> */}
                        </div>
                        <div className="container col-3">
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div style={{ height: "140px" }} className="border-2 border-dashed surface-border">
                                    <div className="font-medium text-500 my-2">
                                        <CardMedia component="img" height="70" image={pdf} alt="logo" />
                                    </div>
                                    <div className="ff">
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
