import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";

import EventComponent from "./eventComponent";
import URL from "../../features/constants/service.constants";
import { setEvents } from "../../features/actions/eventActions";
import {getEventsByFilter} from "../../features/actions/eventActions";

const EventListing = () => {
    const events = useSelector((state) => state);
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const [globalFilter, setGlobalFilter] = useState(null);

    const fetchEvents = async () => {
        const response = await axios.get(URL.baseApiUrl + URL.events.fetchEvents).catch((err) => {
            console.log("Err", err);
        });
        console.log("ekhdem");
        dispatch(setEvents(response.data));
    };
    useEffect(() => {
        fetchEvents();
    }, []);
    console.log(events);


    const handleSearch = (e) => {
        setText(e.target.value);
        dispatch(getEventsByFilter({ type: "text", query: e.target.value }));
    };
   
    

    return (
                

        <div className="card">
            <React.Fragment>
                <div className="col-12 md:col-6 my-2">
                    <Link to="/create-event">
                        <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                    </Link>
                </div>
               
                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">All Events</h5>
                    <span className="block mt-2 md:mt-0 p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText type="search" placeholder="Search..." value={text} onChange={handleSearch} />
                    </span>
                </div>
            </React.Fragment>

            <div className=" grid"  >
                <EventComponent />
            </div>
        </div>
    );
};

export default EventListing;
