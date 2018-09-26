//libraries
import React, {Component}from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { NativeRouter, Route } from 'react-router-native';

//react components
import { View } from 'react-native';

//components
import Login from './src/pages/Login';
import Home from './src/pages/Home'
import OrderActivity from './src/pages/OrderActivity'
import OrdersView from './src/pages/OrdersView';
import * as routes from './src/constants/routes';

//store
import rootReducer from './src/store/reducer';

const store = createStore(rootReducer);

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {

    return (
      <Provider store = {store}>
        <NativeRouter>
          <View>
              <Route exact path={routes.HOME} component ={Home}/>
              <Route exact path={routes.LOGIN} component = {Login}/>
              <Route exact path={routes.ORDER_ACTIVITY} component = {OrderActivity}/>
              <Route exact path={routes.ORDERS_VIEW} component = {OrdersView}/>
          </View>
        </NativeRouter>
      </Provider>  
    );
  }
}