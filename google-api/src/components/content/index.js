import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Books from './books';
import BookDetail from './detail';
import Favorites from './favorites';

const Content = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Books} />
                <Route exact path="/book/:id" component={BookDetail} />
                <Route exact path="/favorites" component={Favorites} />
            </Switch>
        </main>
    )
};

export default Content;