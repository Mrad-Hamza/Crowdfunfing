import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import { saveAs } from 'file-saver';


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

  state = {
    nameCompaign: 'aaa',
    typeCompaign: '000',
    
  }
  constructor(props) {
    super(props);

    this.deleteCompaign = this.deleteCompaign.bind(this)

    this.state = {compaigns: []};
  }

  createAndDownloadPdf = () => {
    axios.post('http://localhost:5000/compaigns/addPDF', this.state)
      // .then(() => axios.get('http://localhost:5000/compaigns/pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

        saveAs(pdfBlob, 'result.pdf');
      })
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

  handleChange = ({ target: { value, name }}) => this.setState({ [name]: value })

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
  searchHandel = (event)=>{
    let key = event.target.value;
    axios.get('http://localhost:5000/compaigns/search/'+ key)
      .then(response => {
        this.setState({ compaigns: response.data })
      })
      .catch((error) => {
        console.log(error);
      })

  }

  render() {
    return (
      
        <div className="col-12">
        <div className="card">
        <div><button onClick={this.createAndDownloadPdf} >Download PDF</button>
        <input type='text'onChange={this.searchHandel}></input>
        </div>
        <h3>Logged Campaigns</h3>
        <table className="table" border ="2">
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
          <tbody>
            { this.comaignList() }
          </tbody>
        </table>
       
      </div>
      </div>
      
      
    )
  }
}