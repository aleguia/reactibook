import React, { Component } from 'react';
import { db } from '../firebase/firebase';
import './EditButton.css';

class EditButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: "Editar",            
            post:this.props.postText
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
   
   

    handleChange = (e) => {
        this.setState({
            post: e.target.value
        });

    }

    handleDelete = (post, key, id) => {
        db.ref('/users/' + this.props.uid + '/posts/' + this.props.dni).remove();
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
               compartidoCon:this.props.compartidoCon,
               imageURL:this.props.imageURL
           });           
        }          
    };

    render() {
      if(this.state.editable){
          return(
              <div className="editPost">
                <input type="text" value={this.state.post} onChange={this.handleChange} />
                  <div className="botonesContainer">
                      <button className="tlBtn" onClick={this.handleClick}>{this.state.text}</button>
                      <button className="tlBtn" onClick={this.handleDelete} type="button">Eliminar</button>
                  </div>
              </div>  
          )
      }
      
      return (    
        <div className="editPost">
            {this.props.postText}
            <img src={this.props.imageURL} style={{width: 300}}/>
            <div className="botonesContainer">            
                <button className="tlBtn" onClick={this.handleClick}>{this.state.text}</button>
                <button className="tlBtn" onClick={this.handleDelete} type="button">Eliminar</button>
            </div>
         </div>
    );
};
}
export default EditButton;