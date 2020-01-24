import {
    getApiUrl,
    getAuthorizationToken,
    handleError,
    pullOutJson,
    getCurrentUserId
} from "../index";

export const getPantry = () => {
    const headers = new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getAuthorizationToken()}`
    });
    return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/pantry`), {
        method: "GET",
        headers
    })
        .then(handleError)
        .then(pullOutJson);
};

export const updatePantry = (updatedPantry) => {
    const headers = new Headers({
        'Content-type': 'application/json',
        'Authorization': `Bearer ${getAuthorizationToken()}`
    });
    return fetch(encodeURI(`${getApiUrl()}/user/${getCurrentUserId()}/pantry`), {
        method: "PUT",
        headers,
        body: JSON.stringify(updatedPantry),
    })
        .then(handleError);
};