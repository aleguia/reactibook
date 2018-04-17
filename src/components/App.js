import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Posts from './Posts';

import SignUpPage from './SignUp';
import SignInPage from './SignIn';
import PasswordForgetPage from './PasswordForget';


import * as routes from '../constants/routes';
import { firebase } from '../firebase';

// const App = () =>
//   <Router>
//     <div>
//       <Navigation />

//       <hr />

      
//     </div>
//   </Router>

const App = () =>
      <Router>
        <div>
          {/* <Posts authUser={this.state.authUser} />

          <hr /> */}
          
      
      
      
          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />}  />
          <Route exact path={routes.SIGN_IN} component={() => <SignInPage />}  />
          <Route exact path={routes.HOME} component={() => <SignInPage />}  />
          <Route exact path={routes.POSTS} component={() => <Posts />} />
          <Route exact path={routes.PASSWORD_FORGET} component={() => <PasswordForgetPage />} />
          
        </div>
      </Router>
 
 


export default App;
