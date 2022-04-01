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
    //     <div className="ui grid container">

    //       <div className="card">
    //           <TabView>
    //               <TabPanel header="About">
    //                   {/* <p>
    //                       Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
    //                       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    //                   </p> */}
    //                   <Card title={nameEvent} subTitle={location} style={{ width: "50em" }}>
    //                       <div>
    //                           <a>
    //                               <i className="pi pi-calendar-plus text-2xl text-blue-500"></i>
    //                           </a>
    //                           {startDateEvent}
    //                       </div>

    //                       <p className="m-0" style={{ lineHeight: "1.5" }}>
    //                           {descriptionEvent}
    //                       </p>
    //                   </Card>
    //               </TabPanel>
    //               <TabPanel header="Comments">
    //                   <p>
    //                       Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
    //                       aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
    //                   </p>
    //               </TabPanel>
    //           </TabView>
    //       </div>
         
    //   </div>
        <div>
            {/* <h1>ProductDetails</h1> */}
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
