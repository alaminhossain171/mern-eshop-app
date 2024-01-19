import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getHeaders() {
	let token = await AsyncStorage.getItem('jwt');
	

	if (token) {
		// userData = JSON.parse(userData);
		
		return {
			'Authorization':'Bearer '+token.replace(/['"]+/g, ''),
			'Content-Type': 'application/json',
		};
	}
	return {};
}


export async function apiReq(
	endPoint,
	data,
	method,
	headers,
	requestOptions = {}
) {

	return new Promise(async (res, rej) => {
		const getTokenHeader = await getHeaders();

	
	
		headers = {
			...getTokenHeader,
			...headers
		};

		if (method === 'get' || method === 'delete') {
			data = {
				...requestOptions,
				...data,
				headers
			};
		}

		axios[method](endPoint, data, { headers })
			.then(result => {
				const { data } = result;
				if (data.status === false) {
					return rej(data);
				}

				return res(data);
			})
			.catch(error => {

				// console.log('error response common func===>',JSON.stringify(error,null,2))
				if (error && error.response && error.response.status === 401) {
					// console.log('api error 401',JSON.stringify(error,null,2))
				}
				if (error && error.response && error.response.data) {
				
					if (!error.response.data.message) {
						return rej({ ...error.response.data, msg: error.response.data.message || "Network Error" })
					}
					return rej(error.response.data)
				} else {
				
					return rej({ message: "Network Error", msg: "Network Error" });
				}
			
			});
	});
}

export function apiPost(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'post', headers);
}

export function apiDelete(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'delete', headers);
}

export function apiGet(endPoint, data, headers = {}, requestOptions) {
	
	return apiReq(endPoint, data, 'get', headers, requestOptions);
}

export function apiPut(endPoint, data, headers = {}) {
	return apiReq(endPoint, data, 'put', headers);
}



export function setItem(key, data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem(key, data);
}

export function getItem(key) {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem(key).then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export function removeItem(key) {
	return AsyncStorage.removeItem(key);
}

export function clearAsyncStorate(key) {
	return AsyncStorage.clear();
}

export function setUserData(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('userData', data);
}

export async function getUserData() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('userData').then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export function setFirstTime(data) {
	data = JSON.stringify(data);
	return AsyncStorage.setItem('isFirstTime', data);
}

export async function getFirstTime() {
	return new Promise((resolve, reject) => {
		AsyncStorage.getItem('isFirstTime').then(data => {
			resolve(JSON.parse(data));
		});
	});
}

export async function clearUserData() {
	return AsyncStorage.removeItem('userData');
}