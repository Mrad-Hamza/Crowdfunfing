import React, { useState, useEffect } from "react";
import { Switch, Route, Link } from "react-router-dom";
import Chatbot from "react-chatbot-kit";
import MessageParser from "../../chatbot/MessageParser";

import ActionProvider from "../../chatbot/ActionProvider";
import "react-chatbot-kit/build/main.css";
import "../../chatbot/chatbot.scss";
import Navbar from "./Navbar";
import { Home } from "./RouteComponents/Home";
import { WhatWeDo } from "./RouteComponents/WhatWeDo";
import { Search } from "./RouteComponents/Search";
import { ForEntrepreneurs } from "./RouteComponents/ForEntrepreneurs";
import { Campaign } from "./RouteComponents/Campaign";
import { CampaignUser } from "./RouteComponents/CampaignUser";
import { ForumList } from "./RouteComponents/forumListing";
import ProfilePage from "../Components/ExploreProject/ProfilePage/ProfilePage";
import { Footer } from "./Footer";
import CollectionsPage from "./HomeComponents/Collections/CollectionsPage";
import Story from "./HomeComponents/popularProductsPageExtended/deatiledAdvertisement/deatiledAdvertisementComponents/Story";
import Faq from "./HomeComponents/popularProductsPageExtended/deatiledAdvertisement/deatiledAdvertisementComponents/Faq";
import PopularProductsPage from "./HomeComponents/popularProductsPageExtended/PopularProductsPage";
import { ExploreProducts } from "./ExploreProject/Project";
import ProjectDetailsFront from "./RouteComponents/ProjectDetailsFront";
import TaskDetailsFront from "./RouteComponents/TaskDetailsFront";
import InvoiceProjectAdd from "../../Backoffice/pages/Projects/InvoiceProjects/invoiceAdd";
import ComplaintProjectAdd from "../../Backoffice/pages/Projects/ComplaintProjects/complaintAdd";
import TaskProjectAdd from "../../Backoffice/pages/Projects/tasks/TaskProjectAdd";
import InvoiceTaskAdd from "../../Backoffice/pages/Projects/tasks/InvoiceTasks/invoiceTaskAdd";
import ComplaintTaskAdd from "../../Backoffice/pages/Projects/tasks/ComplaintTasks/complaintTaskAdd";
import getConfig from "../../chatbot/config";
import config from "../../chatbot/config";
import EventListing from "../../Backoffice/pages/events/eventListing";
const Routes = () => {
    const [show, toggleShow] = useState(true);
    console.log("🚀 ~ file: Routes.jsx ~ line 35 ~ Routes ~ show", show);

    useEffect(() => {
        const handleOutsideClick = (e) => {
            // simple implementation, should be made more robust.
            if (!e.currentTarget.classList.includes("react-chatbot-kit")) {
                toggleShow(false);
            }
        };

        window.addEventListener("click", handleOutsideClick);

        return () => {
            window.removeEventListener("click", handleOutsideClick);
        };
    }, []);

    const onClick = () => toggleShow(false);
    return (
        <>
            <Navbar />
            {/* <Link to = "/popularPage" style = {{textDecoration: "none"}}>
                  SEE COLLECTION
                </Link> */}
            <hr
                style={{
                    border: "1px solid lightgrey",
                    marginLeft: "-8px",
                    width: "100%",
                    borderBottom: "none",
                }}
            />
            <Switch>
                <Route path="/whatwedo" component={(props) => <WhatWeDo {...props} />} />
                {/* <Route path="/search" component={(props) => <Search {...props} />} />
        <Route
        path="/entrepreneurs"
        component={(props) => <ForEntrepreneurs {...props} />}
      /> */}

                <Route path="/forum" component={(props) => <ForumList {...props} />} />
                <Route path="/campaign" component={(props) => <Campaign {...props} />} />
                <Route path="/events" component={(props) => <EventListing {...props} />} />

                <Route path="/projects/:_id" exact component={(props) => <ProjectDetailsFront {...props} />} />
                {/* <Route path="/projects/task/:_id" exact component={TaskDetails} /> */}
                <Route path="/projects/taskById/:_id" component={(props) => <TaskDetailsFront {...props} />} />
                <Route path="/projects/invoiceProject/add/:_id" component={(props) => <InvoiceProjectAdd {...props} />} />
                <Route path="/projects/complaintProject/add/:_id" component={(props) => <ComplaintProjectAdd {...props} />} />
                <Route path="/projects/taskProject/add/:_id" exact component={(props) => <TaskProjectAdd {...props} />} />
                <Route path="/projects/task/invoice/add/:_id" component={(props) => <InvoiceTaskAdd {...props} />} />
                <Route path="/projects/task/complaint/add/:_id" component={(props) => <ComplaintTaskAdd {...props} />} />

                <Route path="/CampaignUser/:_id" component={(props) => <CampaignUser {...props} />} />
                {/* <Route path = "/popularPage" render = {(props) => <PopularProductsPage {...props} />} /> */}
                <Route path="/" exact render={(props) => <Home {...props} />} />
                <Route path="/collections" render={(props) => <CollectionsPage {...props} />} />
                <Route path="/profile" render={(props) => <ProfilePage {...props} />} />
                <Route exact path="/explore_products" render={(props) => <ExploreProducts {...props} />} />
                <Route exact path="/" component={(props) => <Home {...props} />} />
            </Switch>
            <Route path="/popularPage" render={(props) => <PopularProductsPage {...props} />} />
            <Route path="/popularPage/story" render={(props) => <Story {...props} />} />
            <Route path="/popularPage/faq" render={(props) => <Faq {...props} />} />
            {/* <Switch>
        <Route path = "/popularPage/story" render = {(props) => <Story {...props} /> } />
        <Route path = "/popularPage/faq" render = {(props) => <Faq {...props} /> } />
      </Switch> */}
            <div style={{ position: "fixed", bottom: "0", zIndex: "1000", width: "100%", height: "40px", backgroundColor: "white" }}></div>
            <div style={{ position: "fixed", bottom: "0", zIndex: "1000", right: "0" }}>
                <div>{show ? <Chatbot messageParser={MessageParser} actionProvider={ActionProvider} config={getConfig(onClick)} /> : null}</div>
            </div>
            <Footer />
        </>
    );
};
export { Routes };
