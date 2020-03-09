import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import './app.sass';
import Header from '../header';
import { HomePage, CategoriesPage, MoviesByCategoryPage, AssetDetailsPage, PopularPage, NotFoundPage} from '../pages';


const App = () => {
    return (
        <Fragment>
            <Header/>
            <Switch>
                <Route
                    path="/"
                    component={HomePage}
                    exact/>
                <Route
                    path="/categories"
                    component={CategoriesPage}/>
                <Route
                    path="/movies/:category_id"
                    render={
                        ({ match }) => {
                            const { category_id } = match.params;
                            return <MoviesByCategoryPage id={category_id}/>
                        }
                    }
                    exact/>
                <Route
                    path="/asset/:id"
                    render={
                        ({match}) => {
                            const { id } = match.params;
                            return <AssetDetailsPage id={id}/>
                        }
                    }
                    exact/>
                <Route
                    path="/popular"
                    component={PopularPage}/>
                <Route
                    path="*"
                    component={NotFoundPage}/>
            </Switch>
        </Fragment>
    )
};

export default App;