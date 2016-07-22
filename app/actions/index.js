import * as actionConstants from './constants';

import NameModel from '../NameModelLocal'


export const addNameAsync = (id, name) => {
    return (dispatch) => {
        return NameModel.add(id, name).then(() => {dispatch(addName(id,name))})
    }
};
export const addName = (id, name) => {
    return{
        type: actionConstants.NAME_ADD,
        nameObj: {
            name: name,
            id: id,
            editing: false
        }
    };
};


export const deleteNameAsync = (id) => {
    return (dispatch) => {
        return NameModel.delete(id, name).then(() => { dispatch(deleteName(id) )})
    }
};
export const deleteName = (id) => {
    return{
        type: actionConstants.NAME_DELETE,
        nameObj: {
            id
        }
    };
};


export const editNameAsync = (id, newName) => {
    return (dispatch) => {
        dispatch(editName(id, newName));
        return NameModel.edit(id, newName).then( ()=> { Promise.resolve()/* Do nothing here*/ },
            (error) => {
                console.log(error);
                //Handle Failure

                //Undo the sent dispatch or refresh the list and show error message

            }
        )
    }
};
export const editName = (id, name) => {
    return{
        type: actionConstants.NAME_EDIT,
        nameObj: {
            id,
            name,
            editing: false
        }
    };
};


export const editNameStart = (id) => {
    return{
        type: actionConstants.NAME_EDIT_START,
        nameObj: {
            id
        }
    };
};

export const addNameToList = (id) => {
    return{
        type: actionConstants.NAME_LIST_ADD,
        nameObj: {
            id
        }
    };
};
export const removeNameFromList = (id) => {
    return{
        type: actionConstants.NAME_LIST_REMOVE,
        nameObj: {
            id
        }
    };
};


export const setVisibilityFilter = (filter) => {
    return{
        type: actionConstants.SET_VISIBILITY_FILTER,
        filter
    };
};