import React from 'react';

import { Link } from 'react-router-dom';

import './asset-list-item.sass';

import image from '../../img/not-found.png';

const AssetListItem = ({ asset }) => {
    const { poster, title, imdb, id } = asset;
    let path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`;
    let imageItem;
    if(poster === null) {
        imageItem = <img src={image}/>;
    } else {
        imageItem = <img src={path}/>;
    }
    const assetPath = `/asset/${id}`
    return (
        <div className="asset-card">
            <Link to={assetPath}>
                <div>
                    <div className="img-wrap">
                        {imageItem}
                    </div>
                    <div className="card-title">
                        {title}
                    </div>
                    <div className="card-desc">
                        Imdb rating: {imdb}
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default AssetListItem;