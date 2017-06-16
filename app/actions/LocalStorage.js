import { AsyncStorage } from 'react-native';

// Function to store data locally in key - value pair
export function storeDataLocally(key, value) {
	return async function (dispatch) {
		try {
			// Storing data
			await AsyncStorage.setItem(key, value);
			alert(value + " stored in Local storage as " + key);
		} catch (error) {
		  	// Error storing data
		  	alert("Error occured - " + error);
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
		  	return value;
		} catch (error) {
		  	// Error fetching data
		  	alert("Error occured - " + error);
		}
	}
}