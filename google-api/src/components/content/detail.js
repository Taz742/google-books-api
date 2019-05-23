import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { GetBookDetail } from '../../redux/actions';
import { CircularLoading } from './loading';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { AddOrRemoveFavoriteBook } from '../../redux/actions';
import FavoriteIcon from '@material-ui/icons/Favorite';
import IconButton from '@material-ui/core/IconButton';

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
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        
    },
    img: {
        width: '100%',
        height: 'auto'
    }
});

class BookDetail extends React.Component {
    state = {

    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.getBook(id);
    }

    render() {
        const {
            bookDetailReducer: {
                fetching,
                received,
                book
            },
            favoritesReducer: {
                favorites
            },
            classes
        } = this.props;

        if (fetching || !received) {
            return (
                <div style={{textAlign: 'center', marginTop: 20}}>
                    <CircularLoading />
                </div>
            )
        }

        const isFavorite = Boolean(favorites.find((book_) => book_.id === book.id));

        return (
            <div>
                <Paper className={classes.root} elevation={1}>
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={12} md={4} lg={4}>
                            <img src={book.volumeInfo.readingModes.image ? book.volumeInfo.imageLinks.small : 'no image url'} alt="img" className={classes.img}/>                        
                        </Grid>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <form className={classes.container}>
                                <TextField
                                    id="outlined-name"
                                    label="Title"
                                    className={classes.textField}
                                    value={book.volumeInfo.title}
                                    margin="normal"
                                    variant="outlined"          
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />

                                <TextField
                                    id="outlined-name"
                                    label="Authors"
                                    className={classes.textField}
                                    value={book.volumeInfo.authors.reduce((authors, author) => {
                                        return `${authors} / ${author}`
                                    })}
                                    margin="normal"
                                    variant="outlined"          
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />

                                <TextField
                                    id="outlined-name"
                                    label="Publisher"
                                    className={classes.textField}
                                    value={book.volumeInfo.publisher}
                                    margin="normal"
                                    variant="outlined"          
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    fullWidth
                                />
                            </form>

                            <IconButton
                                aria-label="Add to favorites"
                                style={{marginLeft: 'auto'}}
                                onClick={() => {
                                    this.props.addOrRemoveFavoriteBook(book);
                                }}
                            >
                                <FavoriteIcon color={isFavorite ? "secondary" : "inherit"} />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        )
    }
};

const mapStateToProps = (state) => {
    return {
        bookDetailReducer: state.bookDetailReducer,
        favoritesReducer: state.favoritesReducer,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getBook: (id) => {
            dispatch(GetBookDetail(id));
        },
        addOrRemoveFavoriteBook: (book) => {
            dispatch(AddOrRemoveFavoriteBook(book));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(BookDetail));