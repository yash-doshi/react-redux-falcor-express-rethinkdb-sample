import React from 'react'
import NameModel from './NameModel.js'

import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const NameItem = React.createClass({
    getInitialState() {
        return {mode: 'view'}
    },
    handleDelete(event) {
        console.log("Deleting " + this.props.id);
        NameModel.delete(this.props.id).then(() => { this.props.onDelete(); });
    },
    handleEditStart(event){
        this.setState({mode: 'editing'});
    },
    handleEdit(event){
        var input = this.refs.input;
        console.log("Editing " + this.props.id + " name to " + input.getValue());
        // model.setValue(['namelist', this.props.keyx, 'name'], input.getValue())
        NameModel
            .edit(this.props.keyx, input.getValue())
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
                    <TextField defaultValue={this.props.name} ref="input" id={this.props.keyx + '_save_button'} autoFocus/>
                    <FlatButton label="save" onClick={this.handleEdit}/>
                </div>
            )
        }

    },
    render() {
        return (
            <TableRow>
                <TableRowColumn width="25px">{this.props.id}</TableRowColumn>
                <TableRowColumn width="100px">
                    {this.showNameField()}
                </TableRowColumn>
                <TableRowColumn width="50px">
                    <RaisedButton label="Edit" primary={true} onClick={this.handleEditStart} disabled={true}/>
                </TableRowColumn>
                <TableRowColumn width="50px">
                    <RaisedButton label="Delete" secondary={true} onClick={this.handleDelete}/>
                </TableRowColumn>
            </TableRow>
        )
    }
});

module.exports = NameItem;

