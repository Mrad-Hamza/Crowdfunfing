import React, { Component } from 'react';
import './comment.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Button } from "primereact/button";
import "react-datepicker/dist/react-datepicker.css";


const Comment = props => (
  <div>

    <div class="container">
      <div class="be-comment">
        <div class="be-comment-content">

          <span class="be-comment-name">
            <a href="blog-detail-2.html">    <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a>
              {props.comment.email}</a>
          </span>
          <span class="be-comment-time">
            <i class="pi pi-clock" ></i>
            {props.comment.createdAt}
          </span>

          <p class="be-comment-text">
            {props.comment.content}

          </p>

        </div>

      </div>  <Button icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2"
        onClick={() => { props.deleteComment(props.comment._id) }}></Button>

      <Button icon="pi pi-envelope" className="p-button-rounded p-button-warning mt-2" onClick={() => { props.sendMail(props.comment.email) }}></Button>
    </div>
  </div>
)

export default class commentList extends Component {
  constructor(props) {
    super(props);

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.deleteComment = this.deleteComment.bind(this)
    this.sendMail = this.sendMail.bind(this)

    this.state = {
      comments: [],

      email: localStorage.getItem("currentMailAddress"),
      content: '',
    };
  }


  componentDidMount() {
    axios.get(process.env.REACT_APP_URI_SERVER + '/comment/')
      .then(response => {
        this.setState({ comments: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteComment(id) {
    axios.delete(process.env.REACT_APP_URI_SERVER + '/comment/' + id
    )
      .then(response => { console.log(response.data) });

    this.setState({
      comments: this.state.comments.filter(el => el._id !== id)
    })

  }
  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    })
  }
  onChangeContent(e) {
    this.setState({
      content: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const comment = {

      email: this.state.email,

      content: this.state.content,


    }

    console.log(comment);

    axios.post(process.env.REACT_APP_URI_SERVER + '/comment/add/', comment)
      .then(res => console.log(res.data));

  }
  sendMail(mail) {
    axios.post(process.env.REACT_APP_URI_SERVER + '/comment/badmsg/' + mail)


      .then(response => { console.log(response.data) });

    this.setState({
      comments: this.state.comments.filter(el => el.email !== mail)
    })
  }


  commentList() {
    return this.state.comments.map(currentComment => {

      return (



        <Comment comment={currentComment} sendMail={this.sendMail} deleteComment={this.deleteComment} key={currentComment.email} />

      )
    })

  }

  render() {
    return (
      <div className="grid crud-demo">
        <div className="col-12">
          <div className="card">

            {this.commentList()}
          </div></div>

        <div class="form-block">

          <form onSubmit={this.onSubmit}>





            <div className="form-group">

              <textarea type="text"
                required
                placeholder="Your comment"
                class="be-comment-text"
                value={this.state.content}
                onChange={this.onChangeContent}
              />
            </div>

            <button type="submit" className="btn btn-primary pull-right"> send</button>



          </form>
        </div>
      </div>

    )
  }
}
