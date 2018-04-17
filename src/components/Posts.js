import React, {Component} from 'react';
import { Link, Redirect } from 'react-router-dom';

import SignInPage from './SignIn';
import SignOutButton from './SignOut';
import * as routes from '../constants/routes';
import { firebase } from '../firebase';
import SignIn from './SignIn';
import { db } from '../firebase/firebase';
import EditButton from './EditButton';




class Posts extends Component{
    constructor(props) {
        super(props);

        console.log(props + " contenido de props")
        this.state = {
            authUser: 'toBe',
            posts:0
        };
    }

     componentDidMount() {
        firebase.auth.onAuthStateChanged(authUser => {
            authUser
                ? this.setState(() => ({ authUser }))
                : this.setState(() => (
                    { authUser: null }               
                   
                
                ));
        });
     }

     

    componentWillMount() {
        let postsRef = db.ref('posts');

        let _this = this;

        postsRef.on('value', function (snapshot) {
            console.log(snapshot.val());

            _this.setState({
                posts: snapshot.val(),
                loading: false
            });
        });
    }



    // handleEdit = (post, key) => {
    //    innerHTML = "guardar";
        
    //     console.log("handleEdit pressed");
        
        
    // }

    submitEdit = (post, key) => {

        db.ref('posts/' + key).set({
            title: post.title,
            upvote: post.upvote + 1,
            downvote: post.downvote
        });
    }

    handleDelete = (post, key) => {
        db.ref('posts/' + key).remove();
    }

    render() {
        let posts = this.state.posts;
        console.log(posts + "esteeeee");
        console.log(this.state.authUser + " Cuando autoriza");
        let _this = this;

        if (!posts) {
            return false;
        }

        if (this.props.loading) {
            return (
                <div>
                    Loading…
                </div>
            );
        }

        if(this.state.authUser)  {return (
            <div className="Posts">
                {Object.keys(posts).map(function (key) {
                    return (
                        <div key={key}>
                            <div style={{display: 'none'}}>Title: {posts[key].title}</div>
                            {/* <div>Upvotes: {posts[key].upvote}</div>
                            <div>Downvotes: {posts[key].downvote}</div> */}
                            <div>
                                {/* <button
                                    onClick={_this.handleEdit.bind(this,
                                        posts[key], key)}
                                    type="button"
                                >
                                    Editar
                                </button> */}
                                <EditButton />
                                <button
                                    onClick={_this.handleDelete.bind(this,
                                        posts[key], key)}
                                    type="button"
                                >
                                   Eliminar
                                </button>
                            </div>
                           
                        </div>
                    );
                })

                }
                <SignOutButton />  
            </div >
        );}

        return(
            <Redirect to="/"  />
        );
    }
}  

export default Posts;