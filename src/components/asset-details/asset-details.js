import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchAsset, fetchTrailer } from '../../actions';
import withMoviesService from '../hoc';

import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';
import ReactPlayer from 'react-player';
import Modal from 'react-modal';

import './asset-details.sass';

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

    render() {
        const { asset, loading, error, trailer } = this.props; 
        const { title, overview, poster_path } = asset;
        console.log(trailer);
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
            <div>
                <div>
                    <img src={path}/>
                </div>
                <div>
                    <div>
                        {title}
                    </div>
                    <div>
                        {overview}
                    </div>
                </div>
                <div>
                    <button onClick={this.handleOpenModal}>Watch trailer</button>
                    <Modal
                        isOpen={this.state.showModal}
                        contentLabel="onRequestClose Example"
                        onRequestClose={this.handleCloseModal}
                        className="Modal"
                        overlayClassName="Overlay"
                        >
                        <ReactPlayer url={trailerPath}/>
                        <button onClick={this.handleCloseModal}>Close Modal</button>
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