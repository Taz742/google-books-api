import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';
import classNames from 'classnames';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        marginTop: theme.spacing.unit * 3,
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        [theme.breakpoints.up(800 + theme.spacing.unit * 3 * 2)]: {
          width: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    marginTop: {
        marginTop: 10,
        marginLeft: 30,
    },
});

class Favorites extends React.Component {
    state = {
        expandedId: '',
    };

    handleChange = (id) => {
        this.setState({
            expandedId: this.state.expandedId === id ? '' : id
        });
    };

    render() {
        const {
            classes,
            favoritesReducer: {
                favorites
            },
        } = this.props;

        const { expandedId } = this.state;

        if (favorites.length === 0) {
            return (
                <div className={classes.root}>
                    Favorites is empty...                
                </div>
            )
        }

        return (
            <div className={classes.root}>
            {favorites.map((book) => {
                return (
                    <ExpansionPanel
                        expanded={expandedId === book.id}
                        onChange={() => {
                            this.handleChange(book.id);
                        }}
                        key={book.id}
                    >
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Avatar alt="Remy Sharp" src={book.volumeInfo.readingModes.image ? book.volumeInfo.imageLinks.smallThumbnail : 'no image url'} />
                            <Typography className={classNames(classes.secondaryHeading, classes.marginTop)}>{book.volumeInfo.title}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Typography>
                                {`${book.volumeInfo.description} `}
                                <Link to={`/book/${book.id}`} component="p" style={{textDecoration: 'none', color: 'black', fontSize: 16}}>
                                    Read more details...
                                </Link>
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                )
            })}
            </div>
        );
    }
}

Favorites.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {
        favoritesReducer: state.favoritesReducer
    }
};

export default connect(mapStateToProps)(withStyles(styles)(Favorites));