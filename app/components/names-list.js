import React, { PropTypes as T} from 'react'
import {List} from 'immutable'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

import NameItem from './name-item'


const namesList = React.createClass({
    propTypes: {
        names: T.instanceOf(List).isRequired, // will be provided by react-redux
        // redux action hookups, set up below
        deleteName: T.func.isRequired,
        editNameStart: T.func.isRequired,
        editName: T.func.isRequired,
        addNameToList: T.func.isRequired,
        removeNameFromList: T.func.isRequired
    },
    render() {
        var names = this.props.names.map(name => {
            var id = name.get('id');
            return (
                <NameItem key={id} nameObj={name}
                          onDelete={()=>{this.props.deleteName(id)}}
                          onEditStart={()=>{this.props.editNameStart(id)}}
                          onEdit={this.props.editName}
                          onAddToList={()=>{this.props.addNameToList(id)}}
                          onremoveFromList={()=>{this.props.removeNameFromList(id)}}
                />
            ) 
        });
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

