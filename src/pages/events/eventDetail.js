import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { GMap } from "primereact/gmap";
import { InputTextarea } from "primereact/inputtextarea";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { InputText } from "primereact/inputtext";
import { Divider } from "primereact/divider";
import { Link } from "react-router-dom";
import { deleteEventAction} from "../../features/actions/eventActions";



import { RemoveSelectedEvent, selectedEvent } from "../../features/actions/eventActions";

const EventDetail = ({ history }) => {
    const event = useSelector((state) => state.event);
    const { id, nameEvent, descriptionEvent, urlEvent, startDateEvent, endDateEvent, location, eventType } = event;
    const eventDelete = useSelector((state) => state.noteDelete);
    //const { , error: errorDelete, success: successDelete } = eventDelete;
    const { _id } = useParams();
    const dispatch = useDispatch();
    console.log(_id);

    const fetchProductDetail = async () => {
        const response = await axios.get(`http://localhost:5000/events/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedEvent(response.data));
    };
    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
            dispatch(deleteEventAction(id));
        }
        history.push("/showEvents");
    };

    const header = <img alt="Card" src="images/usercard.png" onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} />;
    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-calendar" className="p-button-secondary ml-2" />
        </span>
    );
    useEffect(() => {
        if (_id && _id !== "") fetchProductDetail();
        return () => {
            dispatch(RemoveSelectedEvent());
        };
    }, [_id]);
    return (
        <div className="ui grid container">
            <TabView>
                <TabPanel header="About">
                    <Card title={nameEvent} subTitle={eventType} style={{ width: "70em" }}>
                        <div>
                            <span>Description:</span>
                            {descriptionEvent}
                        </div>
                        <br />
                        <div>
                            <span>Location: </span>
                            {location}
                        </div>
                        <br />
                        <Divider />
                        <div className=" p-fluid">
                            <h5>Comment Section </h5>
                            <div className="formgrid grid">
                                <div className="field col">
                                    <label htmlFor="name2">Comments</label>
                                    <InputText id="name2" type="text" />
                                </div>
                                <div className="field col">
                                    <label htmlFor="email2">Write a comment</label>
                                    <InputTextarea placeholder="Comment" autoResize rows="3" cols="30" />{" "}
                                    <Button style={{ marginTop: "10px" }} fullWidth disabled color="primary" variant="contained">
                                        Comment
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <span className="p-buttonset ">
                            <Link to={`/updateEvent/${_id}`}>
                                <Button className="p-button-rounded p-button-warning " label="Edit" icon="pi pi-check" />
                            </Link>
                            <Button onClick={() => deleteHandler(_id)} className="p-button-rounded p-button-danger" label="Delete" icon="pi pi-trash" />
                        </span>
                    </Card>
                </TabPanel>
                {/* <TabPanel header="Comments">
                      <p>
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                          aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                      </p>
                  </TabPanel> */}
            </TabView>
        </div>
    );
};

export default EventDetail;
