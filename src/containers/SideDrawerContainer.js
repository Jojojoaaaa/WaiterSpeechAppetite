import React, {Component} from 'react';
import SideDrawerComponent, { Backdrop, Toggler } from '../components/SideDrawerComponent';
import { withRouter } from 'react-router-native'

import * as routes from '../constants/routes';
import {
    View
} from 'react-native';

 class SideDrawerContainter extends Component {
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
    toOrderView = () => {
        this.props.history.push(routes.ORDERS_VIEW);
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
                    toOrderView ={this.toOrderView}   
                />
            </View>
        );
    }
}
export default withRouter(SideDrawerContainter);