export let BASE_URL = 'https://selfmademannewapi.herokuapp.com/v1/api/';
//export let BASE_URL = 'http://localhost:4000/v1/api/';
export var API_TOKEN = localStorage.getItem('token');
export function headers() {
    //console.log('API token is ' + API_TOKEN);
    if (API_TOKEN != null && API_TOKEN.length > 0) {
        return { headers: { 'x-access-token': API_TOKEN } };
    } else {
        API_TOKEN = localStorage.getItem('token');
        //console.log('token ' + API_TOKEN);
        if (API_TOKEN != null && API_TOKEN.length > 0) {
            return { headers: { 'x-access-token': API_TOKEN } };
        } else {
            return { headers: {} };
        }
    }
}
export function outputError(error) {
    console.log(JSON.stringify(error));
}
export function updateAPIToken(token) {
    API_TOKEN = token;
}
