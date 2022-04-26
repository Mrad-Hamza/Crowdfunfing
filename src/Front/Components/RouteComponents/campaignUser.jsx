import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { Button } from "primereact/button";
import moment from "moment";
import data from "../../data.json";
import img from "../../Images/EditIcon.PNG";
import image from "../../Images/crowdfunding.jpg";
import {
  HeartOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

const Card = styled.div`
  :hover {
    box-shadow: 1px 8px 10px grey;
    -webkit-transition: box-shadow 0.1s ease-in;
  }
`;

const Compaign = (props) => (



         

      <Card  className=" border" style={{ width: "50%", height: "auto", padding: "0 10px 0 10px",float:"left" }}>
        <div >
          <img style={{  width: "100%" }}
            src={img}
            className="card-img-top"
            
          />
         
        </div>
        <div >
          <img style={{  width: "100%",height: "225px" }}
            src={image}
            className="card-img-top"
            
          />
         
        </div>
       

        <div style={{ height: "100px" }} className="card-body">
  <div>
    <span style={{ color: "#268366" }}>{props.compaign.typeCompaign}</span>
    <span style={{ float: "right" }}>
      <HeartOutlined
        style={{ fontSize: "20px", color: "lightgrey" }}
      />
    </span>
  </div>
  <h5 style={{ fontSize: "17px" }} className="card-title">
    {props.compaign.nameCompaign}
  </h5>
  <p style={{ fontSize: "12px" }} className="card-text">
    {props.compaign.description}
  </p>
</div>


        <br />
        <div
          className=" text-muted p-1"
          style={{ position: "relative", top: "20px" }}
        >
          <div style={{ padding: "1px 0px 0px 20px" }}>
            <div style={{ float: "left" }}>
              <h4>
                {moment(props.compaign.deadline).format('DD/MM/YYYY')}
                <span
                  style={{ padding: "1px 6px 0px 2px", fontSize: "13px" }}
                >
                  {}
                </span>
              </h4>
              {/* percentag */}
            </div>
            <div style={{ paddingTop: 4, float: "right" }}>
            {props.compaign.objective}
            </div>
          </div>
          <hr
            style={{
              width: "100%",
              clear: "both",
              border: "4px solid #34ca96",
              borderRadius: "4px",
            }}
          /> 
          <br/>
          <div style={{ padding: "4px 6px 0px 20px", clear: "both" }}>
            {}
            <span style={{ fontSize: "12px", float: "right" }}>
            <a href="" class="btn btn-secondary"style={{ background : "#343a40" }}><strong>
              <i class="fa fa-credit-card pull-left"></i> Make a donation</strong></a>
             
            </span>
          </div>
        </div>
        <br/><br/><br/><br/>

      </Card>
      
    
  


);

class CampaignUser extends Component {
    constructor(props) {
        super(props);


        this.state = { compaigns: [] };
    }

   

    componentDidMount() {
        axios
            .get("http://localhost:5000/compaigns/campaignUser/"+localStorage.getItem('currentUserId'))
            .then((response) => {
                this.setState({ compaigns: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

    

    comaignList() {
        return this.state.compaigns.map((currentCompaign) => {
            return <Compaign compaign={currentCompaign}  />;
        });
    }
    
    render() {
      return (
       
        <div className="container-fluid m-5 text-left">
           <div
  className="container-fluid"
  style={{
    display: "inline-block",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: "10px",
  }}
>
        {this.comaignList()}
        </div>
        </div>
       
      );
}

}
export {CampaignUser}