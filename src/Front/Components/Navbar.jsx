import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { Modal } from "antd";
import "antd/dist/antd.css";
import logo from "../Images/IndiegogoLogo.png";
import search from "../Images/search.png";
import LoginPopUpModal from "./RouteComponents/LoginPopUpModal";
import SignUp from "./RouteComponents/SignUpModal/SignUp";
import { NavbarUser } from "./NavbarComponents/NavbarUser";
import { UserModal } from "./NavbarComponents/UserModal";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import Explore from "./Explore/Explore";
import Avatar from "@mui/material/Avatar";
import { userService } from "../../Backoffice/pages/User/_services/user.service";


const Navbar = () => {
    let emptyUser = {
        _id: null,
        username: "",
        firstname: "",
        lastname: "",
        mailAddress: "",
        lockUntil: 0,
        img: {
            imgName: "NoPic.png",
        },
        loginAttempts: 0,
        roles: "",
    };

    const [modalVisibleLogin, setModalVisibleLogin] = useState(false);
    const [modalVisibleUser, setModalVisibleUser] = useState(false);
    const [exploreModalVisible, setExploreModalVisible] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [modalVisibleSignUp, setModalVisibleSignUp] = useState(false);
    const [user, setUser] = useState(emptyUser);
    const token = localStorage.getItem("token");
    const { isAuth } = token;
    const history = useHistory();

    useEffect(() => {
        setTimeout(() => {
            Promise.resolve(userService.getProfile()).then((value) => {
                setUser(value);
            });
        }, 2000);
    }, []);

    const NavbarStyle = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 10px;

        & > * > * {
            font-weight: 600;
            margin: 0px 5px;
            font-size: 17px;
            text-decoration: none;
            color: black;

            & :hover {
                color: #e51075;
            }
        }
    `;

    const Button = styled.button`
        background-color: white;
        border: none;

        & :hover {
            color: #e51075;
        }
    `;

    const leftLinks = [
        {
            to: "/whatwedo",
            title: "What We Do",
        },
    ];

    const rightLinks = [
        {
            to: "/campaignUser/"+localStorage.getItem('currentUserId'),
            title: "Campaign",
        },
        {
            to: "/campaign",
            title: "Start a Campaign",
        },
    ];

    const logout = (e) => {
        history.push("/");
        userService.logout();
        setTimeout(
            function () {
                //Start the timer
                window.location.reload(false);
            }.bind(this),
            1000
        );
    };

    const getUser = () => {};

    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    };

    const changeTextColor = (e) => {
        e.target.style.color = "#e51075";
    };

    const reverseTextColor = (e) => {
        e.target.style.color = "black";
    };
    return (
        <>
            {showSearchBar ? (
                <div style={{ marginTop: "4px" }}>
                    <SearchOutlined style={{ fontSize: "20px" }} />
                    <input placeholder="Search" style={{ border: "none", width: "90%", margin: "0px 15px" }} />
                    <CloseOutlined onClick={handleShowSearchBar} />
                </div>
            ) : (
                <NavbarStyle>
                    <div>
                        <NavLink to="/">
                            <img src={logo} alt="IndiegogoLogo" height="20px" />
                        </NavLink>
                        <Button onClick={() => this.setExploreModalVisible(true)}>Explore</Button>

                        <Modal width={1300} centered visible={exploreModalVisible} onCancel={() => this.setExploreModalVisible(false)} footer={null}>
                            <Explore />
                        </Modal>
                        {leftLinks.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.to}
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    color: "black",
                                }}
                                activeStyle={{ color: "black" }}
                                onMouseEnter={changeTextColor}
                                onMouseOut={reverseTextColor}
                            >
                                {item.title}
                            </NavLink>
                        ))}
                        <NavLink to="/search">
                            <img src={search} alt="searchIcon" height="15px" width="15px" onClick={handleShowSearchBar} />
                        </NavLink>
                    </div>
                    <div>
                        {rightLinks.map((item, i) => (
                            <NavLink
                                key={i}
                                to={item.to}
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    color: "black",
                                }}
                                activeStyle={{ color: "black" }}
                                onMouseEnter={changeTextColor}
                                onMouseOut={reverseTextColor}
                            >
                                {item.title}
                            </NavLink>
                        ))}
                        <span
                            style={{
                                border: "1px solid lightgrey",
                                width: "0px",
                            }}
                        />
                        {isAuth ? (
                            <span onClick={() => this.setModalVisibleUser(true)}>
                                <NavbarUser />
                            </span>
                        ) : (
                            <>
                                <Button onClick={() => history.push("/profile")}>
                                    <Avatar alt="" src={require("../../assets/layout/images/" + user.img.imgName)} />
                                </Button>
                                <Button onClick={logout}>Logout</Button>
                            </>
                        )}

                        <Modal width={170} closable={false} visible={modalVisibleUser} onOk={() => this.setModalVisibleUser(false)} onCancel={() => this.setModalVisibleUser(false)} footer={null} style={{ float: "right", margin: "-40px 0px" }}>
                            <UserModal />
                        </Modal>

                        <Modal centered width={350} visible={modalVisibleLogin} onOk={() => this.setModalVisibleLogin(false)} onCancel={() => this.setModalVisibleLogin(false)} footer={null}>
                            <LoginPopUpModal />
                        </Modal>

                        <Modal centered width={350} visible={modalVisibleSignUp} onOk={() => this.setModalVisibleSignUp(false)} onCancel={() => this.setModalVisibleSignUp(false)} footer={null}>
                            <SignUp />
                        </Modal>
                    </div>
                </NavbarStyle>
            )}
        </>
    );
};

export default Navbar;
