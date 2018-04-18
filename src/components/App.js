import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import Posts from './Posts';
import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';
import * as routes from '../constants/routes';
import { firebase } from '../firebase';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
      uid:null,     
    };

    
  }

  componentDidMount() {
    
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? (
          this.setState(() => ({ authUser })
        
        
        ))
        : this.setState(() => ({ authUser: null }));
    });

    
    
  }

  
  

  render(){    
    
    return(
      
      
      <Router>         
        <div className="container">
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}  />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}  />
          <Route exact path={routes.HOME} component={() => <SignInPage /> }  /> 
          <Route exact path={routes.POSTS} component={() => <Posts authUser={this.state.authUser}/>} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
        </div>       
      </Router>
    )
  }
}


export default App;
