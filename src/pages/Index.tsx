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
import { Pagination } from '@material-ui/lab';


export interface IIndexProps {
    isFetching: boolean;
    films: TFilms;
    getFilms: (query: IFilmQuery) => void;
    notification: INotification,
    totalFilms: number
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
    const [currentPage, setCurrentPage] = useState(1);

    const {isFetching, films, getFilms, notification, totalFilms} = props;

    /* get films onload */
    useEffect(() => {
        getFilms({
            offset: currentPage - 1,
            pageSize: 10,
        });
    }, [getFilms, currentPage]);

    useEffect(() => {
        setSnackOpened(notification.notification);

    }, [notification.notification]);

    useEffect(() => {
        if (currentPage > Math.ceil(totalFilms / 10 ) && currentPage > 1) {
            setCurrentPage(prevState => prevState - 1);
        }

    }, [totalFilms]);

    const sortSearchHandler = () => {
        setSortSearchOpen(previous => !previous);
    }

    const closeSnackHandler = () => {
        setSnackOpened(false);
    }

    const showAddHandler = () => {
        setShowAdd(previous => !previous);
    }

    const setPage = (_: any, value: number) => {
        setCurrentPage(value);
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

                {totalFilms > 0 ? <Pagination
                    count={Math.ceil(totalFilms / 10)}
                    className={classes.pagination}
                    onChange={setPage}
                    page={currentPage}
                /> : null}

                <Add
                    open={showAdd}
                />

                {renderedFilms}

                {totalFilms > 0 ? <Pagination
                    count={Math.ceil(totalFilms / 10)}
                    className={classes.pagination}
                    onChange={setPage}
                    page={currentPage}
                /> : null}

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
        notification: state.notification,
        totalFilms: state.films.total,
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
