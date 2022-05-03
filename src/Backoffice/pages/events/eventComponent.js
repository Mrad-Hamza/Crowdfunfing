import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
 import ThumbUpIcon from "@mui/icons-material/ThumbUp";
  import IconButton from "@mui/material/IconButton";
  import ShareIcon from "@mui/icons-material/Share";
import { eventService } from "./eventService";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const EventComponent = () => {
    const events = useSelector((state) => state.allEvents.events);
    const [statut, setStatut] = useState();


    const renderList = events.map((event) => {
        console.log(event.eventImage.imgName);
        console.log(`../../assets/layout/images/${event.eventImage.imgName}`);
        const { _id, nameEvent, descriptionEvent, startDateEvent, endDateEvent, location, eventImage ,eventType,status} = event;
        const isAddNotValid =  status === "NotInterested";

         const interested = () => {
        eventService.interested(event._id)
        window.location.reload(false);
 };
  const notInterestd = () => {
      eventService.notInterested(event._id);
      window.location.reload(false);
  };

  
        return (
            <div className="col-12 md:col-4" key={_id} >
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
                    </div>

                    <div className="flex align-items-center justify-content-between">
                        {isAddNotValid ? <FavoriteBorderIcon fontSize="large" label={status} onClick={interested} /> : <FavoriteIcon label={status} fontSize="large" onClick={notInterestd} />}

                        <IconButton aria-label="share">
                            <ShareIcon fontSize="large" />
                        </IconButton>
                    </div>
                </div>
            </div>
        );
    });
    return renderList;
};

export default EventComponent;
