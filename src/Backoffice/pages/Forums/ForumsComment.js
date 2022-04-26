import React, { Component } from 'react';
import './App.css';
import { confirmAlert } from 'react-confirm-alert';
import axios from 'axios';
import { Button } from "primereact/button";
import "react-datepicker/dist/react-datepicker.css";


const Comment = props => (
  <tr>
  <td>{props.comment.email}</td>
    <td>{props.comment.content}</td>
    <td>{props.comment.forum}</td>
  
 
    <td>
     <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" 
     onClick={() => { props.deleteComment(props.comment._id) }}></Button>
    
     <Button  icon="pi pi-envelope" className="p-button-rounded p-button-warning mt-2"  onClick={() => { props.sendMail(props.comment.email) }}></Button>
   </td>
 </tr>
)

export default class commentList extends Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this)
    this.sendMail = this.sendMail.bind(this)

    this.state = {comments: []};
  }
 

  componentDidMount() {
    axios.get('http://localhost:5000/comment/')
      .then(response => {
        this.setState({ comments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteComment(id) {
    axios.delete('http://localhost:5000/comment/'+id
)
      .then(response => { console.log(response.data)});

    this.setState({
        comments: this.state.comments.filter(el => el._id !== id)
    })
  
  }

  
  sendMail(mail) {
    axios.post('http://localhost:5000/comment/badmsg/'+mail)

    
      .then(response => { console.log(response.data)});

    this.setState({
        comments: this.state.comments.filter(el => el.email !== mail)
    })
  }


  commentList() {
    return this.state.comments.map(currentComment => {

      return (

     <Comment comment={currentComment} deleteComment={this.deleteComment} key={currentComment._id}/>
     , 
     <Comment comment={currentComment} sendMail={this.sendMail} key={currentComment.email}/>
     
    )
    })
    
  }

  render() {
    return (
      <div className="grid crud-demo">
      <div className="col-12">
          <div className="card">
    
        <h3>List of comments</h3>
        <table className="commentList">
          <thead className="commentList">
            <tr>
              <th>User Email</th>
              <th>Content</th>
              <th>Forum</th>
              <th>Actions</th>
    
    
            </tr>
          </thead>
          <tbody>
            { this.commentList() }
          </tbody>
        </table>
      </div></div></div>
    )
  }
}