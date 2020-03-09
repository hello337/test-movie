import React, { Component } from "react";
import Slider from "react-slick";

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {Link} from 'react-router-dom';

import './carousel.sass';
 

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black", borderRadius: '100px' }}
        onClick={onClick}
      />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", background: "black", borderRadius: '100px'}}
        onClick={onClick}
      />
    );
}

class Carousel extends Component {

    componentDidMount() {
        this.props.fetchPopular();        
    }
    render() {
        const settings = {
            infinite: true,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            autoplay: true,
            speed: 2000,
            autoplaySpeed: 3000,
            slidesToShow: 4,
            slidesToScroll: 4,
            slide: 'div',
            draggable: false,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
              ]
        };

        const { popularAssets, loading, error } = this.props;        
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <div className="carouselWrap">
                <Slider {...settings}>
                    {
                        popularAssets.map((asset) => {
                            const path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${asset.poster}`;
                            const linkPath = `/asset/${asset.id}`
                            return (
                                <Link to={linkPath} key={asset.id}>
                                    <img src={path}/>
                                </Link>
                            )
                        })
                    }
                </Slider>
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