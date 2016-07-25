import Immutable from 'immutable';
import { combineReducers } from 'redux'

import names from './names'
import visibilityFilter from './visibilityFilter'

const MainReducerOld = combineReducers({
    visibilityFilter: visibilityFilter,
    names: names
});

function MainReducer(state , action) {
    return Immutable.Map({
        visibilityFilter: visibilityFilter(state.get('visibilityFilter'), action),
        names: names(state.get('names'), action)
    })
}


export default MainReducer