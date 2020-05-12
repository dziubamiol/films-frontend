import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';

import IRoute from './interfaces/route';

import Index from './pages/Index';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRouter';
import { IRootState } from './reducers/root';
import { checkAuth } from './actions/auth';

const routesConfig: Array<IRoute> = [
    {
        path: '/',
        component: Index,
        private: false,
    },
    {
        path: '/login',
        component: Login,
        private: false,
    },
];

export interface IAppProps {
    authenticated: boolean;
    checkAuth: () => void;
}

function App (props: IAppProps) {
    const { authenticated, checkAuth } = props;

    /* Check user auth on mount */
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);

    /* Render routing with public and private routes */
    const routing = routesConfig.map((el, i) => {
        return el.private && el.redirectPath ?
            <PrivateRoute
                redirectPath={el.redirectPath}
                isAuthenticated={authenticated}
                key={i}
            >
                <el.component />
            </PrivateRoute>
            :
            <Route
                path={el.path}
                exact={true}
                key={i}
            >
                <el.component />
            </Route>
    });

    return (
        <Router>
            <Switch>
                {routing}
            </Switch>
        </Router>
    );
}

const mapStateToProps = (state: IRootState) => {
    return {
        authenticated: state.auth.auth
    };
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        checkAuth: () => {
            dispatch(checkAuth())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
