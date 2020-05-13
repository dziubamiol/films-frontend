import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: 'sans-serif',
        padding: '30px',
        boxSizing: 'border-box',
        marginTop: '25px'
    },
    description: {},
    title: {
        margin: 0,
        fontSize: '1.5rem',
        '& span': {
            fontSize: '0.6em'
        }
    },
    specs: {
        marginLeft: '10px'
    },
    field: {
        '& span': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    special: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        '& p': {
            margin: 0
        },
        '& .delete': {
            float: 'right',
            transition: 'color: .2s',
            '&:hover': {
                color: '#c62828'
            }
        },
        '& .visible': {
            visibility: 'visible',
            opacity: 1,
            transition: 'opacity .1s linear'
        },
        '& .hidden': {
            visibility: 'hidden',
            opacity: 0,
            transition: 'visibility 0s .1s, opacity .1s linear'
        }
    },
});

export default useStyles;
