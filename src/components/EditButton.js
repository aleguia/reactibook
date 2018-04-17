import React, { Component } from 'react';
class EditButton extends Component{
    constructor(props){
        super(props)
        this.state = {
            text: "Editar",
            display: "none"
        }
    }

    handleClick = () => {
        
        let textChanged = this.state.text;
        
        (textChanged === "Editar") ? this.setState({ text: "Guardar" }) : this.setState({ text: "Editar" });
    };
    render() {
    return (
        
        
        <button onClick={this.handleClick}>{this.state.text}</button>
    );
};
}
export default EditButton;