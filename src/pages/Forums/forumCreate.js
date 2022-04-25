import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { Link } from 'react-router-dom';

import "react-datepicker/dist/react-datepicker.css";

export default class forumCreate extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
   
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      title: '',
      description: '',
     
  }
  }

  

  

  onChangeTitle(e) {
    this.setState({
        title: e.target.value
    })
  }
  onChangeDescription(e) {
    this.setState({
        description: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const forum = {
      
      title: this.state.title,
      
      description: this.state.description,
    
}

console.log(forum);

axios.post('http://localhost:5000/forums/add/', forum)
.then(res => console.log(res.data));

// window.location = '/compaignsList';
}

  render() {
    return (
      <div class="form-style-5">
      <h3>Creat New forum</h3>
      <form onSubmit={this.onSubmit}>

        <div className="form-group"> 
          <label>Title: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.title}
              onChange={this.onChangeTitle}
              />
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

      

     


        <div className="form-group">
          <input type="submit" value="add forum" className="btn btn-primary" />
          <div className="form-group">
        <button class="btnn" ><Link to={"/forums"}>Cancel</Link></button>
        </div>
        </div>
        
      </form>
    </div>
    )
  }
}