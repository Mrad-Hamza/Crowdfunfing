// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { Card } from "primereact/card";
// import { Button } from "primereact/button";
// import { TabView, TabPanel } from "primereact/tabview";
// import { InputTextarea } from "primereact/inputtextarea";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { InputText } from "primereact/inputtext";
// import { Divider } from "primereact/divider";
// import { Link } from "react-router-dom";
// import { deleteForumAction, selectedForums, setForumEvent} from "../../features/actions/forum.actions";
// import CommentSection from "./CommentSection.js";




// import { RemoveSelectedForum, selectedForum} from "../../features/actions/forum.actions";

// const comment = ({ history }) => {
//     const forum = useSelector((state) => state.forum);
//     const {id,title, description } = forums;
//     //const { , error: errorDelete, success: successDelete } = eventDelete;
//     const { _id } = useParams();
//     const dispatch = useDispatch();
//     console.log(_id);

//     const fetchProductDetail = async () => {
//         const response = await axios.get(`http://localhost:5000/forums/${_id}`).catch((err) => {
//             console.log("Err", err);
//         });
//         dispatch(selectedForums(response.data));
//     };
//     const deleteHandler = (id) => {
//         if (window.confirm("Are you sure?")) {
//             dispatch(deleteForumAction(id));
//         }
//         history.push("/forums");
//     };

    

//     const footer = (
//         <span>
//             <Button label="Save" icon="pi pi-check" />
//             <Button label="Cancel" icon="pi pi-calendar" className="p-button-secondary ml-2" />
//         </span>
//     );
//     useEffect(() => {
//         if (_id && _id !== "") fetchProductDetail();
//         return () => {
//             dispatch(RemoveSelectedForum());
//         };
//     }, [_id]);
//     return (
//         <div className="ui grid container">
//             <TabView>
//                 <TabPanel header="About">
//                     <Card title={title} subTitle={description} style={{ width: "70em" }}>
//                         <div>
//                             <span>Description:</span>
//                             {description}
//                         </div>
//                         <br />
//                         <div>
//                             <span>Location: </span>
//                             {title}
//                         </div>
//                         <br />
//                         <Divider />
//                         <div className=" p-fluid">
//                             <div className="formgrid grid">
//                                 <CommentSection  />
//                             </div>
//                         </div>
//                         <span className="p-buttonset ">
//                             <Link to={`/update/${_id}`}>
//                                 <Button className="p-button-rounded p-button-warning " label="Edit" icon="pi pi-check" />
//                             </Link>
//                             <Button onClick={() => deleteHandler(_id)} className="p-button-rounded p-button-danger" label="Delete" icon="pi pi-trash" />
//                         </span>
//                     </Card>
//                 </TabPanel>
//                 {/* <TabPanel header="Comments">
//                       <p>
//                           Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
//                           aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
//                       </p>
//                   </TabPanel> */}
//             </TabView>
//         </div>
//     );
// };

// export default comment;
