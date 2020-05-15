import { TSearchAction, UPDATE_SEARCH } from '../actions/search';

export interface ISearch {
    parameters: Map<string, string>;
}

const initState: ISearch = {
    parameters: new Map<string, string>([['name', ''], ['actor', '']])
}

const search = (state: ISearch = initState, action: TSearchAction) => {
    switch (action.type) {
        case UPDATE_SEARCH:
            return {
                parameters: new Map(action.parameters)
            }
        default:
            return state;
    }
}

export default search;
