import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAsset, fetchTrailer } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

import './asset-details.sass';
import image from '../../img/not-found.png';
class AssetDetails extends Component {

    state = {
        showModal: false
    };

    componentDidMount() {
        Modal.setAppElement('body');
        this.props.fetchAsset(this.props.id);
        this.props.fetchTrailer(this.props.id);
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    }
      
    handleCloseModal = () => {
        this.setState({ showModal: false });
    }

    renderTrailer = (trailerPath) => {
        const { length } = this.props.trailer;
        return length === 0 ? 
            <h2>This movie has no trailers!</h2> :
            <div className="player-wrapper">
                <ReactPlayer url={trailerPath} playing className="youtube" controls={true}/>
            </div>
    };

    render() {
        const { asset: { runtime, vote_average, release_date, original_language, original_title, title, overview, poster_path }, 
                loading, 
                error, 
                trailer } = this.props; 
        let trailerPath;
        const path = `https://image.tmdb.org/t/p/w300_and_h450_bestv2${poster_path}`;
        try{
            trailerPath = `https://www.youtube.com/watch?v=${trailer[0].key}`
        } catch {
            trailerPath = ''
        }

        if (loading) {
            return <Spinner />;
        }
      
        if (error) {
            return <ErrorIndicator />;
        }

        return (
            <div className="asset-details-content">
                <div>
                    <h1>{title}</h1>
                </div>
                <div className="img-details">
                    <div className="image">
                        {<img src={poster_path === null ? image : path}/>}
                    </div>
                    <div className="details">
                        <div className="overview">
                            <strong>Короткое описание: </strong>{overview}
                        </div>
                        <div>
                            <strong>Оригинальное название: </strong>{original_title}
                        </div>
                        <div>
                            <strong>Оригинальный язык: </strong>{original_language}
                        </div>
                        <div>
                            <strong>Дата выхода: </strong>{release_date}
                        </div>
                        <div>
                            <strong>Средняя оценка: </strong>{vote_average}
                        </div>
                        <div>
                            <strong>Длительность: </strong>{runtime} минут
                        </div>
                        <div className="watch-trailer">
                            <button onClick={this.handleOpenModal}>Watch trailer</button>
                        </div>
                    </div>
                </div>
                <div className="modal-wrap">
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay"
                        >
                        {this.renderTrailer(trailerPath)}
                        <div className="close-button">
                            <button onClick={this.handleCloseModal}>Back to details</button>
                        </div>
                    </Modal> 
                </div>         
            </div>
        )
    };
};

const mapStateToProps = ({ asset, loading, error, trailer }) => {
    return { asset, loading, error, trailer };
};
  
const mapDispatchToProps = (dispatch, { moviesService }) => {
    return {
        fetchAsset: fetchAsset(moviesService, dispatch),
        fetchTrailer: fetchTrailer(moviesService, dispatch)
    };
};

export default withMoviesService()(connect(mapStateToProps, mapDispatchToProps)(AssetDetails));