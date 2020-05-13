import makeStyles from '@material-ui/core/styles/makeStyles';

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

export default useStyles;
