import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import axios from "axios";

import { createEventAction } from "../../features/actions/eventActions";

import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RadioButton } from "primereact/radiobutton";

import { InputText } from "primereact/inputtext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";

import { TextField } from "@mui/material";

function FormLayoutDemo({ history }) {
    const [nameEvent, setnameEvent] = useState("");
    const [startDateEvent, setstartDateEvent] = useState("");
    const [endDateEvent, setendDateEvent] = useState("");
    const [descriptionEvent, setdescriptionEvent] = useState("");
    const [urlEvent, seturlEvent] = useState("");
    const [location, setlocation] = useState("");
    const [eventType, seteventType] = useState("");

    const dispatch = useDispatch();
    const toast = useRef();
    const message = useRef();
    //const [value, onChange] = useState(new Date());
    const [value, setValue] = React.useState(new Date("2018-01-01T00:00:00.000Z"));

    const [fileName, setFileName] = useState("");

    const onChangeFile = (e) => {
        setFileName(e.target.files[0]);
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

        formData.append("eventImage", fileName);
        console.log(formData);
        axios.post(process.env.REACT_APP_URI_SERVER + `/events/createEvent`, formData);
        history.push("/showEvents");
    };

    const createEvent = useSelector((state) => state.createEvent);
    const resetHandler = () => {
        setnameEvent("");
        setstartDateEvent("");
        setendDateEvent("");
        setdescriptionEvent("");
        setlocation("");
        seturlEvent("");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(createEventAction(nameEvent, startDateEvent, endDateEvent, descriptionEvent, location, urlEvent));
        if (!nameEvent || !startDateEvent || !endDateEvent || !descriptionEvent || !location || !urlEvent) return;
        resetHandler();
        history.push("/showEvents");
    };

    useEffect(() => {}, []);

    return (
        <div className="grid" style={{ width: "1500px", display: "flex", justifyContent: "center" }}>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Create an event </h5>
                    <Form onSubmit={changeOnclick} encType="multipart/form-data">
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <br />
                            <br />
                            <div>
                                <InputText id="name1" type="text" required value={nameEvent} placeholder="Enter the name" onChange={(e) => setnameEvent(e.target.value)} />
                            </div>
                        </div>
                        <div className="grid">
                            <div className="col-12 md:col-6">
                                <label htmlFor="startDate">Start Date</label>
                                <br />
                                <br />
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        renderInput={(params) => <TextField {...params} />}
                                        value={startDateEvent}
                                        onChange={(startDateEvent) => {
                                            setstartDateEvent(startDateEvent);
                                        }}
                                    />
                                </LocalizationProvider>
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

                        <div>
                            <label htmlFor="file">choose image</label>
                            <br />
                            <br />
                            <input type="file" fileName="eventImage" className="form-control-file" onChange={onChangeFile} />
                        </div>
                        <br />
                        <br />
                        <label htmlFor="type">Type:</label>

                        <RadioButton value="Virtual" name="Virtual" onChange={(e) => seteventType(e.target.value)} checked={eventType === "Virtual"} />
                        <label htmlFor="Virtual">Virtual</label>

                        <RadioButton value="InPerson" name="InPerson" onChange={(e) => seteventType(e.target.value)} checked={eventType === "InPerson"} />
                        <label htmlFor="InPerson">InPerson</label>

                        <br />
                        <br />
                        <div className="grid">
                            <Toast ref={toast} />

                            <div className="col-12 md:col-4">
                                <Button type="submit" label="Publish" className="p-button-primary p-button-rounded mb-2 mr-2" />
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
}

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);
