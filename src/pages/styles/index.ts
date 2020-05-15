import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    page: {
        backgroundColor: "#f3f3f3",
        minHeight: '100%'
    },
    filmsContainer: {
        padding: '0 25px 15px 25px',
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
        '& > div:last-of-type': {
            marginBottom: '15px'
        }
    },
    pagination: {
        marginTop: '15px',
        '& ul': {
            justifyContent: 'center'
        },
        '&:last-child': {
            marginTop: 'auto'
        }
    }
});

export default useStyles;
