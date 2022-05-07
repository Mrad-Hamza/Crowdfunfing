import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { Comment, Header, Icon } from "semantic-ui-react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

import { Chip } from "primereact/chip";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { selectedProject } from "../../features/actions/projects.actions";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
import IconButton from "@mui/material/IconButton";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";

import axios from "axios";
// import { Form } from "react-bootstrap";

import useStyles from "./styles";
import { setCommentsEvent, deleteCommentAction } from "../../features/actions/eventActions";
import { commentEventService } from "../../features/services/commentEventService";
import { userService } from "../User/_services";

/*******************************Comment component***************************************/
const CommentComponent = ({ c }) => {
    const dispatch = useDispatch();
    const deleteComment = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteCommentAction(id));
            window.location.reload(false);
        }
    };

    return (
        <div key={`${Math.random()}${c.user}`}>
            <div className="flex align-items-center flex-column sm:flex-row">
                <Chip label={c.userData.username} image="assets/demo/images/avatar/amyelsner.png" className="mr-2 mb-2" />
            </div>
            <div className="flex align-items-center flex-column sm:flex-row">
                <Chip label={c.comment} className="mr-2 mb-2" />
                <Box sx={{ width: 500 }}>
                    <Grid container justifyContent="center">
                        <Grid item>
                            <Tooltip title="Like" placement="top-start">
                                <IconButton>
                                    <ThumbUpIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit" placement="top">
                                <Link to={`/updateCommentEvent/${c._id}`}>
                                    <IconButton>
                                        <EditIcon />
                                    </IconButton>
                                </Link>
                            </Tooltip>
                            <Tooltip title="Delete" placement="top-end">
                                <IconButton
                                    onClick={() => {
                                        deleteComment(c._id);
                                    }}
                                >
                                    <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div>
    );
};

/*******************************Comments section***************************************/
const CommentSection = () => {
    const { _id } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const commentsEventList = useSelector((state) => state.allEvents.commentsEventList);
    const [state, setState] = useState({ comment: "", event: _id, user: localStorage.getItem("currentUserId") });
    const [commentsData, setCommentsData] = useState([]);
    const fetchCommentsEvent = async () => {
        const result = await axios.get(process.env.REACT_APP_URI_SERVER + `/commentEvent/all/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(setCommentsEvent(result.data));
    };
    const fetchUserFromCommentById = async (id) => {
        try {
            const res = await axios.get(process.env.REACT_APP_URI_SERVER + "/users/" + id);
            return res;
        } catch (err) {
            console.log("Err", err);
        }
    };

    const getUserDataFromCommentsList = () => {
        commentsEventList.forEach((comment) => {
            fetchUserFromCommentById(comment.user).then((res) => {
                setCommentsData((prevState) => {
                    return [...prevState, { ...comment, userData: res.data }];
                });
            });
        });
    };
    // console.log(commentsEventList);
    const classes = useStyles();
    //const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (_id && _id !== "") {
            fetchCommentsEvent();
            // fetchUser();
        }
    }, [_id]);

    //Create new structure after getting the comments list : add user data to comments list
    useEffect(() => {
        if (commentsEventList.length !== 0) {
            getUserDataFromCommentsList();
        }
    }, [commentsEventList]);

    const handleComment = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "comment") {
            setState((prevState) => {
                return { ...prevState, comment: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(_id);
        console.log(state);
        if (state.comment && state.event && state.user) {
            commentEventService.addComment(state);
            window.location.reload(false);
        }
        //history.push(`/events/${_id}`);
    };

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant="h6">
                        Comments
                    </Typography>
                    

                    <div>
                        {commentsData.map((c) => {
                            return <CommentComponent key={`${Math.random()}${c.user}`} c={c} />;
                        })}
                    </div>
                </div>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">
                        Write a comment
                    </Typography>
                    <form>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" name="comment" multiline onChange={handleComment} />
                        <br />
                        <Button type="submit" style={{ marginTop: "10px" }} fullWidth color="primary" variant="contained" onClick={handleSubmit}>
                            Comment
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CommentSection;
