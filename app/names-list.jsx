import React from 'react'
import Falcor from 'falcor'
import model from './model.js'
import NameItem from './name-item'


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
            <table>
                <thead>
                <th> ID </th>
                <th> Name </th>
                <th colSpan="2"> Action </th>
                </thead>
                <tbody>
                {names}
                </tbody>
            </table>
        )
    }
});

module.exports = NamesList;

