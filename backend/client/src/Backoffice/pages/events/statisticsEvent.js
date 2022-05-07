import React, { useState, useEffect } from "react";
import axios from "axios";

const StatisticsEvent = () => {
    const [numberResult, setNumber] = useState([]);
    const [number, setnumber] = useState([]);
    const [online, setOnline] = useState([]);
    useEffect(() => {
        axios.get(process.env.REACT_APP_URI_SERVER + "/statis/getAll").then((result) => {
            console.log(result.data);
            setNumber(result.data);
        });
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URI_SERVER + "/statis/inPersonEvent").then((result) => {
            console.log(result.data);
            setnumber(result.data);
        });
    }, []);

    useEffect(() => {
        axios.get(process.env.REACT_APP_URI_SERVER + "/statis/onlineEvent").then((result) => {
            console.log(result.data);
            setOnline(result.data);
        });
    }, []);


    return (
        <div className="grid">
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Events</span>
                            <div className="text-900 font-medium text-xl">{numberResult}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-blue-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-calendar text-blue-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{numberResult} </span>
                    <span className="text-500">Events</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">In Person Event</span>
                            <div className="text-900 font-medium text-xl">{number}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-orange-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-map-marker text-orange-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{number} </span>
                    <span className="text-500">events in person</span>
                </div>
            </div>
            <div className="col-12 lg:col-6 xl:col-3">
                <div className="card mb-0">
                    <div className="flex justify-content-between mb-3">
                        <div>
                            <span className="block text-500 font-medium mb-3">Online Events</span>
                            <div className="text-900 font-medium text-xl">{online}</div>
                        </div>
                        <div className="flex align-items-center justify-content-center bg-cyan-100 border-round" style={{ width: "2.5rem", height: "2.5rem" }}>
                            <i className="pi pi-video text-cyan-500 text-xl" />
                        </div>
                    </div>
                    <span className="text-green-500 font-medium">{online}</span>
                    <span className="text-500"> events online</span>
                </div>
            </div>
        </div>
    );
};

export default StatisticsEvent;
