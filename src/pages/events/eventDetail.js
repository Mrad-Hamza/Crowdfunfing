import React ,{useEffect} from 'react'; 
import {useParams} from 'react-router-dom'
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { GMap } from "primereact/gmap";




import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { RemoveSelectedEvent, selectedEvent } from '../../features/actions/eventActions';

const EventDetail = () => {
    const event = useSelector((state)=>state.event)
    const { nameEvent, descriptionEvent, urlEvent, startDateEvent , endDateEvent,location} = event;

    const { _id } = useParams();
    const dispatch = useDispatch();
    console.log(_id);
    const fetchProductDetail = async () => {
        const response = await axios.get(`http://localhost:5000/events/${_id}`)
        .catch((err) => {
            console.log("Err", err);
        });
        dispatch(selectedEvent(response.data));
    }; 

    const header = <img alt="Card" src="images/usercard.png" onError={(e) => (e.target.src = "https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png")} />;
    const footer = (
        <span>
            <Button label="Save" icon="pi pi-check" />
            <Button label="Cancel" icon="pi pi-calendar" className="p-button-secondary ml-2" />
        </span>
    );
    useEffect(()=>{
        if(_id && _id !== "") fetchProductDetail();
        return ()=>{
            dispatch(RemoveSelectedEvent())
        };
    },[_id]);
  return (
      <div className="ui grid container">

          <div className="card">
              <TabView>
                  <TabPanel header="About">
                      {/* <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                      </p> */}
                      <Card title={nameEvent} subTitle={location} style={{ width: "50em" }}>
                          <div>
                              <a>
                                  <i className="pi pi-calendar-plus text-2xl text-blue-500"></i>
                              </a>
                              {startDateEvent}
                          </div>

                          <p className="m-0" style={{ lineHeight: "1.5" }}>
                              {descriptionEvent}
                          </p>
                      </Card>
                  </TabPanel>
                  <TabPanel header="Comments">
                      <p>
                          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur
                          aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                      </p>
                  </TabPanel>
              </TabView>
          </div>
          {/* {Object.keys(event).length === 0 ? (
              <div>...Loading</div>
          ) : (
              <div className="ui placeholder segment">
                  <div className="ui two column stackable center aligned grid">
                      <div className="ui vertical divider"></div>
                      <div className="middle aligned row">
                          <div className="column lp">
                              <img className="ui fluid image" />
                          </div>
                          <div className="column rp">
                              <h1>{nameEvent}</h1>
                              <h2>
                                  <a className="ui teal tag label">${descriptionEvent}</a>
                              </h2>
                              <h3 className="ui brown block header">{urlEvent}</h3>
                              <div className="ui vertical animated button" tabIndex="0">
                                  <div className="hidden content">
                                      <i className="shop icon"></i>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          )} */}
      </div>
  );  
}

export default EventDetail;