import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/index'
import simpleButton from '../components/simpleButton'


const mapStateToProps = (state, ownProps) => {
    return {
        disabled: ownProps.filter === state.visibilityFilter
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onClick: () => {
            dispatch(setVisibilityFilter(ownProps.filter))
        }
    }
};

const FilterButton = connect(
    mapStateToProps,
    mapDispatchToProps
)(simpleButton);

export default FilterButton