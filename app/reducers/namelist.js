import { NAME_DELETE, NAME_LIST_ADD, NAME_LIST_REMOVE } from '../actions/constants';

const namelist = (state = [], action) => {
    switch (action.type) {
        case NAME_LIST_ADD:
            return [ ...state, action.nameObj.id ];
        case NAME_LIST_REMOVE:
        case NAME_DELETE:
            return state.filter(id => {return id !== action.nameObj.id});
        default:
            return state
    }
};

export default namelist