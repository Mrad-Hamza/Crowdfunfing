
import axios from 'axios';
import React,{useState,useEffect} from "react";




import { Button } from "primereact/button";


const FormLayoutDemo = () => {
    // constructor(props) {
    //     super(props);
    
    //     this.onChangeTitle = this.onChangeTitle.bind(this);
    //     this.onChangeDescription = this.onChangeDescription.bind(this);
       
    //     this.onSubmit = this.onSubmit.bind(this);
    
    //     this.state = {
    //        title: '',
    //        description: '',
            
    //     }
    //   }

handleChange = e =>
{
   this.setState({
 [e.target.title]: e.target.value 
 });}
   const showSuccess = () => {
    axios.post('http://localhost:5000/forums/add')
//       .then(response => { console.log(response.data)});


  }



    return (
 
        <div className="grid">
            <form>
            <div className="col-12 md:col-6">
                <div className="card p-fluid">
                    <h5>Create an forum </h5>
                    <div className="field">
                 
                        <label htmlFor="name1">Title</label>
                      
                        <input
              type="text"
              name="title"
              value={this.state.title}
              placeholder="title..."
              onChange={this.handleChange}
              style={{ margin: "15px",padding:"10px",borderRadius:"5px"}}
            />
                   </div>
                    
                    <br />
                    <div className="field">
                        <label htmlFor="description">Description</label>
                             
                        <input
            style={{ margin: "15px" ,padding:"10px",borderRadius:"5px"}}
              type="text"
              name="description"
              value={this.state.description}
              placeholder="valid email..."
              onChange={this.handleChange}
            />
                    </div>
                    
                   
                    
                    <br />
    
                   
                    
                    <div className="grid">
                   

                        <div className="col-12 md:col-4">
                            <Button type="button" onClick={showSuccess} label="Publish" className="p-button-primary p-button-rounded mb-2 mr-2" />
                        </div>
                        <div className="col-12 md:col-4">
                            <Button type="button" label="Discard" className="p-button-secondary p-button-rounded mb-2 mr-2" />
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </div>
      
        
    

    );
    

}
const comparisonFn = function (prevProps, nextProps) {
    return prevProps.location.pathname === nextProps.location.pathname;
};

export default React.memo(FormLayoutDemo, comparisonFn);


      
