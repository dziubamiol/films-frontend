import React, { useEffect, useState } from 'react';
import Film from './../components/Film';
import Navbar from '../components/Navbar';
import { connect } from 'react-redux';
import { IRootState } from '../reducers/root';
import { getFilms, IFilmNormalized, IFilmQuery, TFilms } from '../actions/films';
import SortSearch from '../components/SortSearch';
import LinearProgress from '@material-ui/core/LinearProgress';
import Add from './../components/Add';
import { INotification } from '../actions/notifications';
import Alert from '../components/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import useStyles from './styles/index';


export interface IIndexProps {
    isFetching: boolean;
    films: TFilms;
    getFilms: (query: IFilmQuery) => void;
    notification: INotification,
}

/**
 *
 * @description draws main page with films and all tools to manipulate
 */
const Index = (props: IIndexProps) => {
    const classes = useStyles();
    const [sortSearchOpen, setSortSearchOpen] = useState(false);
    const [snackOpened, setSnackOpened] = useState(false);
    const [showAdd, setShowAdd] = useState(false);

    const {isFetching, films, getFilms, notification} = props;

    /* get films onload */
    useEffect(() => {
        getFilms({
            offset: 0,
            pageSize: 1000,
        });
    }, [getFilms]);

    useEffect(() => {
        setSnackOpened(notification.notification);

    }, [notification.notification])

    const sortSearchHandler = () => {
        setSortSearchOpen(previous => !previous);
    }

    const closeSnackHandler = () => {
        setSnackOpened(false);
    }

    const showAddHandler = () => {
        setShowAdd(previous => !previous);
    }

    const renderedFilms: Array<React.ReactNode> = [];
    films.forEach((film: IFilmNormalized, id: string) => {
        renderedFilms.push(
            <Film
                name={film.name}
                id={film.id}
                format={film.format}
                releaseYear={film.releaseYear}
                actors={film.actors}
                key={id}
            />
        )
    });

    return (
        <div className={classes.page}>
            <Navbar
                sortSearchHandler={sortSearchHandler}
                showAddHandler={showAddHandler}
            />
            {isFetching ? <LinearProgress/> : null}
            <div className={classes.filmsContainer}
                 style={!isFetching ? {
                     paddingTop: '4px',
                 } : undefined}
            >
                <Add
                    open={showAdd}
                />
                {renderedFilms}
            </div>
            <SortSearch
                open={sortSearchOpen}
                openCloseHandler={sortSearchHandler}
            />
            <Snackbar
                open={snackOpened}
                autoHideDuration={5000}
                onClose={closeSnackHandler}
            >
                <Alert
                    severity={notification.notification_type}
                    onClose={closeSnackHandler}
                >
                    {notification.notification_message}
                </Alert>
            </Snackbar>
        </div>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        isFetching: state.films.isFetching,
        films: state.films.films,
        notification: state.notification
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFilms: (query: IFilmQuery) => {
            dispatch(getFilms(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
