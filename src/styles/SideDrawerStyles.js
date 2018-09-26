import {StyleSheet} from 'react-native';

export default  style = StyleSheet.create({
    container: {
    },
    drawer_container: {
        width: '70%',
        height: '100%',
        backgroundColor: 'red',
    },
    opened: {
        transform: [
            {translateX: 0}
        ]
    },
    closed: {
        transform: [
            {translateX: -300}
        ]	
    },
    image: {
        width: 50,
        height: 50
    },
    backdrop: {
        width: '100%',
	    height: '100%',
	    position: 'absolute',
	    zIndex: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }
});