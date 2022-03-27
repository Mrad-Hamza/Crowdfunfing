import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./projects.css";
import logo from "../../assets/layout/images/project-logo.png";

const ProjectComponent = () => {
    const projects = useSelector((state) => state.projects.projects);
    const renderList = projects.map((project) => {
        const { _id, projectName, projectDescription, projectCollectedAmount } = project;
        return (
            <div key={_id}>
                <Link to={`/projects/${_id}`}>
                    {/* <div class="mx-3"> */}
                    <Card sx={{ maxWidth: 345 }} className="project-card">
                        <CardContent>
                            <CardMedia component="img" height="80" image={logo} alt="logo" />

                            <Typography gutterBottom variant="h5" component="div">
                                {projectName}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {projectDescription}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {projectCollectedAmount}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                    {/* </div> */}
                </Link>
            </div>
        );
    });

    return renderList;
};

export default ProjectComponent;
