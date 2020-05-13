import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import useForm from '../hooks/useForm';
import DragnDrop, { FileReceiveEvent } from './DragnDrop';
import AddToPhotosIcon from '@material-ui/icons/AddToPhotos';
import useValidator from '../hooks/useValidator';
import newFilmValidator from './../validators/newFilmValidator';
import { addFilm, INewFilm } from '../actions/films';
import { connect } from 'react-redux';
import Collapse from '@material-ui/core/Collapse';
import fileParser, { FileParserError, IFilmRaw } from '../tools/fileParser';
import { deleteNotification, setNotification, TNotificationType } from '../actions/notifications';
import useStyles from './styles/add';

export interface IAddProps {
    addFilm: (newFilm: INewFilm) => void;
    open: boolean;
    setNotification: (notification: string, type: TNotificationType) => void;
    deleteNotification: () => void;
}

/**
 *
 * @description draws form to input films from from or from file
 */
const Add = (props: IAddProps) => {
    const classes = useStyles();
    const [formData, setFormDate] = useForm();
    const [format, setFormat] = useState('DVD');
    const [errors, validate] = useValidator(newFilmValidator);
    const [parsedFilms, setParsedFilms] = useState<Array<IFilmRaw>>([]);

    const {addFilm, open, setNotification, deleteNotification} = props;

    const onFileReceive = (event: FileReceiveEvent) => {
        const submitFiles = (err: FileParserError | null, parsedFiles: Array<IFilmRaw>) => {
            if (err) {
                deleteNotification();
                setNotification(err.message, 'error');
            } else {
                setParsedFilms(parsedFiles);
            }
        }


        fileParser(event, submitFiles).catch();
    }

    const selectHandler = (event: React.ChangeEvent<any>) => {
        setFormat(event.target.value);
    }

    const send = (newFilm: INewFilm) => {
        addFilm(newFilm);
    }

    interface INewFilmRaw {
        name?: string,
        releaseYear?: number,
        format?: string,
        actors?: Array<string>
    }

    const validateAndSendHandler = () => {
        if (parsedFilms.length === 0) {
            const newFilm: INewFilmRaw = {
                name: formData.get('name'),
                releaseYear: parseInt(formData.get('releaseYear') + ''),
                actors: (formData.has('actors') ? formData.get('actors') as string : '').split(', '),
                format: format
            };

            validate(newFilm, () => send(newFilm as INewFilm));
        } else {
            for (const film of parsedFilms) {
                send(film);
            }
            setParsedFilms([]);
        }
    }

    return (
        <Collapse collapsedHeight={0} in={open} addEndListener={() => false}>
            <Paper className={classes.container}>
                <div className={classes.description}>
                    <div className={classes.title}>
                        <TextField
                            variant='outlined'
                            margin='dense'
                            label={errors.has('name') ? errors.get('name') : 'Name'}
                            name='name'
                            onChange={setFormDate}
                            error={errors.has('name')}
                        />
                    </div>
                    <div className={classes.specs}>
                        <TextField
                            variant='outlined'
                            margin='dense'
                            label={errors.has('releaseYear') ? errors.get('releaseYear') : 'Year'}
                            name='releaseYear'
                            onChange={setFormDate}
                            error={errors.has('releaseYear')}
                        />
                        <TextField
                            variant='outlined'
                            margin='dense'
                            label={errors.has('actors') ? errors.get('actors') : 'Actors'}
                            name='actors'
                            onChange={setFormDate}
                            error={errors.has('actors')}
                        />
                        <FormControl
                        >
                            <InputLabel htmlFor="age-native-simple">Format</InputLabel>
                            <Select
                                native
                                value={format}
                                onChange={selectHandler}
                            >
                                <option value={'DVD'}>DVD</option>
                                <option value={'Blu-Ray'}>Blu-Ray</option>
                                <option value={'VHS'}>VHS</option>

                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className={classes.dragndrop}>
                    <DragnDrop
                        onFileReceived={onFileReceive}
                        allowedTypes={['text/plain']}
                    >
                        Drag file with films
                    </DragnDrop>
                    <p>Selected {parsedFilms.length} movies</p>
                </div>
                <div className={classes.special}>
                    <IconButton
                        className={classes.addButton}
                        onClick={validateAndSendHandler}
                    >
                        <AddToPhotosIcon/>
                    </IconButton>
                </div>
            </Paper>
        </Collapse>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        addFilm: (newFilm: INewFilm) => dispatch(addFilm(newFilm)),
        setNotification: (notification: string, type: TNotificationType) => dispatch(setNotification(notification, type)),
        deleteNotification: () => dispatch(deleteNotification()),
    }
}

export default connect(undefined, mapDispatchToProps)(Add);
