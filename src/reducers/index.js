const initialState = {
	popularAssets: [],
	loading: true,
	error: null,
	genres: [],
	assets: [],
	asset: {}
};
  
  const reducer = (state = initialState, action) => {
  
    switch (action.type) {
		case 'GET_POPULAR_DATA_ACTION':
			return {
				...state,
				popularAssets: [],
				loading: true,
				error: null
			};
		case 'POPULAR_DATA_RECEIVED_ACTION':
			return {
				...state,
				popularAssets: action.payload,
				loading: false,
				error: null
			};
		case 'POPULAR_DATA_ERROR_ACTION':
			return {
				...state,
				popularAssets: [],
				loading: false,
				error: action.payload
			};
		case 'GET_GENRES_DATA_ACTION':
			return {
				...state,
				genres: [],
				loading: true,
				error: null
			};
		case 'GENRES_DATA_RECEIVED_ACTION':
			return {
				...state,
				genres: action.payload,
				loading: false,
				error: null
			};
		case 'GENRES_DATA_ERROR_ACTION':
			return {
				...state,
				genres: [],
				loading: false,
				error: action.payload
			};
		case 'GET_GENRE_ASSETS_DATA_ACTION':
			return {
				...state,
				assets: [],
				loading: true,
				error: null
			};
		case 'GENRE_ASSETS_DATA_RECEIVED_ACTION':
			return {
				...state,
				assets: action.payload,
				loading: false,
				error: null
			};
		case 'GENRE_ASSETS_DATA_ERROR_ACTION':
			return {
				...state,
				assets: [],
				loading: false,
				error: action.payload
			};
		case 'GET_ASSET_DATA_ACTION':
			return {
				...state,
				assets: {},
				loading: true,
				error: null
			};
		case 'ASSET_DATA_RECEIVED_ACTION':
			return {
				...state,
				asset: action.payload,
				loading: false,
				error: null
			};
		case 'ASSET_DATA_ERROR_ACTION':
			return {
				...state,
				asset: {},
				loading: false,
				error: action.payload
			};


  
		default:
			return state;
    }
  };
  
  export default reducer;