import { NAME_UPDATE_LIST, NAME_ADD, NAME_DELETE, NAME_EDIT, NAME_EDIT_START,
    NAME_LIST_ADD, NAME_LIST_REMOVE, NAME_REPLACE_ID} from '../actions/constants';

import Immutable from 'immutable';

const names = (state = [], action) => {
    // console.log(JSON.stringify(state), JSON.stringify(action));
    switch (action.type) {
        case NAME_UPDATE_LIST:
            return Immutable.fromJS(action.updatedList);
        case NAME_ADD:
            return state.insert(0, Immutable.Map(action.nameObj))
            // return [ action.nameObj, ...state ];
        case NAME_DELETE:
            return state.filter(name => {return name.get('id') !== action.nameObj.id});
        case NAME_EDIT:
            return state.map(name => {
                if(name.get('id') === action.nameObj.id){
                    return name.merge({name: action.nameObj.name, editing: false}); //{...name, name: action.nameObj.name};
                }
                return name
            });
        case NAME_EDIT_START:
            return state.map(name => {
                if(name.get('id') === action.nameObj.id){
                    return name.set('editing', true); //{...name, editing: true};
                }
                return name
            });
        case NAME_LIST_ADD:
            return state.map(name => {
                if(name.get('id') === action.nameObj.id){
                    return name.set('inYourList', true); //{...name, inYourList: true};
                }
                return name
            });
        case NAME_LIST_REMOVE:
            return state.map(name => {
                if(name.get('id') === action.nameObj.id){
                    return name.set('inYourList', false); //{...name, inYourList: false};
                }
                return name
            });
        case NAME_REPLACE_ID:
            return state.map(name => {
                if(name.get('id') === action.tempId){
                    return name.set('id', action.id); //{...name, id: action.id};
                }
                return name
            });
        default:
            return state
    }
};

export default names