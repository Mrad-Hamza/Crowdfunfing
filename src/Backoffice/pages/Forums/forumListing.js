import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import axios from 'axios';
// import './App.css';
import './forum.css';


import "react-datepicker/dist/react-datepicker.css";

const Forum = props => (
  
  <div>
     <div class="card mb-2">
                    <div class="card-body p-2 p-sm-3">
                    <h4>{props.forum.title}</h4>    
                    <div  class="p-toolbar ">  
                               
     <div class="media forum-item">
                            <a href="#" data-toggle="collapse" data-target=".forum-content"><img src="https://bootdey.com/img/Content/avatar/avatar1.png" class="mr-3 rounded-circle" width="50" alt="User" /></a>
                            <div class="media-body">
                                <h6><a href="#" data-toggle="collapse" data-target=".forum-content" class="text-body">User</a></h6>
                                <p class="text-secondary">
                               </p>
                                <p class="text-muted"> <i class="pi pi-clock" ></i> <span class="text-secondary font-weight-bold">{props.forum.createdAt}</span></p>
                            </div>
                           
                            
                         
                        </div>

   
    <p>{props.forum.description}</p>
    <p>  
   
 
     <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => { props.deleteForum(props.forum._id) }}></Button>
   
    <Link to={"/edit/"+props.forum._id}> 
    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mt-2" >
        
     </Button>  
    </Link>
    <Link to={"/comment/"+props.forum._id}> 
    <Button icon="pi pi-comments" className="p-button-rounded p-button-success mt-2"  onClick={() => { props.showComment(props.forum._id) }}></Button>
    </Link>
    </p> 
    
    <div class="text-muted small text-center align-self-center">
                               <span><i class="pi pi-comments" ></i>  {props.forum.__v}</span>
                            </div>    </div> 
                </div>
   </div>
  </div>

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
  axios.get('http://localhost:5000/forums/com/'+id)
  .then(res => console.log(res.data));

}

searchHandel = (event)=>{
  let key = event.target.value;
  axios.get('http://localhost:5000/forums/search/'+ key)
    .then(response => {
      this.setState({ forums: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
    

}


  forumList() {
    return this.state.forums.map(currentForum => {
      return  <Forum forum={currentForum} showComment={this.showComment} deleteForum={this.deleteForum} key={currentForum._id} />;
      // return  <Forum forum={currentForum} deleteForum={this.deleteForum} key={currentForum._id} />;
    
    })
  }
  

  render() {
   
    return (
      
      <div className="col-12">
      <div className="card">
  
      <div class="but">
        <button class="btnn" ><Link to={"/addforums"}>Add forum +</Link></button>
        </div>
      <div class="wrapper">
      <img class="search-icon"  src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDU2Ljk2NiA1Ni45NjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU2Ljk2NiA1Ni45NjY7IiB4bWw6c3BhY2U9InByZXNlcnZlIiB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4Ij4KPHBhdGggZD0iTTU1LjE0Niw1MS44ODdMNDEuNTg4LDM3Ljc4NmMzLjQ4Ni00LjE0NCw1LjM5Ni05LjM1OCw1LjM5Ni0xNC43ODZjMC0xMi42ODItMTAuMzE4LTIzLTIzLTIzcy0yMywxMC4zMTgtMjMsMjMgIHMxMC4zMTgsMjMsMjMsMjNjNC43NjEsMCw5LjI5OC0xLjQzNiwxMy4xNzctNC4xNjJsMTMuNjYxLDE0LjIwOGMwLjU3MSwwLjU5MywxLjMzOSwwLjkyLDIuMTYyLDAuOTIgIGMwLjc3OSwwLDEuNTE4LTAuMjk3LDIuMDc5LTAuODM3QzU2LjI1NSw1NC45ODIsNTYuMjkzLDUzLjA4LDU1LjE0Niw1MS44ODd6IE0yMy45ODQsNmM5LjM3NCwwLDE3LDcuNjI2LDE3LDE3cy03LjYyNiwxNy0xNywxNyAgcy0xNy03LjYyNi0xNy0xN1MxNC42MSw2LDIzLjk4NCw2eiIgZmlsbD0iIzAwMDAwMCIvPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
   </div>
   
      <input class="search" onChange={this.searchHandel} placeholder="Search" type="text" />
     
        <h3>list forums</h3>
           
       
                 { this.forumList() }
                 </div></div>
            
      
   
    )
  }
}