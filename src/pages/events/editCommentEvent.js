import React, { useState, useRef, useEffect } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Comment, Header, Icon } from "semantic-ui-react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Box from "@mui/material/Box";

import { Link } from "react-router-dom";

import { Chip } from "primereact/chip";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { Container, Row, Col } from "@mui/material";

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

const EditCommentEvent = () => {
    const { _id } = useParams();
    let history = useHistory();
    const dispatch = useDispatch();
    const [comment, setComment] = useState();

    const classes = useStyles();

  useEffect(() => {
      console.log("hhhhhhhhhhhh");
      const fetching = async () => {
          const { data } = await axios.get(`http://localhost:5000/commentEvent/${_id}`);
          //console.log(data.comment);         
          //setComment(data.comment);
      };
      fetching();
  }, [_id]);


    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div style={{ width: "70%" }}>
                    <Typography gutterBottom variant="h6">
                        Write a comment
                    </Typography>
                    <form>
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
