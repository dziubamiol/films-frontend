import React from 'react';
import { Route, Redirect, RouteProps, RouteComponentProps } from 'react-router-dom';

interface IPrivateRouter extends RouteProps {
    children?: React.ReactNode;
    redirectPath: string;
    isAuthenticated: boolean;
}

const PrivateRoute = (props: IPrivateRouter) => {
    const {redirectPath, isAuthenticated, children, ...rest} = props;

    const toRender = ({location}: RouteComponentProps): React.ReactNode => {
        return isAuthenticated ?
            (children) :
            (<Redirect to={{
                pathname: redirectPath,
                state: {
                    from: location
                }
            }}/>);
    };


    return (
        <Route
            {...rest}
            render={toRender}
        />
    )
};

export default PrivateRoute;
