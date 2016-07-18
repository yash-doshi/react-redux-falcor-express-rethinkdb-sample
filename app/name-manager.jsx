import React from 'react'
import NameAdder from './name-adder.jsx'
import NamesList from './names-list.jsx'
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';

const style = {
    padding: 20,
    textAlign: 'center',
    display: 'inline-block'
};

export default React.createClass({
    handleNameAdded() {
        this.refs.namesList.update()
    },

    render() {
        return (
            <div style={{textAlign: 'center', marginTop: 10}}>
                <Paper style={style} zDepth={2} >
                    <NameAdder onAdded={this.handleNameAdded} style={{marginBottom: 20}}/>
                    <Divider/>
                    <NamesList ref="namesList"/>
                </Paper>
            </div>
        )
    }
});
