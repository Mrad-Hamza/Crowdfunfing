import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import axios from 'axios';

const Forum = props => (
  <tr>
    <td>{props.forum.title}</td>
    <td>{props.forum.description}</td>
    <Button icon="pi pi-comments" onClick={() => { props.showComment(props.forum._id) }} ></Button> 
   
 
    <td>
     <Button  icon="pi pi-trash"  onClick={() => { props.deleteForum(props.forum._id) }}></Button>
    </td>
    <Link to={"/edit/"+props.forum._id}>edit</Link>
  </tr>
)

export default class forumList extends Component {
  constructor(props) {
    super(props);

    this.deleteForum = this.deleteForum.bind(this)

    this.state = {forums: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/forums/')
      .then(response => {
        this.setState({ forums: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteForum(id) {
    axios.delete('http://localhost:5000/forums/'+id
)
      .then(response => { console.log(response.data)});

    this.setState({
        forums: this.state.forums.filter(el => el._id !== id)
    })
  }
  showComment(id) {
    axios.get('http://localhost:5000/comment/'+id
)
      .then(response => { console.log(response.data)});

    this.setState({
        forums: this.state.forums.filter(el => el._id !== id)
    })
  }

  forumList() {
    return this.state.forums.map(currentForum => {
      return <Forum forum={currentForum} deleteForum={this.deleteForum} key={currentForum._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>list forums</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Description</th>
              
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.forumList() }
          </tbody>
        </table>
      </div>
    )
  }
}