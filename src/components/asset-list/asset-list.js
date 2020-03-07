import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { fetchGenreAssets, fetchGenres, resetGenreAssets } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import AssetListItem from '../asset-list-item';
import InfiniteScroll from 'react-infinite-scroller';

import './asset-list.sass';

class AssetList extends Component {
    componentDidMount() {
        this.props.resetGenreAssets();
        this.props.fetchGenreAssets(this.props.id, this.props.assetPageCounter);
        this.props.fetchGenres();
    }

    loadData = (page) => {
        this.props.fetchGenreAssets(this.props.id, page);
        console.log('Page: ', page);
    }

    renderAssets = () => {
        console.log('Assets arr', this.props.assets);
        return this.props.assets.map((assetsRender) => assetsRender.map((asset) => <AssetListItem 
            key={asset.id}
            asset={asset} />
            ))

    }

    render() {
        const { genres, assets, loading, error } = this.props; 
        // const genreId = this.props.id;
        // console.log(genres);
        // console.log(this.props.id);
        // const genreName = genres.find((a) => a.id === genreId);
        // console.log(genreName);
        // console.log("Assets:", assets);
        
        // if (loading) {
        //     return <Spinner />;
        // }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <InfiniteScroll
                initialLoad={false} 
                pageStart={2}
                loadMore={this.loadData}
                hasMore={true}
                loader={<Spinner/>}>
                <div className="assets-list">
                {
                    this.renderAssets()
                }
                </div>
            </InfiniteScroll>
        );
    };
};

const mapStateToProps = ({ genres, assets, loading, error, assetPageCounter }) => {
    return { genres, assets, loading, error, assetPageCounter };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchGenreAssets: fetchGenreAssets(moviesService, dispatch),
        fetchGenres: fetchGenres(moviesService, dispatch),
        resetGenreAssets: resetGenreAssets(dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(AssetList));