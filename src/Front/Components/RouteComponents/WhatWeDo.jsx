import React from "react";
import styled from "styled-components";

import motorCycle from "../../Images/motorcycle.png";
import spark from "../../Images/spark.png";

const HeadImg = styled.div`
    position: relative;

    & img {
        height: 400px;
        margin-top: -8px;
    }

    & div {
        position: absolute;
        top: 20%;
        left: 29%;
    }
`;

const ExploreProjectsBtn = styled.div`
    border: 2px solid #e51075;
    color: #e51075;
    font-size: 20px;
    width: 200px;
    padding: 5px;
    margin: 10px auto;

    :hover {
        background-color: #e51075;
        color: white;
    }
`;

const CampaignGrid = styled.div`
    margin: 50px auto;
    height: 900px;
    margin-left: 5%;
    padding: 20px 5px;
    display: grid;
    grid-template-columns: auto auto;
    grid-template-rows: 600px 600px;
    grid-template:
        "left1 right"
        "left2 right";

    #left1 {
        grid-area: left1;
    }

    #left2 {
        grid-area: left2;
    }

    #right {
        grid-area: right;
        background-color: #d7f4ea;
        width: 600px;
        margin-right: -305px;

        & img {
            margin-top: 78px;
            margin-left: -200px;
            transform: rotate(60deg);
        }
    }
`;

const favCardTop = [];

const favCardBottom = [];

const FavCampaignComponent = ({ imgSrc, head, count, content }) => {};

const WhatWeDo = () => {
    return <></>;
};

export { WhatWeDo };
