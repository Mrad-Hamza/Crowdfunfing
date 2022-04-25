// import React, { useEffect , Component} from "react";
// import axios from "axios";
// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import { useSelector, useDispatch } from "react-redux";
// import { setEvents } from "../../features/actions/eventActions";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";

// //import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// //import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// //import "./App.scss";

// // const events = () => {
// //     return <div>events</div>;
// // };

// // const locales = {
// //     "ar-TN": require("date-fns/locale/ar-TN"),
// // };

// // const localizer = dateFnsLocalizer({
// //     format,
// //     parse,
// //     startOfWeek,
// //     getDay,
// //     locales,
// // });

// // const eventsexamples = [
// //     {
// //         title: "Big Meeting",
// //         allDay: true,
// //         start: new Date(2022, 6, 0),
// //         end: new Date(2022, 6, 0),
// //     },
// //     {
// //         title: "Vacation",
// //         start: new Date(2022, 6, 0),
// //         end: new Date(2022, 6, 0),
// //     },
// //     {
// //         title: "Conference",
// //         start: new Date(2022, 6, 0),
// //         end: new Date(2022, 6, 0),
// //     },
// // ];

// //function Events() {
    
// //     const events = useSelector((state) => state);

// //     const dispatch = useDispatch();
// //     const fetchEvents = async () => {
// //         const response = await axios.get("http://localhost:5000/events/").catch((err) => {
// //             console.log("Err", err);
// //         });
// //         console.log("ekhdem");
// //         dispatch(setEvents(response.data));
// //     };
// //     useEffect(() => {
// //         fetchEvents();
// //     }, []);
// //     console.log(events);

// //     const eventss = useSelector((state) => state.allEvents.events);
// //     const eventsList = eventss.map((event) => {
// //     const { _id, nameEvent, } = event;

// //         return {
// //             eventsList,
// //         };
// //     });

// //     return (
        
// //         <div>
// //             <Calendar localizer={localizer} events={eventsList} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50" }} />
// //         </div>
// //     );
// // }

// moment.locale("en-GB");
// const localizer = momentLocalizer(moment);
// const myEventsList = {}; //empty object for now


// class Events extends Component {
//     constructor(props) {
//  super(props);
//  this.state = {
//      cal_events: [],
//  };    }
//     componentDidMount() {
//   let self = this;

//          axios
//              .get("http://localhost:5000/events/")
//              .then((response) => {
//                  let appointments = response.data;

//                  for (let i = 0; i < appointments.length; i++) {
//                      appointments[i].start = moment.utc(appointments[i].start).toDate();
//                      appointments[i].end = moment.utc(appointments[i].end).toDate();
//                  }
//                  self.setState({
//                      cal_events: appointments,
//                  });
//              })
//              .catch(function (error) {
//                  console.log(error);
//              });
//     }
//     render() {
//         const { cal_events } = this.state;

//         return <Calendar localizer={localizer} events={cal_events} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50" }} />;
//     }
// }

// export default Events;
