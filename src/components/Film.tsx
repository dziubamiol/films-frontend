import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { IRootState } from '../reducers/root';
import { deleteFilm } from '../actions/delete';
import { deleteFilmfromList, getFilms } from '../actions/films';
import useStyles from './styles/film';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';

export interface IFilmProps {
    id: string,
    name: string,
    format: string,
    releaseYear: number,
    actors: Array<string>,
    remove: (id: string) => void,
    deletable: boolean,
    removeFilmFromList: (id: string) => void,
    authenticated: boolean,
}

/**
 *
 * @description draws block with film description
 */
const Film = (props: IFilmProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState<EventTarget | null>(null)

    const {deletable, authenticated, remove, removeFilmFromList} = props;

    const removeHandler = () => {
        remove(props.id);
        removeFilmFromList(props.id);
    }

    const openRemoveModal = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const removeModalClose = () => {
        setAnchorEl(null);
    }

    return (
        <Paper className={classes.container}>
            <div className={classes.description}>
                <p className={classes.title}>
                    {props.name}
                    <span>
                        &nbsp;&nbsp;({props.releaseYear})
                    </span>
                </p>
                <div className={classes.specs}>
                    <p className={classes.field}>
                        <span>Format:</span> {props.format}
                    </p>
                    <p className={classes.field}>
                        <span>Year:</span> {props.releaseYear}
                    </p>
                    <p className={classes.field}>
                        <span>Actors:</span> {props.actors.join(', ')}
                    </p>
                </div>
            </div>
            <div className={classes.special}>
                <div>
                    <p className={classes.field}>
                        <span>id: {props.id}</span>
                    </p>
                </div>
                <div>
                    <IconButton
                        className={`delete ${deletable && authenticated ? 'visible' : 'hidden'}`}
                        onClick={openRemoveModal}
                    >
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>
            <Popover
                open={!!anchorEl}
                onClose={removeModalClose}
                anchorEl={anchorEl as Element}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <Button
                    onClick={removeHandler}
                >
                    Really want to delete?
                </Button>
            </Popover>
        </Paper>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        deletable: state.remove.deletable,
        authenticated: state.auth.auth
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        remove: (id: string) => {
            dispatch(deleteFilm(id));
        },
        removeFilmFromList: (id: string) => {
            dispatch(deleteFilmfromList(id));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Film);
