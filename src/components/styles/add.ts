import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    container: {
        minHeight: '200px',
        display: 'flex',
        justifyContent: 'start',
        fontFamily: 'sans-serif',
        padding: '30px',
        boxSizing: 'border-box',
        marginTop: '15px'
    },
    description: {
        flex: '4'
    },
    title: {
        margin: 0,
        fontSize: '0.8rem',
        '& span': {
            fontSize: '0.6em'
        },
    },
    specs: {
        marginLeft: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    field: {
        '& span': {
            color: 'rgba(0, 0, 0, 0.54)'
        }
    },
    special: {
        flex: '2',
        alignSelf: 'flex-end'
    },
    dragndrop: {
        margin: '8px 0 0 20px',
        textAlign: 'center'
    },
    addButton: {
        float: 'right',
        transition: 'color .2s',
        '& svg': {
            fontSize: '2rem',
        },
        '&:hover': {
            color: '#2e7d32'
        }
    },
    '@media only screen and (max-width: 500px)': {
        dragndrop: {
            display: 'none',
        }
    },
    titleInput: {
        '& label': {
            backgroundColor: '#fff',
            paddingRight: '5px'
        }
    }
});

export default useStyles;
