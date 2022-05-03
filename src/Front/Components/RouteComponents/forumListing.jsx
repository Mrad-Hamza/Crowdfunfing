import React, { Component, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "primereact/button";
import axios from 'axios';
import './list.css';
import styled from "styled-components";


import "react-datepicker/dist/react-datepicker.css";
const ForumStyle = styled.div`
  font-size: 20px;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 25px;
  }
`;

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
                               <div style={{ float: "left" }}>
              <h6  class="text-muted"> <i class="pi pi-clock" ></i> <span class="text-secondary font-weight-bold">{props.forum.createdAt}</span></h6></div>
                            </div>
                           
                            
                         
                        </div>

   
    <h4>{props.forum.description}</h4>
    <p>  
   
 
     {/* <Button  icon="pi pi-trash" className="p-button-rounded p-button-danger mt-2" onClick={() => { props.deleteForum(props.forum._id) }}></Button>
   
    <Link to={"/edit/"+props.forum._id}> 
    <Button icon="pi pi-pencil" className="p-button-rounded p-button-warning mt-2" >
        
     </Button>  
    </Link> */}
    {/* <div class="text-muted small text-center align-self-center">
                               <span><i class="pi pi-comments" ></i>  {props.forum.__v}</span>
                            </div>  */}
    <Link to={"/comment/"+props.forum._id}> 
    <Button icon="pi pi-comments" className="p-button-rounded p-button-success mt-2"  onClick={() => { props.showComment(props.forum._id) }}></Button>
    </Link>
    </p> 
    
       </div> 
                </div>
   </div>
  </div>

)

 class ForumList extends Component {
 
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
      return  <Forum forum={currentForum} deleteForum={this.deleteForum} key={currentForum._id}/>;

    })
  }
  

  render() {
   
    return (
      
      <div className="col-3">
     
    
      <br />
      <br />
    
      <div class="but">
      <div style={{ bottom: 0, float: "center" ,width:"100%",paddingTop:"30px",textAlign:"center"}}>
        <button  className="p-button-text" style={{ 
              border: "1px solid transparent",
              backgroundColor: "rgb(150, 115, 66)!important",
              color:"rgb(239, 214, 146)",
              borderRadius: "1.9rem",
              fontSize:"13px" }}><Link to={"/addforums"}>+</Link></button>
        </div></div>
      {/* <div class="wrapper">
      <img class="search-icon"  src="data:image.svg" />
   </div> */}
   
      <input class="search" onChange={this.searchHandel} placeholder="Search" type="text" />
      <div className="container-fluid m-5 text-left">
        <div
          className="container-fluid"
          style={{
            display: "inline-block",
            flexDirection: "row",
            justifyContent: "space-around",
            padding: "10px",
          }}
        >
        
      <ForumStyle>
           
   
         { this.forumList() }</ForumStyle>
                 </div> </div>    
                 </div>
    
               
            
      
   
    )
  }
}
export {ForumList}