import { makeStyles } from '@material-ui/core/styles';

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
    },
    '@media only screen and (max-width: 600px)': {
        search: {
            display: 'none',
        }
    }
});

export default useStyles
