import React, {Component} from 'react';
import SideDrawerComponent, { Backdrop, Toggler } from '../components/SideDrawerComponent';

import {
    View
} from 'react-native';

export default class SideDrawerContainter extends Component {
    constructor(props){
        super(props);
        this.state = {
            open: false
        }
    }
    
    onClick = () => {
        this.setState((prevState) => {
			return {open: !prevState.open};
		});
    }
    render() {
        const { open } = this.state;
        const onClick = this.onClick;
        return (
            <View>
                <Backdrop
                    open = {open}
                    onClick = {onClick}  
                />
                {/* <Toggler
                    open = {open}
                    onClick = {onClick}  
                /> */}
                <SideDrawerComponent
                    open = {open}
                    onClick = {onClick}    
                />
            </View>
        );
    }
}