import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import User from './pages/User';
import Team from './pages/Team';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import UserContext from './contexts/UserContext';
import Header from './shared/Header';

class App
    extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        };
        this.setCurrentUser = this.setCurrentUser.bind(this);
    }

    setCurrentUser(user) {
        this.setState({currentUser: user});
    }

    render() {
        return (
            <UserContext.Provider value={{
                currentUser: this.state.currentUser,
                setCurrentUser: this.setCurrentUser
            }}>
                <Router>
                    <div>
                        <Header/>
                        <div className='container'>
                            <Switch>
                                <Route path={'/'}
                                       exact
                                       component={Home}/>
                                <Route path={'/game'}
                                       component={Game}/>
                                <Route path={'/team'}
                                       component={Team}/>
                                <Route path={'/user'}
                                       component={User}/>
                                <Route path={'*'}
                                       component={NotFound}/>
                            </Switch>
                        </div>
                    </div>
                </Router>
            </UserContext.Provider>
        );
    }
}

export default App;
