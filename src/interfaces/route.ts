import React from 'react';

export default interface IRoute {
    path: string;
    component: React.FunctionComponent<any>;
    private: boolean;
    redirectPath?: string;
}
