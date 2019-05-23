import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Header extends React.Component {
    state = {
    };

    render() {
        const {
            favoritesReducer: {
                favorites
            },
            classes
        } = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>        
                            <Link to="/" style={{textDecoration: 'none', color: '#FFF'}}>Books</Link>
                        </Typography>
                        <div>
                            <Link to="/favorites" style={{textDecoration: 'none', color: '#FFF'}}>
                                <Badge badgeContent={favorites.length} color="secondary">
                                    <FavoriteIcon />
                                </Badge>
                            </Link>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Header.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        favoritesReducer: state.favoritesReducer,
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Header));