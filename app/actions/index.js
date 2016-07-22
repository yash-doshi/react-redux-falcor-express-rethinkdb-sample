import * as actionConstants from './constants';
import uuid from 'node-uuid';


export const addName = (name) => {
    return{
        type: actionConstants.NAME_ADD,
        nameObj: {
            name: name,
            id: uuid.v4(),
            editing: false
        }
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
export const editNameStart = (id) => {
    return{
        type: actionConstants.NAME_EDIT_START,
        nameObj: {
            id
        }
    };
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