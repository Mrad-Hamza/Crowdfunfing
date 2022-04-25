import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FacebookShareButton } from "react-share";
import {
    FacebookIcon,
} from "react-share";


// cd

const EventComponent = () => {
    const events = useSelector((state) => state.allEvents.events);
    const renderList = events.map((event) => {
        console.log(event.eventImage.imgName);
        console.log(`../../assets/layout/images/${event.eventImage.imgName}`);
        const { _id, nameEvent, descriptionEvent, startDateEvent, endDateEvent, location, eventImage } = event;

        return (
            <div className="col-12 md:col-4" key={_id}>
                <div className="card m-3 border-1 surface-border">
                    <div className="flex align-items-center justify-content-between"></div>
                    <div className="text-center">
                        <img src={`/uploads/${event.eventImage.imgName}`} alt="..." className="my-4 md:my-0 w-9 md:w-10rem shadow-2 mr-5" />
                        <div className="text font-semibold">{startDateEvent}</div>
                        <Link to={`/events/${_id}`}>
                            <div className="text-2xl font-bold mb-3">{event.nameEvent}</div>
                        </Link>
                        <div className="text-left font-bold mb-3">{location}</div>
                        {/* <Rating value={data.rating} readonly cancel={false} /> */}
                    </div>

                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-star-fill" label="I'm interested" />
                        <Button icon="pi pi-share-alt" />
                        {/* <FacebookShareButton>
                            <FacebookIcon logoFillColor="white" size={35} round={true}></FacebookIcon>
                        </FacebookShareButton> */}

                        {/* <Button icon="pi pi-shopping-cart" /> */}
                    </div>
                </div>
            </div>
        );
    });
    return renderList;
};

export default EventComponent;
