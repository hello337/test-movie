import React from 'react';
import { Link } from 'react-router-dom';

import './header.sass';

const Header = () => {
    return (
        <div className="head">
            <Link to="/">Home page</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/popular">Popular</Link>
        </div>
    );
};

export default Header;