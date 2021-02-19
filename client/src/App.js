import './App.css';
import {Fragment} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Navbar from "./components/layout/navbar";
import Home from "./components/pages/Home";
import Profile from "./components/pages/Profile";
import About from "./components/pages/About";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import PrivateRoute from "./components/routing/PrivateRoute";

import PostState from "./context/post/PostState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
    setAuthToken(localStorage.token);
}

const App = () => {
  return (
      <AuthState>
          <PostState>
              <AlertState>
                  <Router>
                    <Fragment>
                        <Navbar />
                        <div className="container">
                            <Alerts />
                            <Switch>
                                <PrivateRoute exact path={'/profile'} component={Profile} />
                                <Route exact path={'/'} component={Home} />
                                <Route exact path={'/about'} component={About} />
                                <Route exact path={'/register'} component={Register} />
                                <Route exact path={'/login'} component={Login} />
                            </Switch>
                        </div>
                    </Fragment>
                  </Router>
              </AlertState>
          </PostState>
      </AuthState>
  );
}

export default App;
