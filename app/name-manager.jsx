import React from 'react'
import NameAdder from './name-adder.jsx'
import NamesList from './names-list.jsx'


export default React.createClass({
    handleNameAdded() {
        this.refs.namesList.update()
    },

    render() {
        return (
            <div>
                <NameAdder onAdded={this.handleNameAdded}/>
                <NamesList ref="namesList"/>
            </div>
        )
    }
});
