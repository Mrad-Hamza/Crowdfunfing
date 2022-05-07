import React, { useEffect, Component } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setEvents } from "../../features/actions/eventActions";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

//import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";




const eventsexamples = [
    {
        title: "Big Meeting",
        allDay: true,
        start: new Date(2022, 6, 0),
        end: new Date(2022, 6, 0),
    },
    {
        title: "Vacation",
        start: new Date(2022, 6, 0),
        end: new Date(2022, 6, 0),
    },
    {
        title: "Conference",
        start: new Date(2022, 6, 0),
        end: new Date(2022, 6, 0),
    },
];


moment.locale("en-GB");
const localizer = momentLocalizer(moment);
const myEventsList = {}; //empty object for now


class Events extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cal_events: [],
        };
    }

    componentDidMount() {
        let self = this;
        axios
            .get(process.env.REACT_APP_URI_SERVER + "/events/")
            .then((response) => {
                let events = response.data;
                console.log(response.data.nameEvent);

                for (let i = 0; i < events.length; i++) {
                    events[i].start = moment.utc(events[i].start).toDate();
                    events[i].end = moment.utc(events[i].end).toDate();
                }
                console.log(events.nameEvent);
                self.setState({
                    cal_events: events,
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        const { cal_events } = this.state;

        return <Calendar localizer={localizer} events={cal_events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50" }} />;
    }
}

export default Events;

// export default Events;
