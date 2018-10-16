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
        height: '100%'
    },
    body:{
        flex:1
    },
    boxOne:{
        flex:1,
        marginTop: 50,
        alignItems: 'center'
    },
    orders_container: {
        height:'80%'
    },
    order_entry: {
        backgroundColor: 'white',
        width: 375,
        height: 140,
        padding: 10,
        margin: 5,
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
});