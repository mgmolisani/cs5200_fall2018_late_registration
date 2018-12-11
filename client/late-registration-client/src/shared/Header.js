import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = props => {
    return (
        <nav className='navbar navbar-dark bg-dark navbar-expand'>
            <div className='container'>
                <NavLink className='navbar-brand'
                         to={'/'}>
                    CS5200 Final Project - Late Registration
                </NavLink>
                <ul className='navbar-nav ml-auto'>
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
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;