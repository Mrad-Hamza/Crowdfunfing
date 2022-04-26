import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CompaignEdit extends Component {
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
        nameCompaign: '',
        typeCompaign: '',
        objective: '',
        description: '',
        deadline: new Date(),
        Verified: '',
        Status: '',
        cumulateAmount:''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/compaigns/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            nameCompaign: response.data.nameCompaign,
            typeCompaign: response.data.typeCompaign,
            objective: response.data.objective,
            description: response.data.description,
            deadline: new Date(response.data.deadline),
            Verified: response.data.Verified,
            Status: response.data.Status,
            cumulateAmount: response.data.cumulateAmount
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

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
            cumulateAmount: this.state.cumulateAmount
    }

    console.log(compaign);

    axios.put('http://localhost:5000/compaigns/update/' + this.props.match.params.id, compaign)
      .then(res => console.log(res.data));

    window.location = '/compaignsList';
  }

  render() {
    return (
    <div class="form-style-5">
      <h3>Edit Compaign Log</h3>
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
          <label>Verified: </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.Verified}
              onChange={this.onChangeVerified}
              />

        </div>


        <div className="form-group"> 
          <label>Status: </label>
          <select 
              required
              className="form-control"
              value={this.state.Status}
              onChange={this.onChangeStatus}>
               <option >
                   En COUR
                    </option>;
                    <option >
                   Terminer
                    </option>;
               
          </select>
        </div>
       

        <div className="form-group">
          <input type="submit" value="Edit" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}