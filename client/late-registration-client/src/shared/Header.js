import React from 'react';
import {NavLink} from 'react-router-dom';
import UserContext from '../contexts/UserContext';

const Header = props => {
    return (
        <UserContext.Consumer>
            {({currentUser}) => {
                return (
                    <nav className='navbar navbar-dark bg-dark navbar-expand'>
                        <div className='container'>
                            <NavLink className='navbar-brand'
                                     to={'/'}>
                                CS5200 Final Project - Late Registration
                            </NavLink>
                            <ul className='navbar-nav ml-auto'>
                                {
                                    currentUser
                                    && currentUser.userType === 'ADMIN'
                                    && <li className='nav-item'>
                                        <NavLink className='nav-link'
                                                 to={'/admin'}>
                                            Admin
                                        </NavLink>
                                    </li>
                                }
                                <li className='nav-item'>
                                    <NavLink className='nav-link'
                                             to={'/team'}>
                                        Teams
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link'
                                             to={'/game'}>
                                        Games
                                    </NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink className='nav-link'
                                             to={'/user'}>
                                        Users
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </nav>
                );
            }}
        </UserContext.Consumer>
    );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;