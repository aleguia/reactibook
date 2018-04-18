import React, {Component} from 'react';

import SignInPage from './SignIn';
import SignOutButton from './SignOut';
import { db, auth } from '../firebase/firebase';
import EditButton from './EditButton';
import AddPost from './AddPost';
import {Redirect} from 'react-router-dom';




class Posts extends Component{
    constructor(props) {
        super(props);

        // console.log(Object.keys(this.props.authUser) + " contenido de props")
        
    }
   
    state = {
        
        posts: 0,
        loading: false
    }

    
     

    componentWillMount() { 
        let _this = this;     
        
        if(!this.props.authUser ){
                console.log("se esta ejecutando if");
                _this.setState({
                   id:null, 
                    
                })
        } else {          

            console.log("se esta ejecutando else");
            let userId = this.props.authUser.uid;      
            let postsRef = db.ref('/users/'+ userId + '/posts');        

            postsRef.on('value', function (snapshot) {
                console.log(snapshot.val()+"the snapshot");

                _this.setState({
                    id:userId,
                    posts: snapshot.val() ,
                    loading: false
                });
            });
            } 
    }

    submitEdit = (post, key) => {

        db.ref('posts/' + key).set({
            post: post.post,
            upvote: post.upvote + 1,
            downvote: post.downvote
        });
    }

    handleDelete = (post, key, id) => {
        db.ref('/users/' + id + '/posts/' + key).remove();
    }

    render() {
        let posts = this.state.posts;        
        let _this = this;
        let id = this.state.id;

        // if (!posts) {
        //     return false;
        // }

        if (!id && this.state.loading) {
            return (
                <h1>
                    Loading…
                </h1>
            );
        }

        if (!id)  {
            
            return (                
                <div>
                    <h1>Primero debes loguearte</h1>
                    <SignInPage/>
                </div>                 
            );
        }
            
            
        if(!posts){
            return (
                <div className="Posts">
                    <AddPost uid={id} />                  

                    <SignOutButton />
                </div >
            )
        }
            return (
                <div className="Posts">
                    <AddPost uid={id}/>                  
                    
                    {Object.keys(posts).map(function (key) {
                            
                            return (
                                <div key={key}>

                                    <div > {posts[key].post}</div>
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
                                                posts[key], key,id)}
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
            );
        
    }   
}  

export default Posts;