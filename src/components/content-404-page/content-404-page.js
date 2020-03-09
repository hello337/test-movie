import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import AssetListItem from '../asset-list-item';

class Content404Page extends Component {
    componentDidMount() {
        this.props.fetchPopular();        
    }

    render() {
        const { popularAssets, loading, error } = this.props;
        console.log(popularAssets);
        let lastThreePopular = [];
        try {
            lastThreePopular = popularAssets.slice(-3);
        } catch {
            lastThreePopular = [];
        }
        console.log(lastThreePopular);
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }
        return (
            <div>
                <h1>WOW...404</h1>
                <h2>
                    We don't have this page, but you can see this movies
                </h2>
                <div className="assets-list">
                {
                    lastThreePopular.map((asset) => {
                        return (
                            <AssetListItem 
                                key={asset.id}
                                asset={asset} />
                        )
                    })
                }
                </div>
            </div>
        )
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

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(Content404Page));