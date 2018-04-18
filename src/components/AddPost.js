import React, { Component } from 'react';
import { db, auth } from '../firebase/firebase';

class AddPost extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    state = {
        uid: '',
        compartidoCon:'',
        post: ''
    };

    handleChange = (e) => {
        this.setState({
            post: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();

        db.ref('/users/'+ this.props.uid + '/posts').push({
            post: this.state.post,
            compartidoCon: this.state.compartidoCon
            
        });

        this.setState({
            compartidoCon: '',
            post: ''
        });
    }

    render() {
        return (
            <div className="AddPost">
                <input
                    type="text"
                    placeholder="Write the post of your post"
                    onChange={this.handleChange}
                    value={this.state.post}
                />
                <select>
                <option value="amigos" >Amigos</option>
                <option value="publico" selected>Publico</option>
                
                </select>
                <button
                    type="submit"
                    onClick={this.handleSubmit}                >
                    Submit
                </button>
            </div>
        );
    }
}

export default AddPost;