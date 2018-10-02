import axios from 'react-native-axios';
import * as url from './constants/urls';

const instance = axios.create({
	//baseURL: url.MAIN_URL
});

export default instance;