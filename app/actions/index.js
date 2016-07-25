import * as actionConstants from './constants';
import Promise from 'promise'
import NameModel from '../NameModel'


export const replaceNameList = (updatedList) => {
    return {
        type: actionConstants.NAME_UPDATE_LIST,
        updatedList: updatedList
    }
};

//Strictly to be used while creating new object
export const replaceId = (tempId, id) => {
    return{
        type: actionConstants.NAME_REPLACE_ID,
        tempId,
        id
    };
};

export const addNameAsync = (name) => {
    return (dispatch) => {
        var tempId = 'tttemp';
        dispatch(addName(tempId, name));
        return NameModel.add(name).then((id) => {
            // console.log(id);
            // setTimeout(()=>{dispatch(replaceId(tempId, id));}, 2000);
            dispatch(replaceId(tempId, id));
        })
    }
};
export const addName = (tempId, name) => {
    return{
        type: actionConstants.NAME_ADD,
        nameObj: {
            name: name,
            id: tempId,
            editing: false,
            inYourList: false
        }
    };
};


export const deleteNameAsync = (id) => {
    return (dispatch) => {
        dispatch(deleteName(id));
        return NameModel.delete(id).then((updatedList) => {
            console.log(updatedList);
            // setTimeout(()=>{dispatch(replaceNameList(updatedList));}, 3000);
            // dispatch(replaceNameList(updatedList));
        })
    };
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
        return NameModel.edit(id, newName).then( ()=> { return Promise.resolve(); },
            (error) => {
                console.log(error);
                
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