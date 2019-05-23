import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import Books from './books';

const styles = {
    
};

class Content extends React.Component {
    state = {
    };

    render() {
        const { classes } = this.props;

        return (
            <main>
                <Switch>
                    <Route exact path="/" component={Books} />
                    <Route exact path="/detail/:id" component={(props) => {
                        return (
                            <div>
                                Hello detail
                            </div>
                        )
                    }} />
                </Switch>
            </main>
        );
    }
}

Content.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Content);