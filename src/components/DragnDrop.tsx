import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    dropBox: {
        height: '150px',
        width: '150px',
        color: 'rgba(0, 0, 0, 0.54)',
        border: '1px solid',
        borderColor: 'rgba(0, 0, 0, 0.26)',
        display: 'flex',
        position: 'relative',
        fontSize: '1rem',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1.1875em',
        letterSpacing: '0.00938em',
        borderRadius: '4px',
        backgroundColor: '#f7f7f7',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        '&:hover': {
            borderColor: 'rgba(0, 0, 0, 0.87)'
        },
    },
    focused: {
        borderColor: '#2196f3',
        borderWidth: '2px',
    },
    input: {
        display: 'none'
    },
    link: {
        width: '100%',
        textDecoration: 'none'
    },
});

export type MIMETypes = 'text/plain';

export interface FileReceiveEvent {
    file: File | null;
    error: boolean;
    message: string;
}

export type onFileReceived = (event: FileReceiveEvent) => any;

export interface IDragnDrop {
    onFileReceived: onFileReceived;
    allowedTypes?: Array<MIMETypes | string>;
    children?: React.ReactNode;
    className?: string;
}

/**
 *
 * @description draws simple drag n drop field
 */
const DragnDrop = (props: IDragnDrop) => {
    const classes = useStyles();
    const [dragEntered, setDragEntered] = useState(false);
    const {children, className, allowedTypes, onFileReceived} = props;
    const allowedTypesInput = allowedTypes && allowedTypes.join(', ');

    // prevent default
    useEffect(() => {
        const dropEventListener = (event: DragEvent) => {
            event.preventDefault(); // stop file open in browser
        }
        window.addEventListener('dragover', dropEventListener, false);
        window.addEventListener('drop', dropEventListener, false);

        return () => {
            window.removeEventListener('drop', dropEventListener);
            window.removeEventListener('dragover', dropEventListener);
        }
    }, []);

    const dragEnter = () => {
        setDragEntered(true);
    };

    const dragLeave = () => {
        setDragEntered(false);
    }

    const dispatchOnFileReceiveHandler = (file: File | null, error: boolean = false, message: string = '') => {
        const fileEvent: FileReceiveEvent = {
            file: file,
            error: error,
            message: message
        };

        onFileReceived(fileEvent);
    }

    const handleDrop = (event: React.DragEvent) => {
        const file = event.dataTransfer.files[0];
        setDragEntered(false);

        if (allowedTypes) {
            if (allowedTypes.indexOf(file.type) !== -1) {
                dispatchOnFileReceiveHandler(file);
            } else {
                dispatchOnFileReceiveHandler(null, true, 'invalid_type');
            }
        } else {
            dispatchOnFileReceiveHandler(file);
        }
    }

    // get input ref and pass it to setImage handler
    let inputElement: HTMLInputElement;
    const inputRef = (element: HTMLInputElement) => inputElement = element;

    const handleClick = () => {
        const click = new MouseEvent('click');
        inputElement && inputElement.dispatchEvent(click);
    }

    const setImage = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            dispatchOnFileReceiveHandler(event.target.files[0]);
        }
    }


    return (
        <div
            className={`${classes.dropBox} ${dragEntered ? classes.focused : ''} ${className}`}
            onDragEnter={dragEnter}
            onDragLeave={dragLeave}
            onClick={handleClick}
            onDrop={handleDrop}
        >
            {children}
            <input
                type='file'
                name='avatar'
                className={classes.input}
                ref={inputRef}
                onChange={setImage}
                accept={allowedTypesInput}
            />
        </div>
    );
};

export default DragnDrop;
