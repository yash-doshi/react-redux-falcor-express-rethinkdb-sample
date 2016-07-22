import React, { PropTypes as T}  from 'react'
import RaisedButton from 'material-ui/RaisedButton';

export default React.createClass({
    propTypes: {
        disabled: T.bool.isRequired, // will be provided by react-redux
        // redux action hookups, set up below
        onClick: T.func.isRequired
    },
    render() {
        return (
            <RaisedButton label={this.props.filter} primary={true}
                          disabled={this.props.disabled} onClick={this.props.onClick} />
        )
    }
});
