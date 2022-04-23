import React, { useEffect } from "react";
import { Button } from "primereact/button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
// import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PopupForm from "./popupForm";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectedProject } from "../../features/actions/projects.actions";
import { setTasks, setInvoiceProjects, setComplaintProjects } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.constants";
import axios from "axios";
import "./projects.css";

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const project = useSelector((state) => state.project);
    const tasksList = useSelector((state) => state.projects.tasksList);
    const invoiceProjectList = useSelector((state) => state.projects.invoiceProjectList);
    const complaintProjectList = useSelector((state) => state.projects.complaintProjectList);
    const { projectName, projectDescription, projectCollectedAmount, image } = project;
    const { _id } = useParams();
    console.log(_id);
    console.log(project);
    console.log("tasksList:", tasksList);
    console.log("invoiceProjectList:", invoiceProjectList);
    console.log("complaintProjectList:", complaintProjectList);

    const fetchProjectDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedProject(result.data));
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    const fetchTasks = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.tasks.getTaskByProjectId + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setTasks(result.data));
    };

    const [checked, setChecked] = React.useState([0]);

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };
    const fetchInvoiceProjects = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.invoiceProjects.getInvoiceByProjectId + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setInvoiceProjects(result.data));
    };

    const fetchComplaintProjects = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.complaintProjects.getComplaintByProjectId + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setComplaintProjects(result.data));
    };

    useEffect(() => {
        if (_id && _id !== "") {
            fetchProjectDetails();
            fetchTasks();
            fetchInvoiceProjects();
            fetchComplaintProjects();
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
                                            {projectName} : {projectCollectedAmount} DT
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {projectDescription}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                            <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav" className="surface-card p-4 shadow-2 border-round my-2">
                                {tasksList.map((task) => {
                                    if (task) {
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
                                    } else {
                                        return <ListItemText primary="No task for this project" />;
                                    }
                                })}
                            </List>
                        </div>
                        <div className="container col-3">
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                New invoice
                                <Link to={`/projects/invoiceProject/add/${_id}`} style={{ width: "100%" }}>
                                    <IconButton edge="end" aria-label="plus">
                                        <AddIcon />
                                    </IconButton>
                                </Link>
                                {/* <Link to={`/projects/invoiceProject/add/${_id}`} style={{ width: "100%" }} className="mt-2 btn">
                                    <Button icon="pi pi-plus" className="button col-5 btn" />
                                </Link> */}
                                {invoiceProjectList.map((invoiceProject) => {
                                    const labelId = `checkbox-list-label-${invoiceProject._id}`;
                                    if (invoiceProject)
                                        return (
                                            <div style={{ width: "100%" }}>
                                                <div key={invoiceProject._id}>
                                                    <div className="ff">
                                                        <CardContent style={{ height: "10px" }}>
                                                            <ListItem
                                                                key={invoiceProject._id}
                                                                secondaryAction={
                                                                    <IconButton edge="end" aria-label="download">
                                                                        <DownloadIcon />
                                                                    </IconButton>
                                                                }
                                                                disablePadding
                                                            >
                                                                <ListItemButton role={undefined} onClick={handleToggle(invoiceProject.invoiceName)} dense>
                                                                    <ListItemText id={labelId} primary={invoiceProject.invoiceName} />
                                                                </ListItemButton>
                                                            </ListItem>
                                                            {/* <Typography gutterBottom variant="h6" component="div">
                                                            {invoiceProject.invoiceName}
                                                            <IconButton edge="end" aria-label="delete">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="download">
                                                                <DownloadIcon />
                                                            </IconButton>
                                                            {/* <CardMedia component="img" height="70" image={require("../../assets/layout/images/" + invoiceProject.invoiceFile)} alt="logo" /> */}
                                                            {/* </Typography> */}
                                                        </CardContent>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    else {
                                        return <div className="font-medium text-500 my-2">test</div>;
                                    }
                                })}
                            </div>
                            <div className="surface-card p-4 shadow-2 border-round my-2">
                                <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                    {complaintProjectList.map((complaintProject) => {
                                        const labelId = `checkbox-list-label-${complaintProject._id}`;

                                        return (
                                            <ListItem
                                                key={complaintProject._id}
                                                secondaryAction={
                                                    <IconButton edge="end" aria-label="comments">
                                                        <CommentIcon></CommentIcon>
                                                    </IconButton>
                                                }
                                                disablePadding
                                            >
                                                <ListItemButton role={undefined} onClick={handleToggle(complaintProject.complaintProjectTitle)} dense>
                                                    <ListItemText id={labelId} primary={complaintProject.complaintProjectTitle} />
                                                    <PopupForm className="ml-2" />
                                                </ListItemButton>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
