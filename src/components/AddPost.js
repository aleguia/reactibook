import React, { Component } from 'react';
import { db, st } from '../firebase/firebase';
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
        post: '',
        hasImage: false,
        imageURL:''
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

    subirImagenes = (image, postKey) =>{
        let storageRef = st.ref();
        var uploadTask = storageRef.child('images/' + image.name).put(image);
        let _this = this;

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed', function (snapshot) {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case st.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case st.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            let downloadURL = uploadTask.snapshot.downloadURL;
            console.log(downloadURL);
            console.log(postKey);

            db.ref('/users/' + _this.props.uid + '/posts/' + postKey).update({
                imageURL: downloadURL
            }); 
            // _this.setState({
            //     imageURL: downloadURL
            // })
        });

    }
    

    handleSubmit = (e) => {
        e.preventDefault();
        
        var newPostKey = db.ref('/users/' + this.props.uid + '/posts').push().key;
        
        if (this.state.hasImage) {
            let x = document.getElementById("fileUploader");
            let imagen = x.files[0];           
                this.subirImagenes(imagen, newPostKey)              
        }    
         
        db.ref('/users/'+ this.props.uid + '/posts/' + newPostKey).update({
            post: this.state.post,
            compartidoCon: this.state.compartidoCon,
            imageURL:''
        });

        this.setState({            
            post: '',
            hasImage:false,
           
        });
    }

    

    handleUpload = (e) => {
       this.setState({
            hasImage: true
        })

       
    }

    render() {
        return (
            <div className="AddPost">
                <input
                    className="happen"
                    type="text"
                    placeholder="¿Qué está pasando?"
                    onChange={this.handleChange}
                    value={this.state.post}
                />
                <div className="publishAndPublic">
                    <input
                        id="fileUploader" 
                        type="file"
                        className="uploadInput"
                        accept=".png, .jpg, .jpeg"
                        onChange={(e) => this.handleUpload(e)}/>
                        
                    <div>    
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
            </div>
        );
    }
}

export default AddPost;