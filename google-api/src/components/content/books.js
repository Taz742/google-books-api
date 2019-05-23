import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { GetBooks } from '../../redux/actions';
import { CircularLoading } from './loading';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

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
});

class Books extends React.Component {
    state = {
        searchValue: '',
    };

    componentDidMount() {
        const { searchValue } = this.state;

        this.props.getBooks(searchValue || 'harry potter');
    }

    redirectToDetail = (id) => {
        this.props.history.push(`/detail/${id}`);
    }

    render() {
        const {
            classes,
            booksReducer: {
                books,
                fetching,
                received
            }
        } = this.props;

        if (fetching || !received) {
            return (
                <div style={{textAlign: 'center', marginTop: 20}}>
                    <CircularLoading />
                </div>
            )
        }

        return (
            <div className={classNames(classes.layout, classes.cardGrid)}>
                <Grid container spacing={32}>
                    {books.map((book) => {
                        const {
                            volumeInfo: {
                                title,
                                description,
                                imageLinks: {
                                    thumbnail
                                }
                            }
                        } = book;

                        return (
                            <Grid item key={book.id} sm={4} md={3} lg={3} xs={6}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image={thumbnail}
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h6" component="h2" noWrap={true}>
                                            {title}
                                        </Typography>
                                        <Typography noWrap={true}>
                                            {description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" color="primary" onClick={() => { this.redirectToDetail(book.id) }}>
                                            View
                                        </Button>
                                        <Button size="small" color="primary">
                                            Edit
                                        </Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
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