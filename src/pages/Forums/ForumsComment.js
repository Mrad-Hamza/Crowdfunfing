import React, { Component } from 'react';

import axios from 'axios';
import { Button } from "primereact/button";



// var nodemailer = require('nodemailer');

// var transporter = nodemailer.createTransport({
//              host: 'smtp.mailtrap.io',
//              port: 2525,
//              auth: {
//                  user: "yasmine.chaieb@esprit.tn",
//                  pass: "203JFT2233"
//              }
//      });
//      var mailOptions = {
     
//       from: "yasmine.chaieb@esprit.tn",
//       to: "jessymina.jc@gmail.com",
//       subject: "Subject",
//       text: "Hello SMTP Email"
//      };
//      transporter.sendMail(mailOptions, function(error, info){
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Email sent: ' + info.response);
//       }
// });
const Comment = props => (
  <tr>
  <td>{props.comment.email}</td>
    <td>{props.comment.content}</td>
    <td>{props.comment.forum}</td>
  
 
    <td>
     <Button  icon="pi pi-trash" onClick={() => { props.deleteComment(props.comment._id) }}></Button>
    </td>
     <td>
     <Button  icon="pi pi-material" onClick={() => { props.sendMail(props.comment._id) }}></Button>
    </td>
  </tr>
)

export default class commentList extends Component {
  constructor(props) {
    super(props);

    this.deleteComment = this.deleteComment.bind(this)

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

  commentList() {
    return this.state.comments.map(currentComment => {
      return <Comment comment={currentComment} deleteComment={this.deleteComment} key={currentComment._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>List of comments</h3>
        <table className="table">
          <thead className="thead-light">
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
      </div>
    )
  }
}