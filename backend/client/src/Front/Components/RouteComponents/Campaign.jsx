import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styled from "styled-components";
import CampaignTopImg from "../../Images/CampaignTopImg.png";
import IndiegogoLogo from "../../Images/IndiegogoLogo.png";
import gofundme from "../../Images/gofundme.png";
const CampaignStyle = styled.div`
    font-size: 20px;

    & > div {
        display: flex;
        flex-direction: row;
        justify-content: center;
        margin-bottom: 25px;
    }
`;

const CampaignCard = styled.div`
    border: 1px solid lightgrey;
    margin: 10px;
    width: 450px;
    height: auto;
    align-text: center;
    padding: 20px 20px;

    :hover {
        box-shadow: 1px 8px 10px grey;
        -webkit-transition: box-shadow 0.1s ease-in;
    }
`;

class Campaign extends Component {
    constructor(props) {
        super(props);

        this.onChangeNameCompaign = this.onChangeNameCompaign.bind(this);
        this.onChangeTypeCompaign = this.onChangeTypeCompaign.bind(this);
        this.onChangeObjective = this.onChangeObjective.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDeadline = this.onChangeDeadline.bind(this);
        this.onChangeVerified = this.onChangeVerified.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            nameCompaign: "",
            typeCompaign: "",
            objective: "",
            description: "",
            deadline: new Date(),
        };
    }

    onChangeNameCompaign(e) {
        this.setState({
            nameCompaign: e.target.value,
        });
    }
    onChangeTypeCompaign(e) {
        this.setState({
            typeCompaign: e.target.value,
        });
    }
    onChangeObjective(e) {
        this.setState({
            objective: e.target.value,
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value,
        });
    }

    onChangeDeadline(date) {
        this.setState({
            deadline: date,
        });
    }

    onChangeVerified(e) {
        this.setState({
            Verified: e.target.value,
        });
    }

    onChangeStatus(e) {
        this.setState({
            Status: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const compaign = {
            nameCompaign: this.state.nameCompaign,
            typeCompaign: this.state.typeCompaign,
            objective: this.state.objective,
            description: this.state.description,
            deadline: this.state.deadline,
            Verified: this.state.Verified,
            Status: this.state.Status,
            user: localStorage.getItem("currentUserId"),
        };

        console.log(compaign);

        axios.post(process.env.REACT_APP_URI_SERVER + "/compaigns/add/", compaign).then((res) => console.log(res.data));

        window.location = "/compaignsList";
    }

    render() {
        return (
            <div>
                <CampaignStyle>
                    <br />
                    <br />
                    <div>
                        <img src={CampaignTopImg} alt="CampaignTopImg" />
                    </div>
                    <div>Welcome to Fundise </div>
                </CampaignStyle>
                <div class="form-style-5">
                    <h3>Creat New Compaign Log</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Name Campaign: </label>
                            <input type="text" required className="form-control" value={this.state.nameCompaign} onChange={this.onChangeNameCompaign} />
                        </div>

                        <div className="form-group">
                            <label>Type Campaign: </label>
                            <input type="text" required className="form-control" value={this.state.typeCompaign} onChange={this.onChangeTypeCompaign} />
                        </div>

                        <div className="form-group">
                            <label>Objective: </label>
                            <input type="text" required className="form-control" value={this.state.objective} onChange={this.onChangeObjective} />
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <textarea type="text" required className="form-control" value={this.state.description} onChange={this.onChangeDescription} />
                        </div>

                        <div className="form-group">
                            <label>Deadline: </label>
                            <div>
                                <DatePicker selected={this.state.deadline} onChange={this.onChangeDeadline} />
                            </div>
                        </div>

                        <div className="form-group">
                            <input type="submit" value="ADD" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}
export { Campaign };
