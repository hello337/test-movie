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
        // let genreId = this.props.id;
        // console.log(genreId);
        // let genreName = '';
        // genres.forEach(item => {console.log(typeof(item.id)); if(item.id == genreId) genreName=item.name});
        // console.log(genreName,typeof(genreName));
        // let genreNameUpper;
        // try {
        //     genreNameUpper = genreName[0].toUpperCase() + genreName.slice(1);
        // } catch {
        //     genreNameUpper = '';
        // }
        
        // if (loading) {
        //     return <Spinner />;
        // }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <Fragment>
                {/* <h2> { genreNameUpper } </h2> */}
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
            </Fragment>
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