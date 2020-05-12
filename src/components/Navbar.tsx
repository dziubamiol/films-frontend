import React, {  useState } from 'react';
import { AppBar, IconButton, Toolbar } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import LibraryAddIcon from '@material-ui/icons/LibraryAdd';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';
import { IRootState } from '../reducers/root';
import { turnDeleteOff, turnDeleteOn } from '../actions/delete';
import useForm from '../hooks/useForm';
import { getFilms, IFilmQuery } from '../actions/films';
import useDebounce from '../hooks/useDebounce';

const useStyles = makeStyles({
    controls: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: '10px'
    },
    search: {
        display: 'flex',
        alignItems: 'center',
        width: '300px',
        marginLeft: '12px'
    },
    searchIcon: {
        padding: '8px',
        color: 'rgba(0, 0, 0, 0.54)'
    },
    loginButton: {
        marginLeft: 'auto'
    }
})

export interface INavbarProps {
    logout: () => void;
    toggleDelete: () => void;
    disableDelete: () => void;
    authenticated: boolean;
    sortSearchHandler: () => void;
    showAddHandler: () => void;
    getFilms: (query: IFilmQuery) => void;
}

const Navbar = (props: INavbarProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [menuAnchor, setMenuAnchor] = useState<EventTarget | null>(null);
    const [remove, setRemove] = useState(false);
    const [formData, setFormData] = useForm();

    const {logout, toggleDelete, disableDelete, authenticated, sortSearchHandler, showAddHandler, getFilms} = props;

    const submit = () => {
        if (formData.has('search') && formData.get('search') !== '') {
            getFilms({
                name: formData.get('search'),
                offset: 0,
                pageSize: 1000,
            });
        } else {
            getFilms({
                offset: 0,
                pageSize: 1000,
            });
        }
    }
    const debounceSubmit = useDebounce(500, submit);

    const applySearchOnTyping = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(event);
        debounceSubmit();
    }

    const loginClickHandler = (event: React.MouseEvent<HTMLElement>) => {
        setMenuAnchor(event.currentTarget);
    }

    const closeMenuHandler = () => {
        setMenuAnchor(null);
    }

    const openLoginHandler = () => {
        closeMenuHandler();
        history.push('/login');
    }

    const logoutHandler = () => {
        logout();
    }

    const removeHandler = () => {
        setRemove((previous: boolean): boolean => {
            if (!previous) {
                toggleDelete();
            } else {
                disableDelete();
            }

            return !previous;
        });
    }

    return (
        <AppBar
            position='static'
        >
            <Toolbar>
                <IconButton
                    edge='start'
                    color='inherit'
                    onClick={sortSearchHandler}
                >
                    <MenuIcon/>
                </IconButton>
                <div className={classes.controls}>
                    <IconButton
                        color='inherit'
                        disabled={!authenticated}
                        onClick={showAddHandler}
                    >
                        <LibraryAddIcon/>
                    </IconButton>
                    <IconButton
                        color='inherit'
                        disabled={!authenticated}
                        onClick={removeHandler}
                    >
                        <DeleteIcon/>
                    </IconButton>
                    <Paper className={classes.search}>
                        <SearchIcon
                            className={classes.searchIcon}
                        />
                        <InputBase
                            placeholder='Search...'
                            onChange={applySearchOnTyping}
                            name='search'
                        />
                    </Paper>
                </div>
                <IconButton
                    onClick={loginClickHandler}
                    className={classes.loginButton}
                    color='inherit'
                >
                    <AccountCircleIcon/>
                </IconButton>
                <Menu
                    open={!!menuAnchor}
                    anchorEl={menuAnchor as Element}
                    onClose={closeMenuHandler}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem
                        onClick={openLoginHandler}
                    >
                        Login
                    </MenuItem>
                    <MenuItem
                        onClick={logoutHandler}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = (state: IRootState) => {
    return {
        authenticated: state.auth.auth,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        logout: () => {
            dispatch(logout());
        },
        toggleDelete: () => {
            dispatch(turnDeleteOn())
        },
        disableDelete: () => {
            dispatch(turnDeleteOff())
        },
        getFilms: (query: IFilmQuery) => {
            dispatch(getFilms(query))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
