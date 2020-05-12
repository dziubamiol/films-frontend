import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import { IconButton } from '@material-ui/core';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import Button from '@material-ui/core/Button';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useForm from '../hooks/useForm';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { getFilms, IFilmQuery } from '../actions/films';
import { connect } from 'react-redux';
import searchValidator from '../validators/searchValidator';
import useValidator from '../hooks/useValidator';
import useDebounce from '../hooks/useDebounce';


const useStyles = makeStyles({
    filtersContainer: {},
    searchBy: {},
    filterBy: {
        height: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 20px 5px 20px',
        '& p': {
            fontFamily: 'sans-serif',
            fontSize: '1.2rem',
            marginRight: '10px'
        },
        '& .textField:first-child': {
            marginRight: '10px'
        }

    },
    dropdown: {
        width: '200px',
        marginLeft: '25px',
        marginRight: '10px',
    },
    iconActive: {
        color: '#2196f3'
    },
    filterButton: {
        marginLeft: '40px'
    },
    inputs: {
        width: '250px',
    },
    inputContainer: {
        marginRight: '10px'
    }
});


export interface ISortSearchProps {
    open: boolean;
    openCloseHandler: () => void;
    getFilms: (query: IFilmQuery) => void;
}

interface ISearch {
    name?: string;
    actor?: string;
}

const SortSearch = (props: ISortSearchProps) => {
    const [sortName, setSortName] = useState<'name' | 'releaseYear'>('name');
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
    const [searchForm, fillSearchForm] = useForm(); // search can be performed for any field, API has possibilities for this
    const [errors, validate] = useValidator(searchValidator);
    const classes = useStyles();

    const {getFilms, open, openCloseHandler} = props;

    const sortNameHandler = (event: React.ChangeEvent<any>) => {
        setSortName(event.target.value);
    }

    const sortDirHandler = () => {
        setSortDir((previous: 'asc' | 'desc'): 'asc' | 'desc' => {
            return previous === 'desc' ? 'asc' : 'desc';
        });
    }


    const submit = () => {
        const getFilmsQuery: IFilmQuery = {
            offset: 0,
            pageSize: 1000,
            sort: sortDir,
            sortField: sortName
        };

        if (!errors.get('name') && searchForm.get('name')) {
            getFilmsQuery.name = searchForm.get('name');
        } else {
            delete getFilmsQuery.name;
        }
        if (!errors.get('actor') && searchForm.get('actor')) {
            getFilmsQuery.actor = searchForm.get('actor');
        } else {
            delete getFilmsQuery.actor;
        }

        getFilms(getFilmsQuery);
    }

    /* request new sorting or searching */
    const validateAndSubmit = () => {
        const dataToValidate: ISearch = {
            actor: searchForm.get('actor'),
            name: searchForm.get('name')
        }

        validate(dataToValidate, submit);
    }
    const debounceSubmit = useDebounce(500, validateAndSubmit);

    const applySearchOnTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        fillSearchForm(event);
        debounceSubmit();
    }

    return (
        <SwipeableDrawer
            anchor='top'
            open={open}
            onOpen={() => false}
            onClose={openCloseHandler}
        >
            <div
                className={classes.filtersContainer}
            >
                <div className={classes.filterBy}>
                    <p>Search:</p>
                    <div className={classes.inputContainer}>
                        <TextField
                            variant='outlined'
                            margin='dense'
                            label={errors.has('name') ? errors.get('name') : 'Name'}
                            name='name'
                            onChange={applySearchOnTyping}
                            error={errors.has('name')}
                            className={classes.inputs}
                        />
                    </div>
                    <div>
                        <TextField
                            variant='outlined'
                            margin='dense'
                            label={errors.has('actor') ? errors.get('actor') : 'Actor'}
                            name='actor'
                            onChange={applySearchOnTyping}
                            error={errors.has('actor')}
                            className={classes.inputs}
                        />
                    </div>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.filterButton}
                        onClick={validateAndSubmit}
                    >
                        Apply
                    </Button>
                </div>
                <Divider/>
                <div className={classes.filterBy}>
                    <p>Sort:</p>
                    <FormControl
                        className={classes.dropdown}
                    >
                        <InputLabel htmlFor="age-native-simple">Sort by</InputLabel>
                        <Select
                            native
                            value={sortName}
                            onChange={sortNameHandler}
                        >
                            <option value={'name'}>Name</option>
                            <option value={'releaseYear'}>Year</option>
                        </Select>
                    </FormControl>
                    <IconButton
                        className={sortDir === 'asc' ? classes.iconActive : ''}
                        onClick={sortDirHandler}
                    >
                        <SortByAlphaIcon/>
                    </IconButton>
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.filterButton}
                        onClick={validateAndSubmit}
                    >
                        Apply
                    </Button>
                </div>
            </div>
        </SwipeableDrawer>
    );
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        getFilms: (query: IFilmQuery) => {
            dispatch(getFilms(query))
        }
    }
}

export default connect(undefined, mapDispatchToProps)(SortSearch);
