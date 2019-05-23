import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Books from './books';

const Content = (props) => {
    return (
        <main>
            <Switch>
                <Route exact path="/" component={Books} />
                <Route exact path="/detail/:id" component={(props) => {
                    return (
                        <div>
                            Hello detail
                            {props.match.params.id}
                        </div>
                    )
                }} />
            </Switch>
        </main>
    )
};

export default Content;