import React from 'react';
import { MoviesServiceConsumer } from '../movies-service-context';

const withMoviesService = () => (Wrapped) => {
  return (props) => {
    return (
      <MoviesServiceConsumer>
        {
          (moviesService) => {
            return (<Wrapped {...props}
                     moviesService={moviesService}/>);
          }
        }
      </MoviesServiceConsumer>
    );
  }
};

export default withMoviesService;