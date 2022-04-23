import React, { useState, useRef } from "react";
 import { Typography, TextField, Button } from "@material-ui/core/";
 import { useParams ,useHistory} from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";


import { useDispatch } from "react-redux";
import useStyles from "./styles";
import {commentEvent} from "../../features/actions/eventActions";
import { commentEventService } from "../../features/services/commentEventService";

const CommentSection = (props) => {
        const { _id } = useParams();
        let history = useHistory();

        const [state, setState] = useState({ comment: "", event: _id, user: localStorage.getItem("currentUserId") });
    
      const classes = useStyles();
        const user = JSON.parse(localStorage.getItem('user'));
        //console.log(user);
          //const [comments, setComments] = useState([1,2,3,4]);
        //const dispatch = useDispatch();
    //  console.log(_id);
    //     console.log(state);


    const handleComment =  (e) => {
        e.preventDefault();
        const {name,value}= e.target;
        if (name === "comment") {
            setState((prevState) => {
                return { ...prevState, comment: value };
            });
        }
        // const finalComment = `${comment}`;
        // dispatch(commentEvent(finalComment, _id));
    };
   
     const handleSubmit = (e) => {
         e.preventDefault();
         console.log(_id);
         console.log(state);
         if (state.comment && state.event && state.user ) {
            commentEventService.addComment(state);
             //history.push("/projects");
         }
     };

  return (
      <div>
          <div className={classes.commentsOuterContainer}>
              <div className={classes.commentsInnerContainer}>
                  <Typography gutterBottom variant="h6">
                      Comments
                  </Typography>
                  {/* {comments?.map((c, i) => (
                      <Typography key={i} gutterBottom variant="subtitle1">
                          Comment{i}
                      </Typography>
                  ))} */}
              </div>

              <div style={{ width: "70%" }}>
                  <Typography gutterBottom variant="h6">
                      Write a comment
                  </Typography>
                  <form >
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
}

export default CommentSection