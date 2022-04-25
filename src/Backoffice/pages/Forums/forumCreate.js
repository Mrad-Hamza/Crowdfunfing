import React, { Component } from "react";
import axios from "axios";

const customStyles = {
  content: {
  
  
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "390px",
    width: "330px",
    backgroundColor: "#1c1e21",
    color: "white"
  }
};

class AddForum extends Component {
  state = {
    
  
      title: "",
      description: "",
     
    
  };

  
   handleChange = e =>
   {
      this.setState({
    [e.target.title]: e.target.value 
    });}
    postforum =e=>{
      e.preventDefault()
      axios.post('http://localhost:5000/forums/add',{
        title: this.state.title,
        description: this.state.description,
        
      })

    //   .then(
    //     this.props.getforum(),
    //   this.setState({
    //     title: '',
    //     description: '',
      
   
    //   })
      
      
      
    //   )
    }
  render() {
    return (
      <div>
       
 
      
             <form style={{  display: "flex",flexDirection: "column",}} onSubmit={
                this.postforum
        
            }
                
                >
            <label style={{ margin: "15px" }}>
             Adding contact
           </label>
          <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="title..."
            //   onChange={this.handleChange}
              style={{ margin: "15px",padding:"10px",borderRadius:"5px"}}
            />
           
           <input
              type="text"
              name="description"
              value={this.state.description}
              placeholder="description..."
            //   onChange={this.handleChange}
              style={{ margin: "15px",padding:"10px",borderRadius:"5px"}}
            />
              <button type="submit"
              style={{ margin: "15px" ,padding:"10px",borderRadius:"5px"}}>
                Submit
              </button>
         
              <button style={{ margin: "15px" ,padding:"10px",borderRadius:"5px"}}>
                Cancel
              </button>
      
              </form>
    
      </div>
    );
  }
}

export default AddForum;