import {StyleSheet} from 'react-native';

export const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize:35,
    separatorStrokeWidth: 4,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#da8c75',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#da8c75',
    stepStrokeUnFinishedColor: '#d7d7d7', 
    separatorFinishedColor: '#da8c75',
    separatorUnFinishedColor: '#d7d7d7', 
    stepIndicatorFinishedColor: '#da8c75',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: '#da8c75',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#d7d7d7',
    labelColor: '#999999',
    labelSize: 13,
    currentStepLabelColor: '#da8c75'
}
export default  style = StyleSheet.create({
    container: {
        height: '100%',
    },
    body:{
        flex:1
    },
    boxOne:{
        flex:1,
        marginTop: 30,
        alignItems: 'center'
    },
    orders_container: {
        height:'80%',
        width: '90%',
    },
    order_entry:{
        marginBottom: 10,
    },
    instruction: {
        alignItems: "flex-end",
    },
    empty_orders: {
        flex: 1,
        padding: 50,
        width: '100%',
        backgroundColor: 'white',
        color: '#F3F3F3',
        alignItems: 'center'
    },
    entry: {
        backgroundColor: 'white',
        width: '100%',
        padding: 10,
        borderRadius: 3,  
    },
    image_button: {
        marginTop: 15,
        marginLeft: 15
    },
    bg:{
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    modalContent:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'rgba(0,0,0,0.75)'
    },
    innerContainer:{
        alignItems: 'center',
        backgroundColor: '#FFF8F3',
        borderRadius: 5,
        paddingBottom: 50,
        height: 250, //no height
        width:325, //250 for error
        marginRight: 50,
        marginLeft: 50
    },

    textModal:{
        fontFamily: 'Roboto',
        fontSize: 16,
        color: '#333333'
    },

    image:{
        marginBottom:20,
    },

    buttonModal:{
        marginTop: 30,
        width:160,
        height: 32
    },
});