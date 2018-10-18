import {StyleSheet} from 'react-native';

export default  style = StyleSheet.create({
    category_image: {
        width: 70, 
        height: 70
    },
    home_button: {
        width: 30, 
        height: 30,
        marginLeft: 15
    },
    image_button: {
        width: 30, 
        height: 30
    },

    container: {
        backgroundColor: '#d3d3d3',
        height: '100%',

    },
    body:{
        flex:1,
    },
    box_nav:{
        flex:0.5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginRight: 15
    },
    box_start:{
        flex:1,
        justifyContent: 'flex-end',
        paddingLeft: 15,
        paddingBottom: 15
    },
    order_bg:{
        position:'absolute',
        height: '100%',
        width: '100%'
    },
    box_mid: {
        flex:6.5,
    },
    orders_container: {
        height: '100%',
        //backgroundColor: '#f6f6f6' 
    },
    orders_body:{
        flex: 1,
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: 'white',
        marginBottom: 5
    },
    box_end:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    mic_image_button: {
        height: 70, 
        width: 70,

    },
    box_one:{
        flex:1.3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    box_two:{
        flex:3,
        flexDirection: 'column'
    },
    box_three:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    two_menu:{
        flex: 2
    },
    two_total:{
        flex: 1
    },
    three_qty:{
        flex: 1,
        alignItems: 'center'
            
    }


});