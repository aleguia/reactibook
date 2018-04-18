import React, { Component } from 'react';
import { db } from '../firebase/firebase';
class EditButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: "Editar",
            display: "none",
            post:this.props.postText
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
   
   

    handleChange = (e) => {
        this.setState({
            post: e.target.value
        });

    }
    
    handleClick = () => {
        
        let textChanged = this.state.text;
        let id = this.props.uid
        let key = this.props.dni
       if (textChanged === "Editar") {

        this.setState({ 
            text: "Guardar",
            editable:true
         })
        
        
        }else{
          
            this.setState({
             text: "Editar",
             editable:false
                }); 
            
           db.ref('/users/' + id + '/posts/' + key).set({
               post: this.state.post,
               compartidoCon:this.props.compartidoCon
           });
            
            
            }


        
        
    };

    render() {
      if(this.state.editable){
          return(
              <div>
                <input type="text" value={this.state.post} onChange={this.handleChange} />
                <button onClick={(e) => this.handleClick(e)}>{this.state.text}</button>
              </div>  
          )
      }
      
      return (    
        <div>
            <div>
                {this.props.postText}
            </div>
            <button onClick={(e)=> this.handleClick(e)}>{this.state.text}</button>
         </div>
    );
};
}
export default EditButton;