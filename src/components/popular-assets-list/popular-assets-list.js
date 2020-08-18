import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import AssetListItem from '../asset-list-item';

class PopularAssetsList extends Component {
    componentDidMount() {
        const { fetchPopular } = this.props;
        fetchPopular();        
    }
    render() {

        const { popularAssets, loading, error } = this.props;        
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <Fragment>
                <div><h1>Популярные фильмы</h1></div>
                <div className="assets-list">
                {
                    popularAssets.map((asset) => {
                        return (
                            <AssetListItem 
                                key={asset.id}
                                asset={asset} />
                        )
                    })
                }
                </div>
            </Fragment>
        )
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

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(PopularAssetsList));