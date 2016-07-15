import React from 'react';
import model from './model'

export default React.createClass({
    handleSubmit(event) {
        event.preventDefault();

        var input = this.refs.input;

        model.call(['names', 'add'], [input.value], ["name"])
            .then(() => {
                input.value = null;
                input.focus();
                this.props.onAdded()
        })
    },
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input ref="input"/>
                <button> Add Name </button>
            </form>
        )
    }

});

