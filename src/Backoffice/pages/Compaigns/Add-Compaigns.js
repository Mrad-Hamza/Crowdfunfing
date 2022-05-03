import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { users } from '../User/_reducers/users.reducer';

export default class AddCompaign extends Component {
  constructor(props) {
    super(props);

    this.onChangeNameCompaign = this.onChangeNameCompaign.bind(this);
    this.onChangeTypeCompaign = this.onChangeTypeCompaign.bind(this);
    this.onChangeObjective = this.onChangeObjective.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDeadline = this.onChangeDeadline.bind(this);
    this.onChangeVerified = this.onChangeVerified.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangecumulateAmount= this.onChangecumulateAmount.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      nameCompaign: '',
      typeCompaign: '',
      objective: '',
      description: '',
      deadline: new Date()
  }
  }

  

  

  onChangeNameCompaign(e) {
    this.setState({
        nameCompaign: e.target.value
    })
  }
  onChangeTypeCompaign(e) {
    this.setState({
        typeCompaign: e.target.value
    })
  }
  onChangeObjective(e) {
    this.setState({
        objective: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

 

  onChangeDeadline(date) {
    this.setState({
        deadline: date
    })
  }

  onChangeVerified(e) {
    this.setState({
        Verified: e.target.value
    })
  }

  onChangeStatus(e) {
    this.setState({
        Status: e.target.value
    })
  }
  onChangecumulateAmount
  (e) {
    this.setState({
      cumulateAmount: e.target.value
    })
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
      cumulateAmount: this.state.cumulateAmount,
      user:localStorage.getItem('currentUserId')
}

console.log(compaign);

axios.post('http://localhost:5000/compaigns/add/', compaign)
.then(res => console.log(res.data));

window.location = '/compaignsList';
}

  render() {
    return (
      <div class="form-style-5">
      <h3>Creat New Compaign Log</h3>
      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
          <label>Name Campaign: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.nameCompaign}
              onChange={this.onChangeNameCompaign}
              />
        </div>

        <div className="form-group"> 
          <label>Type Campaign: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.typeCompaign}
              onChange={this.onChangeTypeCompaign}
              />
        </div>

        <div className="form-group"> 
          <label>Objective: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.objective}
              onChange={this.onChangeObjective}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <textarea  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Deadline: </label>
          <div>
            <DatePicker
              selected={this.state.deadline}
              onChange={this.onChangeDeadline}
            />
          </div>
        </div>


        <div className="form-group">
          <input type="submit" value="ADD" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}