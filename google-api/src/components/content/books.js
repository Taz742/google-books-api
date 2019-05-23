import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import axios from 'axios';
import { connect } from 'react-redux';
import { GetBooks } from '../../redux/actions';


const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
          width: 1100,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    cardGrid: {
        padding: `${theme.spacing.unit * 8}px 0`,
    },
});

class Books extends React.Component {
    state = {
        searchValue: '',
    };

    componentDidMount() {
        const { searchValue } = this.state;

        this.props.getBooks(searchValue || 'default');
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={32}>
                    Books goes here
                </Grid>
            </div>
        );
    }
};

Books.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        booksReducer: state.booksReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (searchValue) => {
            dispatch(GetBooks(searchValue));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));