import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles({
    filtersContainer: {},
    searchBy: {},
    filterBy: {
        height: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 20px 5px 20px',
        '& p': {
            fontFamily: 'sans-serif',
            fontSize: '1.2rem',
        },
        '& .textField:first-child': {
        }

    },
    dropdown: {
        width: '200px',
    },
    iconActive: {
        color: '#2196f3'
    },
    filterButton: {
        margin: '8px 0 8px 0'
    },
    inputs: {
        width: '250px',
    },
    inputContainer: {
    }
});

export default useStyles;
