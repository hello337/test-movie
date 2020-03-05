import React from 'react';
import AssetList from '../asset-list';


const MoviesByCategoryPage = ({id}) => {
    console.log(id);
    return (
        <AssetList id={id}/>
    );
};

export default MoviesByCategoryPage;