import names from './names'
import namelist from './namelist'
import visibilityFilter from './visibilityFilter'

import { combineReducers } from 'redux'

const MainReducer = combineReducers({
    visibilityFilter: visibilityFilter,
    names: names,
    namelist: namelist
});

export default MainReducer