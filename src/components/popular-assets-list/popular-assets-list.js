import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchPopular } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import {Link} from 'react-router-dom';
import AssetListItem from '../asset-list-item';

class PopularAssetsList extends Component {
    componentDidMount() {
        this.props.fetchPopular();        
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
            <div>
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