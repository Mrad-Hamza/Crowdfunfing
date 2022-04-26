import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveAs } from "file-saver";
import { Button } from "primereact/button";
import moment from "moment";
import data from "../../data.json";
import img from "../../Images/EditIcon.PNG";
import image from "../../Images/123456.jpeg";
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
  <div style={{
    width: "33.3333333%",
    float: "left",
    position: "relative",
    paddingRight: "15px",
    paddingLeft: "15px",
    paddingBottom: "30px"
  }}>


    <Card className=" border" style={{
      width: "100%",
      height: "auto",
      boxShadow: " 10px 10px 20px #00000029",


    }}>

      <div style={{}}>
        <img style={{ width: "100%", height: "225px" }}
          src={image}
          className="card-img-top"

        />
      </div>


      <div style={{ backgroundColor: "#ffffff" }}>


        <div style={{
          position: "relative",
          margin: "auto",
          padding: ".6rem 1.2rem 0 1.2rem",
          backgroundColor: " #fff",
          borderRadius: "15px",
          marginTop: "-5rem",
          width: "95%",
          minHeight: "150px"
        }} className="card-body">


          <div style={{
            textAlign: "center",
            marginBottom: "20px",
            height: "30px",
          }}>
            <h2 style={{
              fontWeight: "normal",
              fontSize: "18px",
              lineheight: "1.6783216783216783rem",
              fontFamily: "Oswald, sans-serif",
              textTransform: "unset",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingBottom: "5px",
            }}>{props.compaign.typeCompaign}</h2>
            <div style={{
              marginLeft: "25%",
              width: "50%",
              content: "",
              background: "-webkit-linear-gradient(left, rgb(239 214 146) 0%, rgb(150 115 66) 100%)",
              display: "block",
              height: "4px",
              bottom: "0",
              marginBottom: "20px",
            }}>

            </div>

          </div>
          <strong style={{}} className="card-title">
            {props.compaign.nameCompaign}
          </strong>
          <p style={{ fontSize: "12px" }} className="card-text">
            {props.compaign.description}
          </p>

          <div style={{
            paddingRight: "2.4rem",
            paddingBottom: "1.2rem",
            bottom: 0,
            width: "100%"
          }}>
            <div style={{
              borderRadius: "10px",
              border: "0px solid #ffffff",
              marginBottom: "0px !important",
              backgroundColor: "rgb(150, 115, 66)",
              height: "20px",
              backgroundImage: "linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent)",
              backgroundSize: "40px 40px",
              overflow: "hidden",
              width: "100%"
            }}>
              <div style={{
                width: (props.compaign.cumulateAmount / props.compaign.objective) * 100 + "%",
                backgroundColor: "rgb(239, 214, 146)",
                textAlign: "right",
                position: "relative",
                height: "20px",
              }}>
                <span style={{
                  color: " #ffffff",
                  fontWeight: "300",
                  position: "absolute",
                  right: "5px",
                  top: "-2px",
                }}>
                  <strong>{((props.compaign.cumulateAmount / props.compaign.objective) * 100).toFixed(0)}%</strong>
                </span>
              </div>
            </div>


          </div>
          <div style={{ bottom: 0, float: "center" ,width:"100%",paddingTop:"30px",textAlign:"center"}}>

          <Button label="Show Project details" className="p-button-text" style={{ 
              border: "1px solid transparent",
              backgroundColor: "rgb(150, 115, 66)!important",
              color:"rgb(239, 214, 146)",
              borderRadius: "1.9rem",
              fontSize:"13px" }}/>

          </div>

          
        </div>

      </div>









      <br /><br />

    </Card>

  </div>

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
      return <Compaign compaign={currentCompaign} />;
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