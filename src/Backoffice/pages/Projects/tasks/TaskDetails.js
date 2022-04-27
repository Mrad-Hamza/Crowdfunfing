import React, { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import DownloadIcon from "@mui/icons-material/Download";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "../CustomizedDialogs";
import { InvoiceTaskService } from "../../User/_services/invoiceTask.service";
import { ComplaintTaskService } from "../../User/_services/complaintTask.service";
import { useSelector, useDispatch } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { selectedTask } from "../../../features/actions/projects.actions";
import { setInvoiceTasks, setComplaintTasks } from "../../../features/actions/projects.actions";
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
    const { taskName, taskDescription, taskType, taskAmount } = task;
    const { _id } = useParams();
    console.log("🚀 ~ file: TaskDetails.js ~ line 35 ~ TaskDetails ~ useParams()", useParams());
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

    const isAddNotValid = () => taskType !== "in progress";

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
                                backgroundImage: "../../../../assets/layout/images/task.jpg",
                            }}
                        >
                            <div style={{ height: "180px", width: "950px" }} className="surface-card p-4 shadow-2 border-round ">
                                <div className="font-medium text-500 mb-1">
                                    <CardMedia component="img" height="80" image={require("../../../../assets/layout/images/task.jpg")} alt="logo" />
                                </div>
                                <div className="projectDetails">
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {taskName} : {taskType} : {taskAmount} DT
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {taskDescription}
                                        </Typography>
                                    </CardContent>
                                </div>
                            </div>

                            {/* <div style={{ maxHeight: "230px", overflowY: "auto", overflowX: "hidden", scrollbarGutter: "stable" }} className="global-scroll"> */}
                            <div className=" col-12" style={{ display: "flex", width: "950px", height: "300px" }}>
                                <div style={{ height: "280px", width: "475px" }} className="surface-card p-3 shadow-2 border-round mr-1 ml-0">
                                    <div style={{ maxHeight: "210px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                            {invoiceTaskList.map((invoiceTask) => {
                                                const labelId = `checkbox-list-label-${invoiceTask._id}`;
                                                if (invoiceTask)
                                                    return (
                                                        <ListItem
                                                            key={invoiceTask._id}
                                                            secondaryAction={
                                                                <div>
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
                                    <div style={{ maxHeight: "200px", overflowY: "auto", overflowX: "hidden" }} className="global-scroll">
                                        <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                                            {complaintTaskList.map((complaintTask) => {
                                                const validateComplaint = () => {
                                                    ComplaintTaskService.validate(complaintTask._id);
                                                    window.location.reload(false);
                                                };
                                                const labelId = `checkbox-list-label-${complaintTask._id}`;
                                                if (complaintTask && complaintTask.complaintType === "in progress" && taskType === "in progress") {
                                                    return (
                                                        <div style={{ backgroundColor: "#FFFABE" }}>
                                                            <ListItem
                                                                key={complaintTask._id}
                                                                secondaryAction={
                                                                    <div style={{ display: "flex" }}>
                                                                        <IconButton edge="end" aria-label="validate" onClick={validateComplaint}>
                                                                            <CheckCircleIcon />
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
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div style={{ backgroundColor: "#E3FFCA" }}>
                                                            <ListItem
                                                                key={complaintTask._id}
                                                                secondaryAction={
                                                                    <div style={{ display: "flex" }}>
                                                                        <CustomizedDialogs title={complaintTask.complaintTaskTitle} description={complaintTask.complaintDescription} state={complaintTaskList.complaintType} />
                                                                    </div>
                                                                }
                                                                disablePadding
                                                            >
                                                                <ListItemButton role={undefined} onClick={handleToggle(complaintTask.complaintTaskTitle)} dense>
                                                                    <ListItemText id={labelId} primary={complaintTask.complaintTaskTitle} />
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
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDetails;
