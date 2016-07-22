import React, { PropTypes as T} from 'react';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';


export default React.createClass({
    propTypes: {
        addName: T.func.isRequired // will be provided by react-redux
    },
    getInitialState() {
        return {name: ''}
    },
    handleInputChange(event) {
        this.setState({ name: event.target.value })
    },
    handleSubmit(event) {
        event.preventDefault();
        var input = this.state.name;
        console.log("adding "+ input);
        this.props.addName(input);
        this.setState({name: ''});
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

