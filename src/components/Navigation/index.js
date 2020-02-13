import React from 'react';
import {Link} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import SignOutButton from "../SignOut";
import '../../css/components/_navigation.scss';

const Navigation = ({authUser}) => (
    <div className="navigation">
        {authUser ? <NavigationAuth/> : <NavigationNonAuth/>}
    </div>
);

const NavigationAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
            <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
            <SignOutButton/>
        </li>
    </ul>
);
const NavigationNonAuth = () => (
    <ul>
        <li>
            <Link to={ROUTES.SIGN_IN}>Sign in</Link>
        </li>
        <li>
            <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
    </ul>
);

export default Navigation;
