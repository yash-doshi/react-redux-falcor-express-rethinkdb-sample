import React, { PropTypes as T} from 'react'
import NameItem from './name-item'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

const namesList = React.createClass({
    propTypes: {
        names: T.array.isRequired, // will be provided by react-redux
        // redux action hookups, set up below
        deleteName: T.func.isRequired,
        editNameStart: T.func.isRequired,
        editName: T.func.isRequired,
        addNameToList: T.func.isRequired,
        removeNameFromList: T.func.isRequired
    },
    render() {
        var names = this.props.names.map(name => { return ( 
            <NameItem key={name.id} nameObj={name} 
                      onDelete={()=>{this.props.deleteName(name.id)}}
                      onEditStart={()=>{this.props.editNameStart(name.id)}}
                      onEdit={this.props.editName}
                      onAddToList={()=>{this.props.addNameToList(name.id)}}
                      onremoveFromList={()=>{this.props.removeNameFromList(name.id)}}
            /> 
        ) });
        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn> ID </TableHeaderColumn>
                    <TableHeaderColumn> Name </TableHeaderColumn>
                    <TableHeaderColumn> List Action </TableHeaderColumn>
                    <TableHeaderColumn columnNumber={2}> Action </TableHeaderColumn>
                </TableRow>
                </TableHeader>
                <TableBody stripedRows={true}>
                {names}
                </TableBody>
            </Table>
        )
    }
});

export default namesList;

