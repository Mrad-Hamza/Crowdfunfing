import React, { useEffect, useRef } from "react";
import { Button } from "primereact/button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import CommentIcon from "@mui/icons-material/Comment";
import InfoIcon from "@mui/icons-material/Info";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Toast } from 'primereact/toast';
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "./CustomizedDialogs";
import { TaskProjectService } from "../User/_services/taskProject.service";
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
import { projectService } from "../User/_services/project.service";

const ProjectDetails = () => {
    const dispatch = useDispatch();
    const toast = useRef(null);

    const project = useSelector((state) => state.project);
    const tasksList = useSelector((state) => state.projects.tasksList);
    const invoiceProjectList = useSelector((state) => state.projects.invoiceProjectList);
    const complaintProjectList = useSelector((state) => state.projects.complaintProjectList);
    const { projectName, projectDescription, projectCollectedAmount, image, resteAmount, projectType } = project;
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
            return tasksList.some((task) => {
                return projectType !== "in progress" && (task.taskType !== "validated" || task.taskType !== "refused") && resteAmount === 0;
            });
        }
    };
    console.log("🚀 ~ file: projectDetails.js ~ line 111 ~ isAddTaskNotValid ~ isAddTaskNotValid", isAddTaskNotValid());

    const isAddInvoiceNotValid = () => projectType !== "in progress";

    return (
        <div>
            <Toast ref={toast} />

            {Object.keys(project).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <div className="projectdisplay">
                        <div
                            className="container col-7"
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
                                            {projectName} : {resteAmount} / {projectCollectedAmount} DT
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {projectDescription}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                            <List sx={{ width: "100%", height: "350px", bgcolor: "background.paper" }} component="nav" className="surface-card p-4 shadow-2 border-round my-2">
                                <div style={{ maxHeight: "280px", overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }} className="global-scroll">
                                    {tasksList.map((task) => {
                                        const validateTask = () => {
                                            if (window.confirm("Do you really want to validate this task ?")) {
                                                projectService.updateAmount(task._id, _id);
                                                TaskProjectService.validate(task._id);
                                                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Project Validated Succesfully', life: 5000 });
                                                setTimeout(() => {
                                                    window.location.reload(false);
                                                }, 3000);
                                            }
                                        };
                                        const RefuseTask = () => {
                                            if (window.confirm("Do you really want to refuse this task ?")) {
                                                TaskProjectService.refuse(task._id);
                                                toast.current.show({ severity: 'error', summary: 'Not validated', detail: 'Project Not Validated', life: 5000 });
                                                setTimeout(() => {
                                                    window.location.reload(false);
                                                }, 3000);
                                            }
                                        };
                                        if (task && task.taskType === "in progress") {
                                            return (
                                                <div key={task._id} style={{ backgroundColor: "#FFFABE" }}>
                                                    <ListItemButton style={{ display: "flex" }}>
                                                        <ListItemText primary={task.taskName} />
                                                        <div className="ml-5">
                                                            <span>Status : In progress</span>
                                                            <IconButton edge="end" aria-label="check" onClick={validateTask}>
                                                                <CheckCircleIcon />
                                                            </IconButton>
                                                            <IconButton edge="end" aria-label="off" onClick={RefuseTask}>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </div>
                                                        <Link to={`/projects/task/${task._id}`}>
                                                            <IconButton edge="end" aria-label="info">
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </ListItemButton>
                                                </div>
                                            );
                                        } else if (task && task.taskType === "validated") {
                                            return (
                                                <div key={task._id} style={{ backgroundColor: "#E3FFCA" }}>
                                                    <ListItemButton style={{ display: "flex" }}>
                                                        <ListItemText primary={task.taskName} />
                                                        <div className="ml-5">
                                                            <span>Status : Valid</span>
                                                            <IconButton edge="end" aria-label="check" disabled>
                                                                <CheckCircleIcon />
                                                            </IconButton>
                                                        </div>
                                                        <Link to={`/projects/task/${task._id}`}>
                                                            <IconButton edge="end" aria-label="info">
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </ListItemButton>
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div key={task._id} style={{ backgroundColor: "#FFCECE" }}>
                                                    <ListItemButton style={{ display: "flex" }}>
                                                        <ListItemText primary={task.taskName} />
                                                        <div className="ml-5">
                                                            <span>Status : Refused</span>
                                                            <IconButton edge="end" aria-label="off" disabled>
                                                                <HighlightOffIcon />
                                                            </IconButton>
                                                        </div>
                                                        <Link to={`/projects/task/${task._id}`}>
                                                            <IconButton edge="end" aria-label="info">
                                                                <InfoIcon />
                                                            </IconButton>
                                                        </Link>
                                                    </ListItemButton>
                                                </div>
                                            );
                                        }
                                    })}
                                </div>
                            </List>
                        </div>
                        <div className="container col-5">
                            <div style={{ height: "180px" }} className="surface-card p-3 shadow-2 border-round ">
                                <div style={{ maxHeight: "110px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                        {invoiceProjectList.map((invoiceProject) => {
                                            const labelId = `checkbox-list-label-${invoiceProject._id}`;
                                            if (invoiceProject)
                                                return (
                                                    <ListItem
                                                        key={invoiceProject._id}
                                                        secondaryAction={
                                                            <div>
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
                            <div style={{ height: "350px" }} className="surface-card p-4 shadow-2 border-round my-2">
                                <div style={{ maxHeight: "250px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                        {complaintProjectList.map((complaintProject) => {
                                            const validateComplaint = () => {
                                                ComplaintProjectService.validate(complaintProject._id);
                                                toast.current.show({ severity: 'success', summary: 'Success', detail: 'Complaint Validated Succesfully', life: 5000 });
                                                setTimeout(() => {
                                                    window.location.reload(false);
                                                }, 3000);
                                            };
                                            const labelId = `checkbox-list-label-${complaintProject._id}`;
                                            if (complaintProject && complaintProject.complaintType == "in progress") {
                                                return (
                                                    <div style={{ backgroundColor: "#FFFABE" }}>
                                                        <ListItem
                                                            key={complaintProject._id}
                                                            secondaryAction={
                                                                <div style={{ display: "flex" }}>
                                                                    <IconButton edge="end" aria-label="validate" onClick={validateComplaint}>
                                                                        <CheckCircleIcon />
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
                                                    </div>
                                                );
                                            } else {
                                                return (
                                                    <div style={{ backgroundColor: "#E3FFCA" }}>
                                                        <ListItem
                                                            key={complaintProject._id}
                                                            secondaryAction={
                                                                <div style={{ display: "flex" }}>
                                                                    <CustomizedDialogs title={complaintProject.complaintProjectTitle} description={complaintProject.complaintDescription} state={complaintProject.complaintType} />
                                                                </div>
                                                            }
                                                            disablePadding
                                                        >
                                                            <ListItemButton role={undefined} onClick={handleToggle(complaintProject.complaintProjectTitle)} dense>
                                                                <ListItemText id={labelId} primary={complaintProject.complaintProjectTitle} />
                                                            </ListItemButton>
                                                        </ListItem>
                                                    </div>
                                                );
                                            }
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
