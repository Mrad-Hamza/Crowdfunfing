import React, { useEffect } from "react";
import { Button } from "primereact/button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "./CustomizedDialogs";
import { InvoiceProjectService } from "../User/_services/invoiceProject.service";
import { ComplaintProjectService } from "../User/_services/complaintProject.service";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectedProject } from "../../features/actions/projects.actions";
import CustomDialog from "./CustomDialog";
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

    const isAddTaskNotValid = () => {
        if (tasksList.length > 0) {
            return tasksList.some((task) => task.taskType !== "validated" || project.projectCollectedAmount == 0);
        }
    };
    console.log("🚀 ~ file: projectDetails.js ~ line 111 ~ isAddTaskNotValid ~ isAddTaskNotValid", isAddTaskNotValid());

    return (
        <div>
            {Object.keys(project).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <div className="projectdisplay">
                        <div
                            className="container col-8"
                            style={{
                                backgroundImage: "../../../assets/layout/images/" + image,
                            }}
                        >
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div className="font-medium text-500 mb-1">
                                    <CardMedia component="img" height="80" image={require("../../../assets/layout/images/" + image)} alt="logo" />
                                </div>
                                <div className="projectDetails">
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
                                {!isAddTaskNotValid() && (
                                    <>
                                        <span>Add new task</span>
                                        <Link to={`/projects/task/add/${_id}`} style={{ width: "200px" }}>
                                            <IconButton edge="end" aria-label="plus">
                                                <AddIcon />
                                            </IconButton>
                                        </Link>
                                    </>
                                )}
                                <div style={{ maxHeight: "230px", overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }} className="global-scroll">
                                    {tasksList.map((task) => {
                                        if (task) {
                                            return (
                                                <div key={task._id}>
                                                    <ListItemButton style={{ display: "flex" }}>
                                                        <ListItemText primary={task.taskName} />
                                                        <Link to={`/projects/task/complaint/add/${task._id}`} className="mr-1">
                                                            <IconButton edge="end" aria-label="plus">
                                                                <AddIcon />
                                                                <ListItemText primary="Complaint" />
                                                            </IconButton>
                                                        </Link>
                                                        <Link to={`/projects/task/invoice/add/${task._id}`} className="mr-1">
                                                            <IconButton edge="end" aria-label="plus">
                                                                <AddIcon />
                                                                <ListItemText primary="Invoice" />
                                                            </IconButton>
                                                        </Link>
                                                        <Link to={`/projects/task/${task._id}`}>
                                                            <IconButton edge="end" aria-label="comment">
                                                                <CommentIcon />
                                                            </IconButton>
                                                        </Link>
                                                        {/* <CustomizedDialogs title={task.taskName} description={task.taskDescription} state={task.taskType} id={task._id} /> */}

                                                        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                                                    </ListItemButton>
                                                    {/* <Collapse in={open} timeout="auto" unmountOnExit>
                                                        <List component="div" disablePadding>
                                                            <ListItemButton sx={{ pl: 4 }}>
                                                                <ListItemIcon>
                                                                    <StarBorder />
                                                                </ListItemIcon>
                                                                <ListItemText primary={task.taskDescription} />
                                                                <Link to={`/projects/tasks/${task._id}`}>
                                                                    <Button icon="pi pi-info-circle" className="button col-5" label="Show more" style={{ width: "120px", height: "30px", textAlign: "left" }} />
                                                                </Link>
                                                                <CustomizedDialogs title={task.taskName} description={task.taskDescription} state={task.taskType} />
                                                                {/* <CustomDialog /> */}
                                                    {/* </ListItemButton> */}
                                                    {/* </List> */}
                                                    {/* </Collapse> */}
                                                </div>
                                            );
                                        } else {
                                            return <ListItemText primary="No task for this project" />;
                                        }
                                    })}
                                </div>
                            </List>
                        </div>
                        <div className="container col-4">
                            <div style={{ height: "180px" }} className="surface-card p-3 shadow-2 border-round ">
                                Add new invoice
                                <Link to={`/projects/invoiceProject/add/${_id}`} style={{ width: "200px" }}>
                                    <IconButton edge="end" aria-label="plus">
                                        <AddIcon />
                                    </IconButton>
                                </Link>
                                <div style={{ maxHeight: "110px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                        {invoiceProjectList.map((invoiceProject) => {
                                            const deleteInvoice = () => {
                                                InvoiceProjectService.delete(invoiceProject._id);
                                                window.location.reload(false);
                                            };
                                            const labelId = `checkbox-list-label-${invoiceProject._id}`;
                                            if (invoiceProject)
                                                return (
                                                    <ListItem
                                                        key={invoiceProject._id}
                                                        secondaryAction={
                                                            <div>
                                                                <IconButton edge="end" aria-label="delete" onClick={deleteInvoice}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <IconButton edge="end" aria-label="download">
                                                                    <DownloadIcon />
                                                                </IconButton>
                                                            </div>
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton role={undefined} onClick={handleToggle(invoiceProject.invoiceName)} dense>
                                                            <ListItemText id={labelId} primary={invoiceProject.invoiceName} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            else {
                                                return <div className="font-medium text-500 my-2">test</div>;
                                            }
                                        })}
                                    </List>
                                </div>
                            </div>
                            <div style={{ height: "310px" }} className="surface-card p-4 shadow-2 border-round my-2">
                                Add new Complaint
                                <Link to={`/projects/complaintProject/add/${_id}`} style={{ width: "200px" }}>
                                    <IconButton edge="end" aria-label="plus">
                                        <AddIcon />
                                    </IconButton>
                                </Link>
                                <div style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                        {complaintProjectList.map((complaintProject) => {
                                            const deleteComplaint = () => {
                                                ComplaintProjectService.delete(complaintProject._id);
                                                window.location.reload(false);
                                            };
                                            const labelId = `checkbox-list-label-${complaintProject._id}`;

                                            return (
                                                <ListItem
                                                    key={complaintProject._id}
                                                    secondaryAction={
                                                        <div style={{ display: "flex" }}>
                                                            <IconButton edge="end" aria-label="delete" onClick={deleteComplaint}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                            <CustomizedDialogs title={complaintProject.complaintProjectTitle} description={complaintProject.complaintDescription} state={complaintProject.complaintType} />
                                                        </div>
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton role={undefined} onClick={handleToggle(complaintProject.complaintProjectTitle)} dense>
                                                        <ListItemText id={labelId} primary={complaintProject.complaintProjectTitle} />
                                                    </ListItemButton>
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectDetails;
