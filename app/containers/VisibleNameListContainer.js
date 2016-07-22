import { connect } from 'react-redux'
import { deleteNameAsync, editNameStart, editNameAsync, addNameToList, removeNameFromList } from '../actions/index'
import namesList from '../components/names-list'
import NameModel from '../NameModelLocal'

const generateUINameObjs = (names, namelist) => {
    return names.map( (name) => {
        return {...name, inYourList: namelist.indexOf(name.id) > -1 };
        // return Object.assign({}, name, {inYourList: namelist.indexOf(name.id) > -1})
    })
};

const filterVisibleNames = (state) => {
    var filter = state.visibilityFilter;
    var nameObjs = generateUINameObjs(state.names, state.namelist);
    switch (filter) {
        case 'MY_LIST':
            return nameObjs.filter(nameObj => nameObj.inYourList);
        case 'SHOW_ALL':
        default:
            return nameObjs;
    }
};

const mapStateToProps = (state, ownProps) => {
    return {
        names: filterVisibleNames(state)
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteName: (id) => {
            dispatch(deleteNameAsync(id)).then(()=>{NameModel.getAll().then((res) => {console.log(res)})});
        },
        editNameStart: (id) => {
            dispatch(editNameStart(id));
        },
        editName: (id, name) => {
            dispatch(editNameAsync(id, name)).then(()=>{NameModel.getAll().then((res) => {console.log(res)})});
        },
        addNameToList: (id) => {
            dispatch(addNameToList(id));
        },
        removeNameFromList: (id) => {
            dispatch(removeNameFromList(id));
        }
    }
};

const VisibleNameListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(namesList);

export default VisibleNameListContainer