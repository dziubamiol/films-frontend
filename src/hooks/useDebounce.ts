import { useEffect, useState } from 'react';


/**
 * @description debounce function for request-based actions
 * @param timeout {string} - timeout before action performs
 * @param action {any} - action to be performed
 * @return timeoutReset - activates and resets timeout before action performs
 */
const useDebounce = (timeout: number, action: any) => {
    const [activated, setActivated] = useState<boolean>(false);

    let id: any;
    useEffect(() => {
        if (activated) {
            /* reset timeout */
            if (id) {
                clearTimeout(id);
            } else {
                id = setTimeout(() => {
                    setActivated(false);
                    action();
                }, timeout);
            }
        }
    }, [activated]);

    return () => {
        (new Date()).getMilliseconds();
        setActivated(true);
    };
}
export default useDebounce;
