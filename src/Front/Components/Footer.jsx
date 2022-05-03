import React from "react";
import styled from "styled-components";
import "antd/dist/antd.css";
import footMailImg from "../Images/FooterMailImg.png";
import { Modal } from "antd";
import { FacebookOutlined, TwitterOutlined, YoutubeFilled, InstagramOutlined, LinkedinFilled } from "@ant-design/icons";
import { CurrencyModal } from "./FooterComponents/CurrencyModal";

const FooterStyle = styled.div`
    clear: both;
    background: #f5f5f5;
    height: auto;
    width: 100%;
    position: absolute;
    bottom: 50;
    left: 0;
    padding: 60px 10px;
`;

const FooterList = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    margin: 0px 50px;
    font-size: 17px;
`;

const FooterCard = styled.div`
    margin-left: 100px;
`;

const BottomIcon = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    margin-left: 20%;

    & div {
        margin: 7px;
    }
    & button {
        background: white;
        border: 1px solid lightgrey;
        width: 150px;
        margin-top: -8px;
        padding: 7px;
    }
`;

const currencies = ["UAE Dirham (AED)", " $ Australian Dollar (AUD)", "R$ Brazilian Real (BRL)", "$ Canadian Dollar (CAD)", "Fr  Swiss Franc (CHF)", "€ Euro (EUR)", "₹ Indian Rupee (INR)", "¥ Japanese Yen (JPY)", "$ US Dollar (USD)"];

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalVisibleCurrency: false,
            currency: "₹ Indian Rupee (INR)",
        };
    }

    setModalVisibleCurrency(modalVisibleCurrency) {
        this.setState({ modalVisibleCurrency });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    render() {
        return (
            <FooterStyle>
                {/* -----Footer Top Section ------ */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                    }}
                >
                    <FooterList>
                        <div style={{ color: "grey" }}>EXPLORE</div>
                        <br />
                        <div>What we do</div>
                        <div>Funding</div>
                        <div>GoFundMe</div>
                    </FooterList>
                    <FooterList>
                        <div style={{ color: "grey" }}>ABOUT</div>
                        <br />
                        <div>About Us</div>
                        <div>Blog</div>
                        <div>Contact</div>
                    </FooterList>
                    <FooterList>
                        <div style={{ color: "grey" }}>ENTREPRENEURS</div>
                        <br />
                        <div>How it Works</div>
                    </FooterList>
                    <FooterCard>
                        <div>
                            <strong> Find it first on Fundise</strong>
                        </div>
                        <div>Discover our projects</div>
                        <br />
                        <br />
                    </FooterCard>
                </div>
                <br />
                {/* ---------Footer Bottom Section ---------- */}
            </FooterStyle>
        );
    }
}

export { Footer };
