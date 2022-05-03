import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { saveAs } from "file-saver";
import { Button } from "primereact/button";
import moment from "moment";

const Compaign = (props) => (
    <tr>
        <td>{props.compaign.nameCompaign}</td>
        <td>{props.compaign.typeCompaign}</td>
        <td>{props.compaign.objective}</td>
        <td>{props.compaign.description}</td>
        <td>{moment(props.compaign.deadline).format("DD/MM/YYYY")}</td>
        <td>{props.compaign.Verified}</td>
        <td>{props.compaign.Status}</td>
        <td>
        {props.compaign.Verified == 0 ?
            <div className="actions">
                <Link to={"/projects/add/" + props.compaign._id}>
                    <Button label="Project" icon="pi pi-plus" className="p-button-success mr-2" />
                </Link>
            </div>:null
            }
        </td>
    </tr>
);

export default class ListDeadline extends Component {
    constructor(props) {
        super(props);

        this.deleteCompaign = this.deleteCompaign.bind(this);

        this.state = { compaigns: [] };
    }

    createAndDownloadPdf = () => {
        axios
            .post("http://localhost:5000/compaigns/addPDF", this.state)
            // .then(() => axios.get('http://localhost:5000/compaigns/pdf', { responseType: 'blob' }))
            .then((res) => {
                const pdfBlob = new Blob([res.data], { type: "application/pdf" });

                saveAs(pdfBlob, "result.pdf");
            });
    };

    componentDidMount() {
        axios
            .get("http://localhost:5000/compaigns/dedlaine")
            .then((response) => {
                this.setState({ compaigns: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    }

    handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

    deleteCompaign(id) {
        axios.delete("http://localhost:5000/compaigns/" + id).then((response) => {
            console.log(response.data);
        });

        this.setState({
            compaigns: this.state.compaigns.filter((el) => el._id !== id),
        });
    }

    comaignList() {
        return this.state.compaigns.map((currentCompaign) => {
            return <Compaign compaign={currentCompaign} deleteCompaign={this.deleteCompaign} key={currentCompaign._id} />;
        });
    }
    searchHandel = (event) => {
        let key = event.target.value;
        axios
            .get("http://localhost:5000/compaigns/search/" + key)
            .then((response) => {
                this.setState({ compaigns: response.data });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    render() {
        return (
            <div className="col-12">
                <div className="card">
                    <div class="p-toolbar p-component mb-4" role="toolbar">
                        <div class="p-toolbar-group-left">
                            <div class="my-2">
                                <Link to="/ADDCompaign">
                                    <Button label="New" icon="pi pi-plus" className="p-button-success mr-2" />
                                </Link>
                                <Button label="Download" icon="pi pi-file-pdf" className="p-button-help" onClick={this.createAndDownloadPdf} />
                            </div>
                        </div>
                        <div class="p-toolbar-group-right">
                            <Link to="/compaignsList">
                                <Button label="Campaigns" icon="pi pi-angle-double-up" styleClass="ui-button-info" />{" "}
                            </Link>
                        </div>
                    </div>
                    <div class="wrapper">
                        <img
                            class="search-icon"
                            src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K"
                        />
                        <input class="search" onChange={this.searchHandel} placeholder="Search" type="text" />
                    </div>
                    <h3>Logged Campaigns finished</h3>
                    <table className="table" border="2">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Objective</th>
                                <th>Description</th>
                                <th>Deadline</th>
                                <th>Verified</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>{this.comaignList()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}
