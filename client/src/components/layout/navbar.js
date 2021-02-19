import React, {Fragment, useContext} from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import PostContext from "../../context/post/postContext";

const Navbar = ({title, icon}) => {
    const authContext = useContext(AuthContext);
    const postContext = useContext(PostContext);

    const {isAuthenticated, logout, user} = authContext;
    const {clearPosts} = postContext;

    const onLogout = () => {
        logout();
        clearPosts();
    }

    const authLinks = (
        <Fragment>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                |
            </li>
            <li>
                <Link to={'/about'}>About</Link>
            </li>
            <li>
                |
            </li>
            <li><Link to={'/profile'} className={'badge badge-success'}>Hello { user && user.name}</Link></li>
            <li>
                |
            </li>
            <li>
                <a onClick={onLogout} href={''} className={'badge badge-danger'}>
                    <i className="fas fa-sign-out-alt" /> <span className="hide-sm">Logout</span>
                </a>
            </li>
        </Fragment>
    );

    const guestLinks = (
        <Fragment>
            <li>
                <Link to={'/'}>Home</Link>
            </li>
            <li>
                |
            </li>
            <li>
                <Link to={'/about'}>About</Link>
            </li>
            <li>
                |
            </li>
            <li>
                <Link to={'/register'}>Register</Link>
            </li>
            <li>
                |
            </li>
            <li>
                <Link to={'/login'}>Login</Link>
            </li>
        </Fragment>
    );

    return (
        <div className={'navbar bg-dark'}>
            <h1>
                <i className={icon}/> {title}
                <ul>

                </ul>
            </h1>
            <ul>
                {isAuthenticated ? authLinks : guestLinks}
            </ul>
        </div>
    );
}

Navbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
}

Navbar.defaultProps = {
    title: 'Semicolon',
    icon: 'fas fa-code'
}

export default Navbar;