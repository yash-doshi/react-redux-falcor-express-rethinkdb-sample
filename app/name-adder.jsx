import React from 'react';
import NameModel from './NameModel.js'

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default React.createClass({
    getInitialState() {
        return {name: ''}
    },
    handleSubmit(event) {
        event.preventDefault();
        var input = this.state.name;
        console.log("adding "+ input);
        NameModel.add(input).then(() => {
            this.setState({ name: '' });
            this.props.onAdded();
        });
    },
    handleInputChange(event) {
        this.setState({
            name: event.target.value
        })
    },
    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <TextField value={this.state.name} onChange={this.handleInputChange}/>
                    <FlatButton label="Add" primary={true}  type="submit"/>
                </form>
            </div>


        )
    }

});

