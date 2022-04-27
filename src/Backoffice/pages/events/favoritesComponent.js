import React from 'react'
import { Button } from "primereact/button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { eventService } from "./eventService";
const FavoritesComponent = () => {
    const events = useSelector((state) => state.allEvents.events);
    const renderList = events.map((event) => {
        console.log(event.eventImage.imgName);
        console.log(`../../assets/layout/images/${event.eventImage.imgName}`);
        const { _id, nameEvent, descriptionEvent, startDateEvent, endDateEvent, location, eventImage ,eventType,status} = event;
   const notInterestd = () => {
       eventService.notInterested(event._id)
       window.location.reload(false);
   };
        return (
            <div className="col-12 md:col-4" key={_id}>
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between"></div>
                    <div className="flex align-items-center justify-content-between">
                        <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{eventType}</span>
                        </div>
                    </div>
                    <br />
                    <div className="text-center">
                        <img src={`/uploads/${event.eventImage.imgName}`} alt="..." className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                        <div className="text font-semibold">{startDateEvent}</div>
                        <Link to={`/events/${_id}`}>
                            <div className="text-2xl font-bold mb-3">{event.nameEvent}</div>
                        </Link>

                        <div className="flex align-items-center">
                            <i className="pi pi-home mr-2" />
                            <span className="font-semibold">{location}</span>
                        </div>
                        <br />
                        {/* <Rating value={data.rating} readonly cancel={false} /> */}
                    </div>

                    <div className="flex align-items-center justify-content-between">
                        <Button label={status} icon="pi pi-bookmark" className="mr-2 mb-2" onClick={notInterestd}></Button>
                    </div>
                </div>
            </div>
        );
    });
    return renderList;
};


export default FavoritesComponent