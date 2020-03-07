import React, { Fragment, Component } from 'react';
import AssetList from '../asset-list';
import Spinner from '../spinner';
import LazyLoad from 'react-lazyload';
import InfiniteScroll from 'react-infinite-scroller';
class MoviesByCategoryPage extends Component {
    render() {
        const { id } = this.props;
        return (
            <AssetList id={id}/>
        )     
    }
};

export default MoviesByCategoryPage;