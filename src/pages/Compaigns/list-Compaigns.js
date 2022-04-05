import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const Compaign = props => (

    
  <tr>
    <td>{props.compaign.nameCompaign}</td>
    <td>{props.compaign.typeCompaign}</td>
    <td>{props.compaign.objective}</td>
    <td>{props.compaign.description}</td>
    <td>{props.compaign.deadline}</td>
    <td>{props.compaign.Verified}</td>
    <td>{props.compaign.Status}</td>
    <td>
    <Link to={"/update/"+props.compaign._id}>edit</Link> |<a href="#" onClick={() => { props.deleteCompaign(props.compaign._id) }}>delete</a>
    </td>
  </tr>
)

export default class CompaignList extends Component {
  constructor(props) {
    super(props);

    this.deleteCompaign = this.deleteCompaign.bind(this)

    this.state = {compaigns: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/compaigns/')
      .then(response => {
        this.setState({ compaigns: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteCompaign(id) {
    axios.delete('http://localhost:5000/compaigns/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
        compaigns: this.state.compaigns.filter(el => el._id !== id)
    })
  }

  comaignList() {
    return this.state.compaigns.map(currentCompaign => {
      return <Compaign compaign={currentCompaign} deleteCompaign={this.deleteCompaign} key={currentCompaign._id}/>;
    })
  }

  render() {
    return (
        <div className="col-12">
        <div className="card">
        <h3>Logged Campaigns</h3>
        <table className="table" border ="2">
          <thead>
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.comaignList() }
          </tbody>
        </table>
      </div>
      </div>
    )
  }
}