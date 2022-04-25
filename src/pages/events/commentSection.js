import React, { useState, useRef, useEffect } from "react";
 import { Typography, TextField, Button } from "@material-ui/core/";
 import { useParams ,useHistory} from "react-router-dom";
 import { useDispatch, useSelector } from "react-redux";
 import {  Comment, Header ,Icon} from "semantic-ui-react";
 import ThumbUpIcon from "@mui/icons-material/ThumbUp";
 import DeleteIcon from "@mui/icons-material/Delete";
  import EditIcon from "@mui/icons-material/Edit";


 import Box from '@mui/material/Box';

 import { Link } from "react-router-dom";

 import { Chip} from "primereact/chip";
 import Grid from "@mui/material/Grid";
 import Tooltip from "@mui/material/Tooltip";
 import { Container,Row,Col } from "@mui/material";




 import List from "@mui/material/List";
 import ListItem from "@mui/material/ListItem";
 import IconButton from "@mui/material/IconButton";
 import ListItemButton from "@mui/material/ListItemButton";
 import ListItemIcon from "@mui/material/ListItemIcon";
 import ListItemText from "@mui/material/ListItemText";

import axios from "axios";
import { Form } from "react-bootstrap";


import useStyles from "./styles";
import { setCommentsEvent, deleteCommentAction } from "../../features/actions/eventActions";
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
                  {commentsEventList?.map((c, i) => {
                       const deleteComment = (id) => {
                           if (window.confirm("Are you sure?")) {
                               dispatch(deleteCommentAction(id));
                                window.location.reload(false);
                           }
                    }
                      return (
                          <div>
                              <div className="flex align-items-center flex-column sm:flex-row">
                                  <Chip label={localStorage.getItem("currentUsername")} image="assets/demo/images/avatar/amyelsner.png" className="mr-2 mb-2" />
                              </div>
                              <div className="flex align-items-center flex-column sm:flex-row">
                                  <Chip key={c._id} label={c.comment} className="mr-2 mb-2" />
                                  <Box sx={{ width: 500 }}>
                                      <Grid container justifyContent="center">
                                          <Grid item>
                                              <Tooltip title="Like" placement="top-start">
                                                  <IconButton>
                                                      <ThumbUpIcon />
                                                  </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Edit" placement="top">
                                                  <IconButton>
                                                      <EditIcon />
                                                  </IconButton>
                                              </Tooltip>
                                              <Tooltip title="Delete" placement="top-end">
                                                  <IconButton onClick={() => deleteComment(c._id)}>
                                                      <DeleteIcon />
                                                  </IconButton>
                                              </Tooltip>
                                          </Grid>
                                      </Grid>
                                  </Box>
                              </div>

                              {/* <h6>{c.user}</h6> */}

                              {/* <Typography key={c._id} gutterBottom variant="subtitle1">
                                  {c.comment}
                              </Typography> */}
                          </div>
                      );

                      //   <ListItem key={c._id} disablePadding>
                      //       <ListItemButton role={undefined} dense>
                      //           <ListItemText primary={c.comment} />
                      //       </ListItemButton>
                      //   </ListItem>
                  })}
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