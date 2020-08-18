import React, { Component } from "react";

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {Link} from 'react-router-dom';

import './carousel.sass';
 

class Carousel extends Component {
	
	state = {
		active: 0
	}

    componentDidMount() {
        this.props.fetchPopular();        
	}
	
	nextOne = () => {
        const { active } = this.state;
        const { popularAssets: { length } } = this.props;
        (active < length - 1) ? 
        this.setState((state) => ({
            active: state.active + 1
        })) : 
        this.setState({
            active: 0
        })
	}
	
	prevOne = () => {
        const { active } = this.state;
        const { popularAssets: { length } } = this.props;
        (active > 0) ? 
        this.setState((state) => ({
            active: state.active - 1
        })) : 
        this.setState({
            active: length - 1
        })
	}
	
	setSliderStyles = () => {
        const { active } = this.state;
        const { popularAssets: { length } } = this.props;
        const transition = active * - 100 / length;

        return {
            width: (length * 100) + '%',
            transform: `translateX(${transition}%)`
        }
	}
	
	renderSlides = () => {
        const { popularAssets, popularAssets: { length } } = this.props;
        const transition = 100 / length + "%";

        return popularAssets.map((asset) => {
            const path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${asset.poster}`;
            const linkPath = `/asset/${asset.id}`;
            return(   
                <Link to={linkPath} key = {asset.id}>
                    <div
                        className='each-slide'
                        style = {{width: transition}}>
                            <img src={path}/>
                    </div>
                </Link>
        )})
    }

    renderArrows() {
        return(
            <div>
                <button
                    type="button"
                    className="arrows prev"
                    onClick={this.prevOne}>
                    <svg fill='#FFFFFF' width='50' height='50' viewBox='0 0 24 24'>
                    <path d='M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' stroke="black"/>
                    <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
                <button
                    type="button"
                    className="arrows next"
                    onClick={this.nextOne}>
                    <svg fill='#FFFFFF' height='50' viewBox='0 0 24 24' width='50'>
                    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' stroke="black"/>
                    <path d='M0 0h24v24H0z' fill='none'/>
                    </svg>
                </button>
            </div>
        )
    }

    render() {
        const { loading, error } = this.props;        
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <div className="slider">
                <div 
                    className="wrapper"
                    style={this.setSliderStyles()}>
                    {this.renderSlides()}                       
                </div>
                {this.renderArrows()}
            </div>
        );
    }
}

const mapStateToProps = ({ popularAssets, loading, error }) => {
    return { popularAssets, loading, error };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchPopular: fetchPopular(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(Carousel));