import React from 'react';
import model from './model'
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default React.createClass({
    getInitialState() {
        return {name: ''}
    },
    handleSubmit(event) {
        event.preventDefault();

        var input = this.state.name;
        console.log(input);

        model.call(['names', 'add'], [input], ["name"])
            .then(() => {
                this.setState({
                    name: ''
                });
                this.props.onAdded();
        })
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

