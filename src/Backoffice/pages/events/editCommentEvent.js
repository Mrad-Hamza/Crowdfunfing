import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comment, Header, Icon } from "semantic-ui-react";

import axios from "axios";
import { Form } from "react-bootstrap";

import useStyles from "./styles";
import { setCommentsEvent, deleteCommentAction , updateCommentAction, selectedComment } from "../../features/actions/eventActions";
import { commentEventService } from "../../features/services/commentEventService";

const EditCommentEvent = () => {
    const { idComment } = useParams();
        const event = useSelector((state) => state.commentsEventList);
        console.log(event);

    let history = useHistory();
    const dispatch = useDispatch();
    const [comment, setComment] = useState();

    const classes = useStyles();

 
      const fetching = async () => {
          const { result } = await axios.get(`http://localhost:5000/commentEvent/${idComment}`);
          setComment(result.comment);
          //setDate(data.updatedAt);

          console.log(result);
          dispatch(selectedComment(result.data));
      };
     


  useEffect(() => {
      if (idComment && idComment !== "") {
          console.log("id", idComment);
          fetching();
          console.log("🚀 ~ file: projectUpdate.js ~ line 74 ~ useEffect ~   fetchProjectDetails();", fetching());
      }
  }, [idComment]);

  
    const changeOnclick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("comment", comment);
       


        axios.put(`http://localhost:5000/commentEvent/update/${idComment}`, formData);
        //history.push("/showEvents");
    };

const updateHandler = (e) => {
    e.preventDefault();
    dispatch(updateCommentAction(idComment, comment));
    if (!comment ) return;

    history.push("/showEvents");
};
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">
                        Write a comment
                    </Typography>
                    <form onSubmit={changeOnclick}>
                        <TextField fullWidth rows={4} variant="outlined" label="Comment" value={comment} multiline onChange={(e) => setComment(e.target.value)} />
                        <br />
                        <Button type="submit" style={{ marginTop: "10px" }} fullWidth color="primary" variant="contained">
                            Comment
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditCommentEvent;
