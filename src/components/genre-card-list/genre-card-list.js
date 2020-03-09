import React, { Component, Fragment } from 'react';

import './genre-card-list.sass';

import { connect } from 'react-redux';
import { fetchGenres } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import GenreCard from '../genre-card';

class GenreCardList extends Component {

    componentDidMount() {
        this.props.fetchGenres();
    }

    
    render() {
        const { genres, loading, error } = this.props;
        const genresCards = genres.map((genre) => {
            return (
                    <GenreCard
                        key={genre.id} 
                        id={genre.id}
                        name={genre.name}/>
            )
        });

        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <Fragment>
                <h1>
                    Жанры
                </h1>
                <div className="genresArr">
                    {genresCards}
                </div>
            </Fragment>
        );
    };
};

const mapStateToProps = ({ genres, loading, error }) => {
    return { genres, loading, error };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {

    return {
        fetchGenres: fetchGenres(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(GenreCardList));