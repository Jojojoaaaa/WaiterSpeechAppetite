import React from 'react';
import { Link } from 'react-router-native'
import {TextInput, Text , View, Button} from 'react-native';

export default function LoginComponent(props) {
    const {waiter_id,
            password, 
            handleLogin,
            handleChange,
            } = props;

    return (
        <View style = {{paddingTop: 100}}>
            <TextInput
                style={{height: 40, borderColor: 'orange', borderWidth:1}}
                placeholder ="Waiter ID"        
                onChangeText ={(text) => handleChange('waiter_id', text)}
                />

            <TextInput
                style={{height: 40, borderColor: 'orange', borderWidth:1}}
                placeholder ="Password"
                secureTextEntry ={true}
                onChangeText ={(text) => handleChange('password', text)}                
                />
            <Link to = "/">
                <Button 
                    onPress = {() => handleLogin()}
                    title="Login"  
                    color = 'red'/>
            </Link>
        </View>
    );
}
//Mae, transfer styles to your styles, whatevs