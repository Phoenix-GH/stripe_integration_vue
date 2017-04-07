//import and setup axios
import axios from 'axios';
let BASE_URL = 'https://selfmademannewapi.herokuapp.com/v1/api/';
//let BASE_URL = 'http://localhost:4000/v1/api/';
let API_TOKEN = localStorage.getItem('token');

function headers() {
    if (API_TOKEN != null && API_TOKEN.length > 0)
        return { headers: { 'x-access-token': API_TOKEN } };
    return { headers: {} };
}

function outputError(error) {
    console.log(JSON.stringify(error));
}

export default {
    //user signup, login, and token management
    signup(context, payload) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/signup', payload)
            .then(response => {
                API_TOKEN = response.data.data;
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    login(context, payload) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/login', payload)
            .then(response => {
                API_TOKEN = response.data.data;
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    loginFacebook(context, payload) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/facebooklogin', payload)
            .then(response => {
                API_TOKEN = response.data.data;
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    logout(context) {
        API_TOKEN = null;
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        context.$store.dispatch('clearUser');
    },

    sync(context) {
        axios
            .get(BASE_URL + 'users/sync', headers())
            .then(response => {
                context.$store.dispatch('updateHasModal', false);
                context.$store.dispatch('updateActiveModal', '');
                context.$store.dispatch('replaceUser', response.data.data);
            })
            .catch(error => outputError(error));
    },

    refreshToken(context) {
        let _this = this;
        axios
            .get(BASE_URL + 'users/refreshToken', headers())
            .then(response => {
                API_TOKEN = response.data.data;
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    updateUser(context, payload) {
        console.log(payload);
        let _this = this;
        axios
            .put(BASE_URL + 'users/update', payload, headers())
            .then(response => {
                API_TOKEN = response.data.data;
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    resetPassword(context, payload, callback) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/resetwitholdpassword', payload, headers())
            .then(response => {
                callback(null, response);
            })
            .catch(error => {
                callback(error, null);
            });
    },

    //this will create a stripe customer
    createStripeCustomer(context, payload, callback) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/createstripecustomer', payload, headers())
            .then(response => {
                callback(null, response.data.data);
            })
            .catch(error => callback(error, null));
    },

    //this will retrieve the customer card information from Stripe
    //we cannot store any of this information
    cardInfo(context, callback) {
        let _this = this;
        axios
            .get(BASE_URL + 'users/retrievecardinfo', headers())
            .then(response => {
                console.log(response);
                callback(null, response.data.data);
            })
            .catch(error => callback(error, null));
    }
};
