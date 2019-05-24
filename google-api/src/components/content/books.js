import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { GetBooks, AddOrRemoveFavoriteBook } from '../../redux/actions';
import { CircularLoading } from './loading';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

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
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '100%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },  
    actions: {
        display: 'flex',
    },
});

class Books extends React.Component {
    state = {
        searchValue: '',
    };

    handleChange = (e) => {
        this.setState({
            searchValue: e.target.value
        }, this.getBooks);
    }

    getBooks = () => {
        const { searchValue } = this.state;

        this.props.getBooks(searchValue);
    }

    redirectToDetail = (id) => {
        this.props.history.push(`/book/${id}`);
    }

    render() {
        const {
            classes,
            booksReducer: {
                books,
                fetching,
                received
            },
            favoritesReducer: {
                favorites
            }
        } = this.props;

        const favoriteIds = favorites.map((book) => book.id);

        const cards = () => (
            <Grid container spacing={32}>
                {books.map((book) => {
                    const {
                        volumeInfo: {
                            title,
                            description
                        }
                    } = book;

                    const isFavorite = Boolean(favoriteIds.indexOf(book.id) > -1);

                    return (
                        <Grid item key={book.id} sm={4} md={3} lg={3} xs={6}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image={book.volumeInfo.readingModes.image ? book.volumeInfo.imageLinks.thumbnail : 'no image url'}
                                    title={title}
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h6" component="h4" noWrap={true}>
                                        {title}
                                    </Typography>
                                    <Typography noWrap={true}>
                                        {description}
                                    </Typography>
                                </CardContent>
                                <CardActions className={classes.actions}>
                                    <Button size="small" color="primary" onClick={() => { this.redirectToDetail(book.id) }}>
                                        Details
                                    </Button>
                                    <IconButton
                                        aria-label="Add to favorites"
                                        style={{marginLeft: 'auto'}}
                                        onClick={() => {
                                            this.props.addOrRemoveFavoriteBook(book);
                                        }}
                                    >
                                        <FavoriteIcon color={isFavorite ? "secondary" : "inherit"} />
                                    </IconButton>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        )

        return (
            <div className={classNames(classes.layout)}>
                <div className={classes.layout}>
                    <TextField
                        id="outlined-name"
                        label="Find a book"
                        value={this.state.name}
                        onChange={this.handleChange}
                        margin="normal"
                        variant="outlined"
                        style={{marginTop: 40, paddingBottom: 20}}
                    />
                </div>
                {
                    this.state.searchValue === '' ?
                    <p>Please find a book</p>
                    :
                    books.length === 0 && !fetching ?
                    <p>Books is empty</p>
                    :
                    <React.Fragment>
                        {fetching || !received ? 
                            <div style={{textAlign: 'center', marginTop: 20}}>
                                <CircularLoading />
                            </div>
                            :
                            cards()
                        }
                    </React.Fragment>
                }
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
        favoritesReducer: state.favoritesReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBooks: (searchValue) => {
            dispatch(GetBooks(searchValue));
        },
        addOrRemoveFavoriteBook: (book) => {
            dispatch(AddOrRemoveFavoriteBook(book));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Books));