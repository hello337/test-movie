import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchGenreAssets } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import AssetListItem from '../asset-list-item';

import './asset-list.sass';

class AssetList extends Component {
    componentDidMount() {
        this.props.fetchGenreAssets(this.props.id);
    }

    render() {
        const { assets, loading, error } = this.props; 
        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <div className="assets-list">
            {
                assets.map((asset) => {
                    return (
                        <AssetListItem 
                            key={asset.id}
                            asset={asset} />
                    )
                })
            }
            </div>
        );
    };
};

const mapStateToProps = ({ assets, loading, error }) => {
    return { assets, loading, error };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchGenreAssets: fetchGenreAssets(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(AssetList));