// import React from 'react'

// const createEventForm = () => {
//   return (
//     <div>createEventForm</div>
//   )
// }

// export default createEventForm

import React, { useState, useRef } from "react";
import { Toast } from "primereact/toast";

import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";


import { Message } from "primereact/message";

import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { TextField } from "@mui/material";

const FormLayoutDemo = () => {
    const toast = useRef();
    const message = useRef();
      //const [value, onChange] = useState(new Date());
        const [value, setValue] = React.useState(new Date("2018-01-01T00:00:00.000Z"));



    const showSuccess = () => {
        toast.current.show({ severity: "success", summary: "Success Message", detail: "Message Detail", life: 3000 });
    };

    return (
        <div className="grid">
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Create an event </h5>
                    <div className="field">
                        <label htmlFor="name1">Name</label>
                        <br />
                        <br />
                        <div>
                            <InputText id="name1" type="text" required />
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
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
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
                                    value={value}
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </LocalizationProvider>
                            {/* <Calendar showIcon showButtonBar></Calendar> */}
                        </div>
                    </div>
                    <br />
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <InputTextarea placeholder="Describing" autoResize rows="3" cols="30" required />
                    </div>
                    <div className="field">
                        <label htmlFor="location">Location</label>
                        <br />
                        <InputText id="location" type="text" />
                    </div>
                    <div className="field">
                        <label htmlFor="url">Url</label>
                        <br />
                        <InputText id="url" type="text" required />
                    </div>
                    <label htmlFor="description">Type</label>
                    <br />
                    <br />

                    <div className="grid">
                        <Toast ref={toast} />

                        <div className="col-12 md:col-4">
                            <Button type="button" onClick={showSuccess} label="Publish" className="p-button-primary p-button-rounded mb-2 mr-2" />
                        </div>
                        <div className="col-12 md:col-4">
                            <Button type="button" label="Discard" className="p-button-secondary p-button-rounded mb-2 mr-2" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);
