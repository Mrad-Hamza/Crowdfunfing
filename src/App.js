import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { Route, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { AppTopbar } from './components/layout/AppTopbar';
import { AppFooter} from './components/layout/AppFooter'
import {AppMenu} from './components/layout/AppMenu'
import { AppConfig } from './AppConfig';

import styled from "styled-components";

import { AccountBox } from './pages/User/Login/UserLogin/accountBox'
import UsersList from './pages/User/Login/Users/UsersList';

import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'prismjs/themes/prism-coy.css';
import './assets/demo/flags/flags.css';
import './assets/demo/Demos.scss';
import './assets/layout/layout.scss';
import './App.scss';
import { getIsRtlScrollbarOnLeft } from '@fullcalendar/core';


//import Modal from "react-modal";
import Events from "./pages/events/events";

import ProjectListing from "./pages/Projects/projectListing";
import ProjectDetails from "./pages/Projects/projectDetails";
//import routes from "./routes";
import Dashboard from "./components/Dashboard";
import PrimeReact from "primereact/api";
import "primereact/resources/primereact.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "prismjs/themes/prism-coy.css";
import "./assets/demo/flags/flags.css";
import "./assets/demo/Demos.scss";
import "./assets/layout/layout.scss";
import "./App.scss";
import createEventForm from "./pages/events/createEventForm";
import statisticsEvent from "./pages/events/statisticsEvent";
import eventListing from "./pages/events/eventListing"
// import showEvents from "./pages/events/showEvents";
import EventDetail from "./pages/events/eventDetail";
import ForumListing from "./pages/Forums/forumListing";
import ForumsComment from "./pages/Forums/ForumsComment";
import updateForum from "./pages/Forums/updateForum";
import forumCreate from "./pages/Forums/forumCreate";

const Crud = React.lazy(() => import("./pages/Crud"));
const EmptyPage = React.lazy(() => import("./pages/EmptyPage"));
//const Projects = React.lazy(() => import("./pages/Projects"));
const TimelineDemo = React.lazy(() => import("./pages/TimelineDemo"));

const App = () => {
    const [layoutMode, setLayoutMode] = useState("static");
    const [layoutColorMode, setLayoutColorMode] = useState("light");
    const [inputStyle, setInputStyle] = useState("outlined");
    const [ripple, setRipple] = useState(true);
    const [staticMenuInactive, setStaticMenuInactive] = useState(false);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [mobileMenuActive, setMobileMenuActive] = useState(false);
    const [mobileTopbarMenuActive, setMobileTopbarMenuActive] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();
    console.log("🚀 ~ file: App.js ~ line 41 ~ App ~ location", location);

    PrimeReact.ripple = true;

    let menuClick = false;
    let mobileTopbarMenuClick = false;


    const token = localStorage.getItem('token')

    useEffect(() => {
        if (mobileMenuActive) {
            addClass(document.body, "body-overflow-hidden");
        } else {
            removeClass(document.body, "body-overflow-hidden");
        }
    }, [mobileMenuActive]);


    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRipple = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onLayoutModeChange = (mode) => {
        setLayoutMode(mode);
    };

    const onColorModeChange = (mode) => {
        setLayoutColorMode(mode);
    };

    const onWrapperClick = (event) => {
        if (!menuClick) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }

        if (!mobileTopbarMenuClick) {
            setMobileTopbarMenuActive(false);
        }

        mobileTopbarMenuClick = false;
        menuClick = false;
    };

    const onToggleMenuClick = (event) => {
        menuClick = true;

        if (isDesktop()) {
            if (layoutMode === "overlay") {
                if (mobileMenuActive === true) {
                    setOverlayMenuActive(true);
                }

                setOverlayMenuActive((prevState) => !prevState);
                setMobileMenuActive(false);
            } else if (layoutMode === "static") {
                setStaticMenuInactive((prevState) => !prevState);
            }
        } else {
            setMobileMenuActive((prevState) => !prevState);
        }

        event.preventDefault();
    };

    const onSidebarClick = () => {
        menuClick = true;
    };

    const onMobileTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        setMobileTopbarMenuActive((prevState) => !prevState);
        event.preventDefault();
    };

    const onMobileSubTopbarMenuClick = (event) => {
        mobileTopbarMenuClick = true;

        event.preventDefault();
    };

    const onMenuItemClick = (event) => {
        if (!event.item.items) {
            setOverlayMenuActive(false);
            setMobileMenuActive(false);
        }
    };
    const isDesktop = () => {
        return window.innerWidth >= 992;
    }

    const AppContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    `;




    const menu = [
        {
            label: "Home",
            items: [{ label: "Dashboard", icon: "pi pi-fw pi-home", to: "/" }],
        },
        {
            label: "Modules",
            icon: "pi pi-fw pi-search",
            items: [
                {
                    label: "Users",
                    icon: "pi pi-fw pi-users",
                    items: [
                        {label: 'List', icon: 'pi pi-fw pi-list', to:'/UsersList'},
                        {label: 'Dashboad', icon: 'pi pi-fw pi-chart-line',to:'/'},
                    ]

                },
                {
                    label: "Campaigns",
                    icon: "pi pi-fw pi-tablet",
                    items: [
                        { label: "List", icon: "pi pi-fw pi-list" },
                        { label: "Dashboard", icon: "pi pi-fw pi-chart-line" },
                    ],
                },
                {
                    label: "Events",
                    icon: "pi pi-fw pi-calendar",
                    items: [
                        { label: "Calendar", icon: "pi pi-fw pi-calendar", to: "/events" },
                        { label: "Event", icon: "pi pi-fw pi-clone", to: "/create-event" },
                        { label: "ShowEvents", icon: "pi pi-fw pi-book", to: "/showEvents" },
                        { label: "Statistics", icon: "pi pi-fw pi-chart-line", to: "/statistcs" },
                    ],
                },
                {
                    label: "Projects",
                    icon: "pi pi-fw pi-flag",
                    items: [
                        { label: "List", icon: "pi pi-fw pi-list", to: "/projects" },
                        { label: "Tasks", icon: "pi pi-fw pi-clone" },
                        { label: "Dashboard", icon: "pi pi-fw pi-chart-line" },
                    ],
                },
                {
                    label: "Forums",
                    icon: "pi pi-fw pi-tag",
                    items: [
                        { label: "ListForums", icon: "pi pi-fw pi-list",to: "/forums" },
                        { label: "ListComments", icon: "pi pi-fw pi-list",to: "/comment" },
                        { label: "AddForum", icon: "pi pi-fw pi-list",to: "/add" },
                        { label: "Dashboards", icon: "pi pi-fw pi-chart-line" },
                    ],
                },
                {
                    label: "Transactions",
                    icon: "pi pi-fw pi-dollar",
                    items: [
                        { label: "List", icon: "pi pi-fw pi-list" },
                        { label: "Dashboards", icon: "pi pi-fw pi-chart-line" },
                    ],
                },
            ],
        },
    ];

    const addClass = (element, className) => {
        if (element.classList) element.classList.add(className);
        else element.className += " " + className;
    };

    const removeClass = (element, className) => {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }
    const wrapperClass = classNames('layout-wrapper', {
        'layout-overlay': layoutMode === 'overlay',
        'layout-static': layoutMode === 'static',
        'layout-static-sidebar-inactive': staticMenuInactive && layoutMode === 'static',
        'layout-overlay-sidebar-active': overlayMenuActive && layoutMode === 'overlay',
        'layout-mobile-sidebar-active': mobileMenuActive,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': ripple === false,
        'layout-theme-light': layoutColorMode === 'light'

    });



    if (token) {
         return (
         <div className={wrapperClass} onClick={onWrapperClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar onToggleMenuClick={onToggleMenuClick} layoutColorMode={layoutColorMode} mobileTopbarMenuActive={mobileTopbarMenuActive} onMobileTopbarMenuClick={onMobileTopbarMenuClick} onMobileSubTopbarMenuClick={onMobileSubTopbarMenuClick} />

            <div className="layout-sidebar" onClick={onSidebarClick}>
                <AppMenu model={menu} onMenuItemClick={onMenuItemClick} layoutColorMode={layoutColorMode} />
            </div>

            <div className="layout-main-container">
                <div className="layout-main">
                    <Route path="/" exact render={() => <Dashboard colorMode={layoutColorMode} location={location} />} />
                    <Route path="/timeline" component={TimelineDemo} />
                    <Route path="/empty" component={EmptyPage} />
                    <Route path="/UsersList" component={UsersList} />
                    {/* <Route path="/projects" component={Projects} /> */}
                    <Route path="/events" exact component={Events} />
                    <Route path="/create-event" component={createEventForm} />
                    <Route path="/statistcs"  component={statisticsEvent} />
                    <Route path="/showEvents" component={eventListing} />
                    <Route path="/events/:_id" component={EventDetail}/>
                    <Route path="/projects" exact component={ProjectListing} />
                    <Route path="/projects/:_id" component={ProjectDetails} />
                    <Route path="/forums" exact component={ForumListing} />
                    <Route path="/comment" component={ForumsComment}/>
                    <Route path="/edit/:_id" component={updateForum}/>
                    <Route path="/add" component={forumCreate}/>
  

                    
                    
                    
                </div>
                <AppFooter layoutColorMode={layoutColorMode} />
            </div>

            <AppConfig rippleEffect={ripple} onRippleEffect={onRipple} inputStyle={inputStyle} onInputStyleChange={onInputStyleChange} layoutMode={layoutMode} onLayoutModeChange={onLayoutModeChange} layoutColorMode={layoutColorMode} onColorModeChange={onColorModeChange} />

            <CSSTransition classNames="layout-mask" timeout={{ enter: 200, exit: 200 }} in={mobileMenuActive} unmountOnExit>
                <div className="layout-mask p-component-overlay"></div>
            </CSSTransition>
        </div>
    );
    }
    else {
        return (
            <AppContainer>
                 <AccountBox/>
            </AppContainer>
        );
    }
}
export default App;
