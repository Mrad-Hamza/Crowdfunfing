import React from "react";
import styled from "styled-components";
// import { RightOutlined } from "@ant-design/icons";

const BannerStyle = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 13%;
    width: auto;
`;

const CrowdfundingBanner = () => {
    return (
        <BannerStyle>
            {/* <div style={{ margin: "30px 50px" }}>
                {/* <p style={{ fontSize: "35px", margin: "30px" }}>Back the project, take the ride</p>
                <p style={{ fontSize: "18px", margin: "20px 30px", textAlign: "left" }}></p>
                <p style={{ fontSize: "18px" }}></p> */}
            {/* </div> */} 
        </BannerStyle>
    );
};

export { CrowdfundingBanner };
