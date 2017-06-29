export const REQUEST_LOCATION = "REQUEST_LOCATION";
export const RECEIVE_LOCATION = "RECEIVE_LOCATION";

function request_location() {
    return {
        type: REQUEST_LOCATION
    }
}

function receive_location(latitude, longitude) {
    return {
        type: RECEIVE_LOCATION,
        latitude: latitude,
        longitude: longitude
    }
}

export function getLocation() {
    return (dispatch, state) => {
        dispatch(request_location());
        navigator.geolocation.getCurrentPosition(
            (position) => {
                dispatch(receive_location(position.coords.latitude,
                    position.coords.longitude
                ));
            },
            (error) => {console.log("Geolocation Error: ", error)},
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }
}
