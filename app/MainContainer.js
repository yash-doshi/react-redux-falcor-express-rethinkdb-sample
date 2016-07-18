import React from 'react'
import AppBar from 'material-ui/AppBar';

import NameManager from './name-manager.jsx'


export default React.createClass({
    render() {
        return (
            <div>
                <AppBar title="DiscoverLFA" />
                <NameManager />
            </div>
        )
    }
});