import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { InputText } from "primereact/inputtext";
import { updateEventAction } from "../../features/actions/eventActions";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Form } from "react-bootstrap";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { TextField } from "@mui/material";
import { RadioButton } from "primereact/radiobutton";



function SignleEvent({ match, history }) {
    const toast = useRef();
    const [nameEvent, setnameEvent] = useState();
    const [startDateEvent, setstartDateEvent] = useState();
    const [endDateEvent, setendDateEvent] = useState();
    const [descriptionEvent, setdescriptionEvent] = useState();
    const [urlEvent, seturlEvent] = useState();
    const [location, setlocation] = useState();
    const [date, setDate] = useState("");
    const [eventType, seteventType] = useState("");
    const eventUpdate = useSelector((state) => state.eventUpdate);
    const { idEvent } = useParams();
    const dispatch = useDispatch();
    console.log(idEvent);

    useEffect(() => {
        const fetching = async () => {
            const { data } = await axios.get(process.env.REACT_APP_URI_SERVER + `/events/${idEvent}`);
            setnameEvent(data.nameEvent);
            setstartDateEvent(data.startDateEvent);
            setendDateEvent(data.endDateEvent);
            setdescriptionEvent(data.descriptionEvent);
            setlocation(data.location);
            seturlEvent(data.urlEvent);
            seteventType(data.eventType);
            //setFileName(data.eventImage);
            //setDate(data.updatedAt);
        };
        fetching();
    }, [idEvent, date]);

    const resetHandler = () => {
        setnameEvent("");
        setstartDateEvent("");
        setendDateEvent("");
        setdescriptionEvent("");
        setlocation("");
        seturlEvent("");
    };

    const changeOnclick = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("nameEvent", nameEvent);
        formData.append("startDateEvent", startDateEvent);
        formData.append("endDateEvent", endDateEvent);
        formData.append("descriptionEvent", descriptionEvent);
        formData.append("urlEvent", urlEvent);
        formData.append("location", location);
        formData.append("eventType", eventType);

        //formData.append("eventImage", fileName);

        axios.put(process.env.REACT_APP_URI_SERVER + `/events/update/${idEvent}`, formData);
        history.push("/showEvents");
        window.location.reload(false);


    };
    const updateHandler = (e) => {
        e.preventDefault();
        dispatch(updateEventAction(idEvent, nameEvent, startDateEvent, endDateEvent, descriptionEvent, location, urlEvent));
        if (!nameEvent || !startDateEvent || !endDateEvent || !descriptionEvent || !location || !urlEvent) return;

        resetHandler();
        history.push("/showEvents");
    };
    const [fileName, setFileName] = useState("");

    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
    };
    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Edit an event </h5>
                    <Form onSubmit={changeOnclick} encType="multipart/form-data">
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <br />
                            <br />
                            <div>
                                <InputText id="name1" type="text" required value={nameEvent} placeholder="Enter the name" onChange={(e) => setnameEvent(e.target.value)} />
                                {/* <Message severity="error" text="Username is required" /> */}
                            </div>
                        </div>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <label htmlFor="startDate">Start Date</label>
                                <br />
                                <br />
                                {/* <DateTimePicker showIcon showButtonBar></DateTimePicker> */}
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        value={startDateEvent}
                                        onChange={(startDateEvent) => {
                                            setstartDateEvent(startDateEvent);
                                        }}
                                    />
                                </LocalizationProvider>
                                {/* <Calendar showIcon showButtonBar></Calendar> */}
                            </div>
                            <br />
                            <div className="col-12 md:col-6">
                                <label htmlFor="endDate">End Date</label>
                                <br />
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        value={endDateEvent}
                                        onChange={(endDateEvent) => {
                                            setendDateEvent(endDateEvent);
                                        }}
                                    />
                                </LocalizationProvider>
                                {/* <Calendar showIcon showButtonBar></Calendar> */}
                            </div>
                        </div>
                        <br />
                        <div className="field">
                            <label htmlFor="description">Description</label>
                            <InputTextarea placeholder="Describing" autoResize rows="3" cols="30" required value={descriptionEvent} onChange={(e) => setdescriptionEvent(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="location">Location</label>
                            <br />
                            <InputText id="location" type="text" required value={location} onChange={(e) => setlocation(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="url">Url</label>
                            <br />
                            <InputText id="url" type="text" required value={urlEvent} onChange={(e) => seturlEvent(e.target.value)} />
                        </div>
                        <br />
                        <br />

                        <label htmlFor="type">Type:</label>

                        <RadioButton value="Virtual" name="Virtual" onChange={(e) => seteventType(e.target.value)} checked={eventType === "Virtual"} />
                        <label htmlFor="Virtual">Virtual</label>

                        <RadioButton value="InPerson" name="InPerson" onChange={(e) => seteventType(e.target.value)} checked={eventType === "InPerson"} />
                        <label htmlFor="InPerson">InPerson</label>

                        <div className="grid">
                            <Toast ref={toast} />

                            <div className="col-12 md:col-4">
                                <Button type="submit" label="Edit" className="p-button-primary p-button-rounded mb-2 mr-2" />
                            </div>
                            <div className="col-12 md:col-4">
                                <Button type="button" label="Discard" onClick={resetHandler} className="p-button-secondary p-button-rounded mb-2 mr-2" />
                            </div>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default SignleEvent
