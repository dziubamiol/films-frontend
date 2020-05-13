import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    form: {
        height: '400px',
        width: '400px'
    },
    formContainer: {
        display: 'flex',
        flexDirection: 'column',
        padding: '30px'
    },
    title: {
        fontSize: '1.7rem',
        fontFamily: 'sans-serif',
        textAlign: 'center'
    },
    button: {
        marginTop: '8px'
    }
});

export default useStyles;
