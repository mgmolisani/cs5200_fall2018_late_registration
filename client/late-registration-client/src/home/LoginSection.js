import React from 'react';
import CardSection from '../shared/CardSection';
import UserContext from '../contexts/UserContext';
import LoginCard from './LoginCard';
import {UserService} from '../services/UserService';

const LoginSection = props => {
    return (
        <UserContext.Consumer>
            {({currentUser, setCurrentUser}) => {
                return (
                    <CardSection title={props.title}>
                        {props.users.map((user, index) => <LoginCard key={index}
                                                                     username={user.username}
                                                                     password={user.password}
                                                                     setCurrentUser={() => UserService.findUserByCredentials({
                                                                         username: user.username,
                                                                         password: user.password
                                                                     }).then(user => setCurrentUser(user))}/>
                        )}
                    </CardSection>
                );
            }}
        </UserContext.Consumer>
    );
};

LoginSection.propTypes = {};

LoginSection.defaultProps = {};

export default LoginSection;