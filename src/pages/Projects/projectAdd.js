import React, { Component } from "react";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import URL from "../../features/constants/services.constants";
import { users } from "../User/_reducers/users.reducer";

export default class AddProject extends Component {
    constructor(props) {
        super(props);

        this.onChangeprojectName = this.onChangeprojectName.bind(this);
        this.onChangeprojectDescription = this.onChangeprojectDescription.bind(this);
        this.onChangeprojectCollectedAmount = this.onChangeprojectCollectedAmount.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            projectName: "",
            projectDescription: "",
            projectCollectedAmount: "",
            compaign: "6256c4cb47d815717428d8f4",
        };
    }

    onChangeprojectName(e) {
        this.setState({
            projectName: e.target.value,
        });
    }
    onChangeprojectDescription(e) {
        this.setState({
            projectDescription: e.target.value,
        });
    }
    onChangeprojectCollectedAmount(e) {
        this.setState({
            projectCollectedAmount: e.target.value,
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const project = {
            projectName: this.state.projectName,
            projectDescription: this.state.projectDescription,
            projectCollectedAmount: this.state.projectCollectedAmount,
            compaign: this.state.compaign,
            //user:localStorage.getItem('currentUserId')
        };

        console.log(project);

        axios.post(URL.baseApiUrl + URL.projects.addProject + `/"6256c4cb47d815717428d8f4"`).then((res) => console.log(res.data));
        window.location = "/projects";
    }

    render() {
        return (
            <div class="form-style-5">
                <h3>Creat New Compaign Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Project name: </label>
                        <input type="text" required className="form-control" value={this.state.projectName} onChange={this.onChangeprojectName} />
                    </div>

                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text" required className="form-control" value={this.state.projectDescription} onChange={this.onChangeprojectDescription} />
                    </div>

                    <div className="form-group">
                        <label>project CollectedAmount: </label>
                        <input type="number" required className="form-control" value={this.state.projectCollectedAmount} onChange={this.onChangeprojectCollectedAmount} />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="ADD" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}
