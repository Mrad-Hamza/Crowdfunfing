import React , {useEffect} from "react";
import axios from "axios";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import EventComponent from "./eventComponent";
import URL from "../../features/constants/service.constants";
import { setEvents } from "../../features/actions/eventActions";

const EventListing = () => {
    const events = useSelector((state) => state);
    const dispatch = useDispatch();

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

    
    return (
        <div>
            <Link to="/create-event">
                <button>zigei</button>
            </Link>

            <div className="card grid">
                <EventComponent />
            </div>
        </div>
    );
};

export default EventListing;
