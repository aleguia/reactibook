import React, { Component } from 'react';
import { db } from '../firebase/firebase';
import './AddPost.css';

class AddPost extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
    }

    state = {
        uid: this.props.id,
        compartidoCon:'publico',
        post: ''
    };

    handleChange = (e) => {
        this.setState({
            post: e.target.value
        });
        
    }

    handleSelect = (e) => {
        this.setState({
            compartidoCon: e.target.value
        });
    }


    handleSubmit = (e) => {
        e.preventDefault();

        db.ref('/users/'+ this.props.uid + '/posts').push({
            post: this.state.post,
            compartidoCon: this.state.compartidoCon
            
        });

        this.setState({
            
            post: ''
        });
    }

    render() {
        return (
            <div className="AddPost">
                <input
                    type="text"
                    placeholder="¿Qué está pasando?"
                    onChange={this.handleChange}
                    value={this.state.post}
                />
                <div className="publishAndPublic">
                    <select onChange={this.handleSelect}>
                        <option value="publico" >Publico</option>                
                        <option value="amigos" >Amigos</option>
                    </select>
                    <button
                        type="submit"
                        onClick={this.handleSubmit}                >
                        Publicar
                    </button>
                </div>
            </div>
        );
    }
}

export default AddPost;