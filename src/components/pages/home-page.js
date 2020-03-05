import React, { Component } from 'react';

import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.css";

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {Link} from 'react-router-dom';

class HomePage extends Component {

    componentDidMount() {
        this.props.fetchPopular();        
    }
    
    render(){

        const { popularAssets, loading, error } = this.props;        
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        
        return (
            <div className="wrap">
                <Carousel
                    width='24%'
                    showIndicators={false}>
                    {
                        popularAssets.map((asset) => {
                            const path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${asset.poster}`;
                            return (
                                    <div key={asset.id}>
                                        <img src={path}/>
                                        <p className="legend">{asset.title}</p>
                                    </div>
                            );
                        })
                    }
                </Carousel> 
            </div>
        
        );
    };
};

const mapStateToProps = ({ popularAssets, loading, error }) => {
    return { popularAssets, loading, error };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchPopular: fetchPopular(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(HomePage));