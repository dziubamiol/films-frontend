import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '../components/Alert';
import { makeStyles } from '@material-ui/core';
import useForm from '../hooks/useForm';
import { connect } from 'react-redux';
import { IJoin, ILogin, join, login } from '../actions/auth';
import signupValidator from '../validators/signupValidator';
import { IRootState } from '../reducers/root';
import { useHistory } from 'react-router-dom';
import useValidator from '../hooks/useValidator';
import useStyles from './styles/login';


export interface ILoginProps {
    authenticated: boolean;
    auth_errored: boolean,
    auth_message: string,
    join: (credentials: IJoin) => void;
    login: (credentials: ILogin) => void;
}

const Login = (props: ILoginProps) => {
    const classes = useStyles();
    const history = useHistory();
    const [formData, fillForm] = useForm();
    const [errors, validate] = useValidator(signupValidator);
    const [snackOpened, setSnackOpened] = useState(false);

    const {join, login, authenticated, auth_errored, auth_message} = props;

    /* Check if authenticated and redirect to main page */
    useEffect(() => {
        if (authenticated) {
            history.push('/');
        }
    }, [authenticated, history])

    /* handle warning snackbar open */
    useEffect(() => {
        setSnackOpened(auth_errored);
    }, [auth_errored])


    /* validate form and preform join or login */
    const submitHandler = (action: (credentials: ILogin | IJoin) => void) => {
        const data = {
            username: formData.get('username'), // todo move to for
            password: formData.get('password')
        };

        validate(data, () => action(data as IJoin | ILogin));
    }

    /* ~~ Button handlers ~~ */
    /* handle sign up button */
    const signupHandler = () => {
        submitHandler(join);
    }

    /* handle sign in button */
    const signInHandler = () => {
        submitHandler(login);
    }

    /* handle snackbar close */
    const snackCloseHandler = () => {
        setSnackOpened(false);
    }

    return (
        <div className={classes.container}>
            <Paper className={classes.form}>
                <div className={classes.formContainer}>
                    <p
                        className={classes.title}
                    >
                        Create user or sign in
                    </p>
                    <TextField
                        variant='outlined'
                        margin='dense'
                        label={errors.has('username') ? errors.get('username') : 'Username'}
                        name='username'
                        onChange={fillForm}
                        error={errors.has('username')}
                    />
                    <TextField
                        variant='outlined'
                        margin='dense'
                        label={errors.has('password') ? errors.get('password') : 'Password'}
                        type='password'
                        name='password'
                        onChange={fillForm}
                        error={errors.has('password')}
                    />
                    <Button
                        variant='contained'
                        color='primary'
                        className={classes.button}
                        onClick={signupHandler}
                    >
                        Sign Up
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        className={classes.button}
                        onClick={signInHandler}
                    >
                        Sign in
                    </Button>
                    <Snackbar
                        open={snackOpened}
                        autoHideDuration={5000}
                        onClose={snackCloseHandler}
                    >
                        <Alert
                            severity='warning'
                            onClose={snackCloseHandler}
                        >
                            {auth_message}
                        </Alert>
                    </Snackbar>
                </div>
            </Paper>
        </div>
    );
};

const mapStateToProps = (store: IRootState) => {
    return {
        authenticated: store.auth.auth,
        auth_errored: store.auth.auth_errored,
        auth_message: store.auth.auth_message
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        join: (credentials: IJoin) => {
            dispatch(join(credentials))
        },
        login: (credentials: ILogin) => {
            dispatch(login(credentials))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
