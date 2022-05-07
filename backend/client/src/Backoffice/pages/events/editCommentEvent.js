import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comment, Header, Icon } from "semantic-ui-react";

import axios from "axios";
import { Form } from "react-bootstrap";

import useStyles from "./styles";
import { Input, Textarea, SubmitButton } from "../User/Login/UserLogin/accountBox/common";
import { setCommentsEvent, deleteCommentAction, updateCommentAction, selectedComment } from "../../features/actions/eventActions";
import { commentEventService } from "../../features/services/commentEventService";
import { selectedProject, setTasks, setInvoiceProjects, setComplaintProjects } from "../../features/actions/projects.actions";
import { projectService } from "../User/_services/project.service";

const EditCommentEvent = () => {
    const classes = useStyles();
    const { idComment } = useParams();
    const dispatch = useDispatch();
    let history = useHistory();
    const url = process.env.REACT_APP_URI_SERVER + "/commentEvent/";
    const comment = useSelector((state) => state.project);
    console.log("🚀 ~ file: projectUpdate.js ~ line 21 ~ ProjectUpdate ~ project", comment);
    const fetchCommentDetails = async () => {
        const result = await axios.get(url + `/${idComment}`).catch((err) => {
            console.log("Err", err);
        });
        console.log("project details", result);
        dispatch(selectedProject(result.data));
    };
    console.log("OldComment :", comment);
    const [commentById, setCommentById] = useState({});
    // state.compaign = _id;
    console.log("newComment :", commentById);
    // const showResponse = (response) => {
    //     console.log(response);
    //     //call to a backend to verify against recaptcha with private key
    // };
    const handleChange = (e) => {
        e.preventDefault();
        const { name, value } = e.target;
        if (name === "comment") {
            setCommentById((prevState) => {
                return { ...prevState, comment: value };
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(idComment);
        console.log("newComment :", commentById);
        projectService.UpdateComment(commentById.id, commentById.comment);
        history.push("/events/" + comment.event);
        window.location.reload(false);
    };

    useEffect(() => {
        if (idComment && idComment !== "") {
            console.log("id", idComment);
            fetchCommentDetails();
            console.log("🚀 ~ file: projectUpdate.js ~ line 74 ~ useEffect ~   fetchProjectDetails();", fetchCommentDetails());
        }
    }, [idComment]);

    useEffect(() => {
        console.log("hello");
        if (comment && Object.keys(comment).length > 0) {
            setCommentById({ id: idComment, comment: comment.comment });
        }
    }, [comment, idComment]);

    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">
                        Write a comment
                    </Typography>
                    <form>
                        <Textarea id="comment" name="comment" value={commentById.comment} placeholder="Description" onChange={handleChange} className="mb-2" />
                        {/* <TextField fullWidth rows={4} name="comment" variant="outlined" value={comment.comment} multiline onChange={handleChange} /> */}
                        <br />
                        <Button type="submit" style={{ marginTop: "10px" }} fullWidth color="primary" variant="contained" onClick={handleSubmit}>
                            update comment
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCommentEvent;
