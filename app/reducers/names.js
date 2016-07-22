import {NAME_ADD, NAME_DELETE, NAME_EDIT, NAME_EDIT_START} from '../actions/constants';

const names = (state = [], action) => {
    // console.log(JSON.stringify(state), JSON.stringify(action));
    switch (action.type) {
        case NAME_ADD:
            return [ ...state, action.nameObj ];
            // return Object.assign()
        case NAME_DELETE:
            return state.filter(name => {return name.id !== action.nameObj.id});
        case NAME_EDIT:
            return state.map(name => {
                if(name.id === action.nameObj.id){
                    return action.nameObj;
                }
                return name
            });
        case NAME_EDIT_START:
            return state.map(name => {
                if(name.id === action.nameObj.id){
                    return {...name, editing: true};
                }
                return name
            });
        default:
            return state
    }
};

export default names