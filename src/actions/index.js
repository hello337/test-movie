const popularRequested = () => {
    return {
        type: 'GET_POPULAR_DATA_ACTION'
    };
};

const popularLoaded = (popularAssets) => {
    return {
        type: 'POPULAR_DATA_RECEIVED_ACTION',
        payload: popularAssets
    };
};

const popularError = (error) => {
    return {
        type: 'POPULAR_DATA_ERROR_ACTION',
        payload: error
    };
};

const fetchPopular = (moviesService, dispatch) => () => {
    dispatch(popularRequested());
    moviesService.getPopular()
      .then((data) => dispatch(popularLoaded(data)))
      .catch((err) => dispatch(popularError(err)));
};

const genresRequested = () => {
    return {
        type: 'GET_GENRES_DATA_ACTION'
    };
};

const genresLoaded = (genres) => {
    return {
        type: 'GENRES_DATA_RECEIVED_ACTION',
        payload: genres
    };
};

const genresError = (error) => {
    return {
        type: 'GENRES_DATA_ERROR_ACTION',
        payload: error
    };
};

const fetchGenres = (moviesService, dispatch) => () => {
    dispatch(genresRequested());
    moviesService.getGenres()
      .then((data) => dispatch(genresLoaded(data)))
      .catch((err) => dispatch(genresError(err)));
};

const genreAssetsRequested = () => {
    return {
        type: 'GET_GENRE_ASSETS_DATA_ACTION'
    };
};

const genreAssetsLoaded = (assets) => {
    return {
        type: 'GENRE_ASSETS_DATA_RECEIVED_ACTION',
        payload: assets
    };
};

const genreAssetsError = (error) => {
    return {
        type: 'GENRE_ASSETS_DATA_ERROR_ACTION',
        payload: error
    };
};

const fetchGenreAssets = (moviesService, dispatch) => (id, page) => {
    dispatch(genreAssetsRequested());
    moviesService.getAssetsByGenre(id, page)
      .then((data) => dispatch(genreAssetsLoaded(data)))
      .catch((err) => dispatch(genreAssetsError(err)));
};

const genreAssetsReset = () => {
    return {
        type: 'GENRE_ASSETS_DATA_RESET_ACTION'
    };
};

const resetGenreAssets = (dispatch) => () => {
    dispatch(genreAssetsReset());
};

const assetRequested = () => {
    return {
        type: 'GET_ASSET_DATA_ACTION'
    };
};

const assetLoaded = (asset) => {
    return {
        type: 'ASSET_DATA_RECEIVED_ACTION',
        payload: asset
    };
};

const assetError = (error) => {
    return {
        type: 'ASSET_DATA_ERROR_ACTION',
        payload: error
    };
};

const fetchAsset = (moviesService, dispatch) => (id) => {
    dispatch(assetRequested());
    moviesService.getAsset(id)
      .then((data) => dispatch(assetLoaded(data)))
      .catch((err) => dispatch(assetError(err)));
};

const trailerRequested = () => {
    return {
        type: 'GET_TRAILER_DATA_ACTION'
    };
};

const trailerLoaded = (trailer) => {
    return {
        type: 'TRAILER_DATA_RECEIVED_ACTION',
        payload: trailer
    };
};

const trailerError = (error) => {
    return {
        type: 'TRAILER_DATA_ERROR_ACTION',
        payload: error
    };
};

const fetchTrailer = (moviesService, dispatch) => (id) => {
    dispatch(trailerRequested());
    moviesService.getTrailer(id)
      .then((data) => dispatch(trailerLoaded(data)))
      .catch((err) => dispatch(trailerError(err)));
};



export {
    resetGenreAssets,
    fetchPopular,
    fetchGenres,
    fetchGenreAssets,
    fetchAsset,
    fetchTrailer
};
