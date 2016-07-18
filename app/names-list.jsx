import React from 'react'
import Falcor from 'falcor'
import model from './model.js'
import NameItem from './name-item'

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow} from 'material-ui/Table';


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
        model.getValue(['names', 'length'])
            .then(length => model.get(['names', {from: 0, to: length-1}, ['name','id']]))
            .then(response => {
                this.setState({names: response.json.names})
            })
    },

    handleNameDelete() {
        this.update();
    },

    handleNameEdit() {
        this.update();
    },

    render() {
        console.log(Falcor.keys(this.state.names));
        var names = Falcor.keys(this.state.names)
            .map(idx => {
                return (
                    <NameItem key={idx} keyx={idx} id={this.state.names[idx].id} name={this.state.names[idx].name}
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

