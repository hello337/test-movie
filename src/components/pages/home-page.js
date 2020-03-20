import React, { Fragment } from 'react';
import Carousel from '../carousel';

const HomePage = () => {
     
    return (
        <Fragment>
            <h1>Welcome!</h1>
            <div className="wrap">
                <Carousel/>
            </div>
        </Fragment>
    );
};



export default HomePage;