import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { selectedProject } from "../../features/actions/projects.actions";
import URL from "../../features/constants/services.constants";
import axios from "axios";
import logo from "../../assets/layout/images/project-logo.png";

const ProjectDetails = () => {
    // const theme = useTheme();
    const project = useSelector((state) => state.project);
    const { projectName, projectDescription, projectCollectedAmount, tasks } = project;
    const { _id } = useParams();
    const dispatch = useDispatch();
    //console.log(_id);
    console.log(project);

    const fetchProjectDetails = async () => {
        const result = await axios.get(URL.baseApiUrl + URL.projects.fetchProjects + `/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedProject(result.data));
    };

    useEffect(() => {
        if (_id && _id !== "") fetchProjectDetails();
    }, [_id]);

    return (
        <div>
            <h1>ProductDetails</h1>
            {Object.keys(project).length === 0 ? (
                <div>...Loading</div>
            ) : (
                <Card sx={{ maxWidth: 1000 }}>
                    <CardActionArea>
                        <CardContent>
                            <CardMedia component="img" height="140" image={logo} alt="logo" />
                            <Typography gutterBottom variant="h5" component="div">
                                {projectName} : {projectCollectedAmount}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {projectDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {tasks}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            )}
        </div>
    );
};

export default ProjectDetails;
