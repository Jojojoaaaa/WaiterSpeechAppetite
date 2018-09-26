import React, {Component}from 'react';
import HomeContainer from '../containers/HomeContainer';
import SideDrawerContainer from '../containers/SideDrawerContainer';

import {
    View
} from 'react-native';

export default class Home extends Component {
    constructor (props){
        super(props)
    }
    render() {
        return (
            <View>
                <HomeContainer/>   
                <SideDrawerContainer/>
            </View>
        )
    }
}