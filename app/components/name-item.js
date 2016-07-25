import React from 'react'

import {TableRow, TableRowColumn} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const NameItem = React.createClass({
    handleEdit(event){
        var value = this.refs.input.getValue();
        if(!value.trim()) return;
        this.props.onEdit(this.props.nameObj.get('id'), value);
    },
    showNameField(nameObj){
        if(nameObj.get('editing')){
            return (
                <div>
                    <TextField defaultValue={nameObj.get('name')} ref="input" id={nameObj.get('id') + '_save_button'}
                               autoFocus style={{maxWidth: '200px'}}/>
                    <FlatButton label="save" onClick={this.handleEdit}/>
                </div>
            )
        } else {
            return (
                <div>
                    <span>{nameObj.get('name')}</span>
                </div>

            )
        }

    },
    render() {
        var nameObj = this.props.nameObj;
        var style = nameObj.get('inYourList') ? {color: 'green', fontWeight: 'bold'} : {};
        return (
            <TableRow>
                <TableRowColumn width="25px" style={style}>{nameObj.get('id')}</TableRowColumn>
                <TableRowColumn width="100px" style={style}>
                    {this.showNameField(nameObj)}
                </TableRowColumn>
                <TableRowColumn width="100px">
                    {
                        nameObj.get('inYourList') ?
                            (<div><FlatButton label="Remove from list" onClick={this.props.onremoveFromList} secondary={true}/></div>) :
                            (<div><FlatButton label="Add to list" onClick={this.props.onAddToList} primary={true}/></div>)
                    }
                </TableRowColumn>
                <TableRowColumn width="50px">
                    <RaisedButton label="Edit" primary={true} onClick={this.props.onEditStart}/>
                </TableRowColumn>
                <TableRowColumn width="50px">
                    <RaisedButton label="Delete" secondary={true} onClick={this.props.onDelete}/>
                </TableRowColumn>
            </TableRow>
        )
    }
});

export default NameItem;

