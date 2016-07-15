import React from 'react'
import model from './model.js'


const NameItem = React.createClass({
    getInitialState() {
        return {mode: 'view'}
    },
    handleDelete(event) {
        console.log("Deleting " + this.props.id + " name");
        model.call(['names', 'delete'], [this.props.id], ["id"])
            .then(() => { this.props.onDelete(); });
    },
    handleEditStart(event){
        this.setState({mode: 'editing'});
    },
    handleEdit(event){
        var input = this.refs.input;
        console.log("Editing " + this.props.id + " name to " + input.value);
        model.call(['names', 'edit'], [this.props.id, input.value], ["id", "name"])
            .then(() => {
                this.setState({mode: 'view'});
                this.props.onEdit();
            });
    },
    showNameField(){
        if(this.state.mode === 'view'){
            return (this.props.name)
        }
        if(this.state.mode === 'editing'){
            return (
                <div>
                    <input ref="input" defaultValue={this.props.name}></input>
                    <button onClick={this.handleEdit}>Save</button>
                </div>
            )
        }

    },
    render() {
        return (
            <tr key={this.props.idx}>
                <td width="25px">{this.props.id}</td>
                <td width="100px">
                    {this.showNameField()}
                </td>
                <td width="50px">
                    <button onClick={this.handleEditStart}>Edit</button>
                </td>
                <td width="50px">
                    <button onClick={this.handleDelete}>Delete</button>
                </td>
            </tr>
        )
    }
});

module.exports = NameItem;

