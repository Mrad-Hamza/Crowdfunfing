import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { setEvents } from "../../features/actions/eventActions";

import { Link } from "react-router-dom";

import URL from "../../features/constants/service.constants";
import FavoritesComponent from "./favoritesComponent";

const FavoriteList = () => {

    const events = useSelector((state) => state);
    const [text, setText] = useState("");

    const dispatch = useDispatch();
    const [globalFilter, setGlobalFilter] = useState(null);

    const fetchEvents = async () => {
        const response = await axios.get(process.env.REACT_APP_URI_SERVER + "/events/favorite").catch((err) => {
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
        <div className="card">
            <React.Fragment>

                <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
                    <h5 className="m-0">Favorites List</h5>
                </div>
            </React.Fragment>

            <div className=" grid">
                <FavoritesComponent />
            </div>
        </div>
    );


}

export default FavoriteList;
