import React, {Component} from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import Home from './pages/Home';
import Game from './pages/Game';
import NotFound from './pages/NotFound';
import UserContext from './contexts/UserContext';
import Header from './shared/Header';
import Team from './pages/Team';
import User from './pages/User';

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
                                <Route path={'/game'}>
                                    {() => !this.state.currentUser
                                        ? <Redirect to='/'/>
                                        : <Game/>}
                                </Route>
                                <Route path={'/team'}>
                                    {() => !this.state.currentUser
                                        ? <Redirect to='/'/>
                                        : <Team/>}
                                </Route>
                                <Route path={'/user'}>
                                    {() => !this.state.currentUser
                                        ? <Redirect to='/'/>
                                        : <User/>}
                                </Route>
                                <Route path={'/youtube'}>
                                    {() => <div>
                                        <iframe width="100%" height="700"
                                                src="https://www.youtube.com/embed/3BFnYOk0B6g" frameBorder="0"
                                                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen/>
                                    </div>}
                                </Route>
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
