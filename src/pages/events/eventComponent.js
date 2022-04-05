import React from "react";
import { useSelector } from "react-redux";
import { Link} from "react-router-dom";
import { Button } from "primereact/button";


const EventComponent = () => {
    const events = useSelector((state) => state.allEvents.events);
    const renderList = events.map((event)=>{
    const { _id, nameEvent, descriptionEvent, startDateEvent, endDateEvent , location} = event;

        return (
            // <div className="four column wide" key={_id}>
            //     <Link to={`/events/${_id}`}>
            //         <div className="ui link cards">
            //             <div className="card">
            //                 <div className="image"></div>
            //                 <div className="content">
            //                     <div className="header">{nameEvent}</div>
            //                     <div className="meta price">{descriptionEvent}</div>
            //                     {/* <div>{startDateEvent}</div> */}
            //                 </div>
            //             </div>
            //         </div>
            //     </Link>

            // </div>
            
                <div className="col-12 md:col-4" key={_id}>
                    <div className="card m-3 border-1 surface-border">
                        <div className="flex align-items-center justify-content-between">
                            {/* <div className="flex align-items-center">
                            <i className="pi pi-tag mr-2" />
                            <span className="font-semibold">{data.category}</span>
                        </div> */}
                            {/* <span className={`product-badge status-${data.inventoryStatus.toLowerCase()}`}>{data.inventoryStatus}</span> */}
                        </div>
                        <div className="text-center">
                            <img className="w-9 shadow-2 my-3 mx-0" />
                            <div className="text font-semibold">{startDateEvent}</div>
                            <Link to={`/events/${_id}`}>
                                <div className="text-2xl font-bold mb-3">{nameEvent}</div>
                            </Link>
                            <div className="text-left font-bold mb-3">{location}</div>

                            {/* <Rating value={data.rating} readonly cancel={false} /> */}
                        </div>

                        <div className="flex align-items-center justify-content-between">
                            <Button icon="pi pi-star-fill" label="I'm Interested" />
                            <Button icon="pi pi-share-alt" />

                            {/* <Button icon="pi pi-shopping-cart" /> */}
                        </div>
                    </div>
                </div>
           
        );
    });
    return renderList;
    
};

export default EventComponent;