import React, { useState, useRef, useEffect } from "react";
 import { Typography, TextField, Button } from "@material-ui/core/";
 import { useParams ,useHistory} from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import List from "@mui/material/List";
 import ListItem from "@mui/material/ListItem";
 import IconButton from "@mui/material/IconButton";
 import ListItemButton from "@mui/material/ListItemButton";
 import ListItemIcon from "@mui/material/ListItemIcon";
 import ListItemText from "@mui/material/ListItemText";

import axios from "axios";
import { Form } from "react-bootstrap";


import useStyles from "./styles";
import {commentEvent, setCommentsEvent} from "../../features/actions/eventActions";
import { commentEventService } from "../../features/services/commentEventService";

const CommentSection = () => {
        const { _id } = useParams();
        let history = useHistory();
        const dispatch = useDispatch();
        const commentsEventList = useSelector((state) => state.allEvents.commentsEventList);

        const [state, setState] = useState({ comment: "", event: _id, user: localStorage.getItem("currentUserId") });

        const fetchCommentsEvent = async () => {
            const result = await axios.get(`http://localhost:5000/commentEvent/all/${_id}`).catch((err) => {
                console.log("Err", err);
            });
            dispatch(setCommentsEvent(result.data));
        };
        console.log(commentsEventList);
        const classes = useStyles();
        const user = JSON.parse(localStorage.getItem('user'));
        //console.log(user);
          const [comments, setComments] = useState([1,2,3,4]);
        //const dispatch = useDispatch();
    //  console.log(_id);
    //     console.log(state);

    useEffect(() => {
        if (_id && _id !== "") {
           fetchCommentsEvent();
        }
    }, [_id]);

    const handleComment =  (e) => {
        e.preventDefault();
        const {name,value}= e.target;
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
         if (state.comment && state.event && state.user ) {
            commentEventService.addComment(state);
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
                  {commentsEventList?.map((c, i) => {
                      return( 
                    //   <Typography key={i} gutterBottom variant="subtitle1">
                    //        {c.content}
                    //    </Typography>)
                     
                            <ListItem
                                key={c._id}
                                
                                disablePadding
                            >
                                <ListItemButton role={undefined} dense>
                                    <ListItemText  primary={c.comment} />
                                </ListItemButton>
                            </ListItem>
                        );
                      
                  }
                     
                  )}
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
}

export default CommentSection