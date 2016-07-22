import React from 'react'

import FilterButton from '../containers/FilterButton'

export default React.createClass({
    render() {
        return (
            <div>
                <FilterButton filter="SHOW_ALL"/>
                &nbsp;&nbsp;&nbsp;
                <FilterButton filter="MY_LIST"/>
            </div>
        )
    }
});
