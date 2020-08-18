import React from 'react';
import { Link } from 'react-router-dom';

import './asset-list-item.sass';
import image from '../../img/not-found.png';

const AssetListItem = ({ asset: { poster, title, imdb, id } }) => {
    let path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster}`;
    const assetPath = `/asset/${id}`
    return (
        <div className="asset-card">
            <Link to={assetPath}>
                <div>
                    <div className="img-wrap">
                        {<img src={ poster === null ? image : path }/>}
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