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
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "../CustomizedDialogs";
import { InvoiceTaskService } from "../../User/_services/invoiceTask.service";
import { ComplaintTaskService } from "../../User/_services/complaintTask.service";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectedProject, selectedTask } from "../../../features/actions/projects.actions";
import CustomDialog from "../CustomDialog";
import { setTasks, setInvoiceTasks, setComplaintTasks } from "../../../features/actions/projects.actions";
import URL from "../../../features/constants/services.constants";
import axios from "axios";
import "../projects.css";

const TaskDetails = () => {
    const dispatch = useDispatch();
    const task = useSelector((state) => state.project);
    console.log(task);
    const tasksList = useSelector((state) => state.projects.tasksList);
    const invoiceTaskList = useSelector((state) => state.projects.invoiceTaskList);
    const complaintTaskList = useSelector((state) => state.projects.complaintTaskList);
    const { taskName, taskDescription, taskType } = task;
    const { _id } = useParams();
    console.log(_id);
    console.log(task);
    console.log("tasksList:", tasksList);
    console.log("invoiceTaskList:", invoiceTaskList);
    console.log("complaintTaskList:", complaintTaskList);

    const fetchTaskDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.tasks.fetchTasks + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedTask(result.data));
    };

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    // const fetchTasks = async () => {
    //     const result = await axios.get(URL.baseApiUrl + URL.tasks.getTaskByProjectId + `/${_id}`).catch((err) => {
    //         console.log("Err", err);
    //     });

    //     dispatch(setTasks(result.data));
    // };

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
    const fetchInvoiceTasks = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.invoiceTasks.getInvoiceByTaskId + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setInvoiceTasks(result.data));
    };

    const fetchComplaintTasks = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.complaintTasks.getComplaintByTaskId + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });

        dispatch(setComplaintTasks(result.data));
    };

    useEffect(() => {
        if (_id && _id !== "") {
            fetchTaskDetails();
            // fetchTasks();
            fetchInvoiceTasks();
            fetchComplaintTasks();
        }
    }, [_id]);

    return (
        <div>
            {Object.keys(task).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <div>
                    <div className="container col-12 projectdisplay">
                        <div
                            className="row col-12"
                            style={{
                                backgroundImage: "../../assets/layout/images/task.jpg",
                            }}
                        >
                            <div style={{ height: "180px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div className="font-medium text-500 mb-1">
                                    <CardMedia component="img" height="80" image={require("../../../assets/layout/images/task.jpg")} alt="logo" />
                                </div>
                                <div className="projectDetails">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {taskName} : {taskType}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {taskDescription}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>
                            {/* <List sx={{ width: "100%", bgcolor: "background.paper" }} component="nav" className="surface-card p-4 shadow-2 border-round my-2">
                                Add new task
                                <Link to={`/projects/task/add/${_id}`} style={{ width: "200px" }}>
                                    <IconButton edge="end" aria-label="plus">
                                        <AddIcon />
                                    </IconButton>
                                </Link>
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
                                                        <CustomizedDialogs title={task.taskName} description={task.taskDescription} state={task.taskType} id={task._id} />

                                                        {/* {open ? <ExpandLess /> : <ExpandMore />} */}
                            {/* </ListItemButton>
                                                     <Collapse in={open} timeout="auto" unmountOnExit>
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
                            {/* </div>
                                            );
                                        } else {
                                            return <ListItemText primary="No task for this project" />;
                                        }
                                    })} */}
                            {/* </div>
                            </List> */}

                            {/* <div style={{ maxHeight: "230px", overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }} className="global-scroll"> */}
                            <div className=" col-12" style={{ display: "flex", width: "950px", height: "350px" }}>
                                <div style={{ height: "280px", width: "475px" }} className="surface-card p-3 shadow-2 border-round mr-1 ml-0">
                                    Add new invoice
                                    <Link to={`/projects/invoiceProject/add/${_id}`} style={{ width: "200px" }}>
                                        <IconButton edge="end" aria-label="plus">
                                            <AddIcon />
                                        </IconButton>
                                    </Link>
                                    <div style={{ maxHeight: "110px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                            {invoiceTaskList.map((invoiceTask) => {
                                                const deleteInvoice = () => {
                                                    // InvoiceProjectService.delete(invoiceTask._id);
                                                    window.location.reload(false);
                                                };
                                                const labelId = `checkbox-list-label-${invoiceTask._id}`;
                                                if (invoiceTask)
                                                    return (
                                                        <ListItem
                                                            key={invoiceTask._id}
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
                                                            <ListItemButton role={undefined} onClick={handleToggle(invoiceTask.invoiceName)} dense>
                                                                <ListItemText id={labelId} primary={invoiceTask.invoiceName} />
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
                                <div style={{ height: "280px", width: "470px" }} className="surface-card p-4 shadow-2 border-round">
                                    Add new Complaint
                                    <Link to={`/projects/complaintProject/add/${_id}`} style={{ width: "200px" }}>
                                        <IconButton edge="end" aria-label="plus">
                                            <AddIcon />
                                        </IconButton>
                                    </Link>
                                    <div style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                            {complaintTaskList.map((complaintTask) => {
                                                const deleteComplaint = () => {
                                                    // ComplaintProjectService.delete(complaintTaskList._id);
                                                    window.location.reload(false);
                                                };
                                                const labelId = `checkbox-list-label-${complaintTask._id}`;

                                                return (
                                                    <ListItem
                                                        key={complaintTask._id}
                                                        secondaryAction={
                                                            <div style={{ display: "flex" }}>
                                                                <IconButton edge="end" aria-label="delete" onClick={deleteComplaint}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                                <CustomizedDialogs title={complaintTask.complaintTaskTitle} description={complaintTask.complaintDescription} state={complaintTaskList.complaintType} />
                                                            </div>
                                                        }
                                                        disablePadding
                                                    >
                                                        <ListItemButton role={undefined} onClick={handleToggle(complaintTask.complaintTaskTitle)} dense>
                                                            <ListItemText id={labelId} primary={complaintTask.complaintTaskTitle} />
                                                        </ListItemButton>
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    </div>
                                </div>
                            </div>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
