import React from 'react'
import Falcor from 'falcor'
import NameModel from './NameModel.js'
import NameItem from './name-item'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';

// var nameModel = NameModel();

const NamesList = React.createClass({
    /*componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },*/
    getInitialState() {
        return {names: {}}
    },
    componentWillMount() {
        this.update()
    },

    update() {
        NameModel.getAll().then(list => { this.setState({names: list}) });
    },

    handleNameDelete() {
        this.update();
    },

    handleNameEdit() {
        this.update();
    },

    render() {
        var names = Falcor.keys(this.state.names)
            .map(idx => {
                return (
                    <NameItem key={this.state.names[idx].id} keyx={idx} id={this.state.names[idx].id} name={this.state.names[idx].name}
                              onDelete={this.handleNameDelete} onEdit={this.handleNameEdit}/>
                )
            });
        return (
            <Table selectable={false}>
                <TableHeader displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn> ID </TableHeaderColumn>
                    <TableHeaderColumn> Name </TableHeaderColumn>
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

module.exports = NamesList;

