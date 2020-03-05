import React from 'react';
import { Link } from 'react-router-dom';

import './genre-card.sass';

const GenreCard = ({ name, id }) => {
    const genre = name[0].toUpperCase() + name.slice(1);
    const path = `/movies/${id}`;
    return (
        <div className="card">
            <Link to={path}>
                {genre}
            </Link>
        </div>
    );
};

export default GenreCard;