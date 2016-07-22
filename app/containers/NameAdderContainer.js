import { connect } from 'react-redux'
import { addName } from '../actions/index'
import nameAdder from '../components/name-adder'

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addName: (name) => {
            dispatch(addName(name))
        }
    }
};

const NameAdderContainer = connect(
    null,
    mapDispatchToProps
)(nameAdder);

export default NameAdderContainer