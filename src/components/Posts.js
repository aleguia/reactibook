import React, {Component} from 'react';

import SignInPage from './SignIn';
import SignOutButton from './SignOut';
import { db} from '../firebase/firebase';
import EditButton from './EditButton';
import AddPost from './AddPost';
import './Posts.css';


class Posts extends Component{
    constructor(props) {
        super(props);
        
        this.state = {            
            posts: 0,
            loading: false,
            editable:false,
            filtro:'amigos'
        }
       
    }
    
    handleFilter(e){        
        this.setState({
            filtro: e.target.value
        })
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
    
    render() {

        let posts = this.state.posts;       
        let _this = this;
        let id = this.state.id;      
        

        if (this.state.loading) {
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
                <div className="filtroPosts" >
                    <button className="tlBtn" onClick={(e) => _this.handleFilter(e)} value="amigos">
                        Amigos
                    </button>
                    <button className="tlBtn" onClick={(e) => _this.handleFilter(e)} value="publico">
                        Público
                    </button>                    
                </div>                    

                {Object.keys(posts).filter(i => posts[i].compartidoCon === _this.state.filtro).map(function (key) {                 
                    
                    return (
                        
                        <div className="timeline" key={key}>
                            <EditButton
                                postText={posts[key].post}
                                editable={_this.state.editable}
                                uid={id}
                                dni={key}
                                compartidoCon={posts[key].compartidoCon}
                                filtro={_this.state.filtro}
                                imageURL={posts[key].imageURL}
                            />
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