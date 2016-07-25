import { connect } from 'react-redux'
import { addNameAsync } from '../actions/index'
import nameAdder from '../components/name-adder'
import uuid from 'node-uuid';
import NameModel from '../NameModel'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addName: (name) => {
            dispatch(addNameAsync(name))//.then(()=>{NameModel.getAll().then((res) => {console.log(res)})})
        }
    }
};

const NameAdderContainer = connect(
    null,
    mapDispatchToProps
)(nameAdder);

export default NameAdderContainer