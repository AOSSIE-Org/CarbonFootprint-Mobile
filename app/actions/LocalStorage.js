import { AsyncStorage } from 'react-native';
export const STORE_USER_INFO = "STORE_USER_INFO";

// Function to store data locally in key - value pair
export function storeDataLocally(key, value) {
	return async function (dispatch) {
		try {
			// Storing data
			await AsyncStorage.setItem(key, value);
			alert(value + " stored in Local storage as " + key);
			return true; // Success
		} catch (error) {
		  	// Error storing data
		  	alert("Error occured - " + error);
		  	return false; // Failure
		}
	}
}

// Function to fetch data locally using key
export function fetchDataLocally(key) {
	return async function (dispatch) {
		try {
			// Fetching data
		  	const value = await AsyncStorage.getItem(key);
		  	// null will be returned , if there is no value corresponding to given key
		  	//alert("Fetched token: " + value);
		  	return value; 
		} catch (error) {
		  	// Error fetching data
		  	alert("Error occured - " + error);
		}
	}
}

export function storeUserInfo(userName) { // To store username in state
    return {
        type: STORE_USER_INFO,
        username: userName
    }
}