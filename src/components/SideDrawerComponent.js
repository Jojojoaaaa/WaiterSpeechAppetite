import React from 'react';

import {
    View,
    Image,
    Button,
    TouchableNativeFeedback
} from 'react-native';

import style from '../styles/SideDrawerStyles';

import drawer from '../assets/drawer.png';

export const Backdrop = (props) => (
    props.open ? 
        ( <TouchableNativeFeedback
            onPress={() => props.onClick()}>
            <View style = {style.backdrop}/>
        </TouchableNativeFeedback> )
        :
        null 
)

// export const Toggler = (props) => {
//     const {
//         open,
//         onClick
//     } = props;

//     return (
//         <View style ={style.container}>
//             {!open? 
//                 (<TouchableNativeFeedback
//                     onPress={() => onClick()}>
//                     <Image
//                     style = {style.image}
//                     source={drawer}/>
//                 </TouchableNativeFeedback>)
//                 :
//                 null}
//         </View>
//     )
// }

export default function SideDrawerComponent(props) {
    const {
        open,
        onClick
    } = props;

    let container_style = open ? [style.drawer_container, style.opened] :  [style.drawer_container, style.closed];
    return (
        <View style ={style.container}>
             {!open? 
                (<TouchableNativeFeedback
                    onPress={() => onClick()}>
                    <Image
                    style = {style.image}
                    source={drawer}/>
                </TouchableNativeFeedback>)
                :
                null
            } 
            <View 
              style={container_style}>
                <Button
                    hide = {!open}
                    title={'View Orders'}
                    onPress={() => props.toOrderView()}/>
            </View>
        </View>
    )
}