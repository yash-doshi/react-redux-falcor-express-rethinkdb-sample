import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MainReducer from './reducers/index'
import MainContainer from './components/MainContainer'

let store = createStore(MainReducer, {
    visibilityFilter: 'SHOW_ALL',
    namelist: [10,23],
    names: [
        {id:10, name: 'Alice'},
        {id:17, name: 'Bob'},
        {id:23, name: 'Charlie'}
    ]
});
const App = () => (
    <Provider store={store}>
        <MuiThemeProvider>
            <MainContainer/>
        </MuiThemeProvider>
    </Provider>
);

render(<App/>, document.getElementById('demo'));
