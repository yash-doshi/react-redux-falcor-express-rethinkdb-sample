import React from 'react'
import { render } from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

import MainContainer from './MainContainer'


const App = () => (
    <MuiThemeProvider>
        <MainContainer/>
    </MuiThemeProvider>
);

render(<App/>, document.getElementById('demo'));
