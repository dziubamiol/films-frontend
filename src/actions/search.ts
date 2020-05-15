export const UPDATE_SEARCH = 'UPDATE_ACTION';

export type TSearchAction = {
    type: string;
    parameters: Map<string, string>
}

export const updateSearch = (search: Map<string, string>): TSearchAction => {
    return {
        type: UPDATE_SEARCH,
        parameters: search,
    }
}
