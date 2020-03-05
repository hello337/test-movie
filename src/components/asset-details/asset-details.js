import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAsset } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

class AssetDetails extends Component {

    componentDidMount() {
        this.props.fetchAsset(this.props.id);
    }
    render() {
        const { asset, loading, error } = this.props; 
        const { title, overview, poster_path } = asset;
        const path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`;
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <div>
                <img src={path}/>
                {title}
                {overview}
            </div>
        )
    };
};

const mapStateToProps = ({ asset, loading, error }) => {
    return { asset, loading, error };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchAsset: fetchAsset(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(AssetDetails));