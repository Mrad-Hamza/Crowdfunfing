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

import { RemoveSelectedEvent, selectedEvent } from "../../features/actions/eventActions";

const EventDetail = () => {
    const event = useSelector((state) => state.event);
    const { nameEvent, descriptionEvent, urlEvent, startDateEvent, endDateEvent, location, eventType } = event;

    const { _id } = useParams();
    const dispatch = useDispatch();
    console.log(_id);
    const fetchProductDetail = async () => {
        const response = await axios.get(`http://localhost:5000/events/${_id}`).catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedEvent(response.data));
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
                    {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p> */}
                    <Card title={nameEvent} subTitle={eventType} style={{ width: "70em" }}>
                        {/* <div>
                              <a>
                                  <i className="pi pi-calendar-plus text-2xl text-blue-500"></i>
                              </a>
                              {startDateEvent}
                          </div> */}
                        <br />
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
