import React, {Component}from 'react';
import HomeContainer from '../containers/HomeContainer';

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
            </View>
        )
    }
}