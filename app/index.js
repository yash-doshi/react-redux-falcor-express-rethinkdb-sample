import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import Immutable from 'immutable';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import MainReducer from './reducers/index'
import MainContainer from './components/MainContainer'
import NameModel from './NameModel'

var onLoad = (data) => {
    var initialState = {
        visibilityFilter: 'SHOW_ALL',
        names: data.names
    };
    var imInitialState = Immutable.fromJS(initialState);
    let store = createStore(MainReducer, imInitialState,
        applyMiddleware(ReduxThunk)
    );
    const App = () => (
        <Provider store={store}>
            <MuiThemeProvider>
                <MainContainer/>
            </MuiThemeProvider>
        </Provider>
    );

    render(<App/>, document.getElementById('demo'));
};

NameModel.getAll().then((names) => {
    //This step signifies the process of collecting the initial data
    var data = {
        names: names
    };
    onLoad(data);
});