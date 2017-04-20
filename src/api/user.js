//import and setup axios
import axios from 'axios';
import { headers, outputError, API_TOKEN, BASE_URL, updateAPIToken } from './token';
import { eventBus } from '../main';

export default {
    //user signup, login, and token management
    signup(context, payload) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/signup', payload)
            .then(response => {
                updateAPIToken(response.data.data);
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
                updateAPIToken(response.data.data);
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
                updateAPIToken(response.data.data);
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    logout(context) {
        updateAPIToken(null);
        context.$store.dispatch('clearUser');
        localStorage.removeItem('token');
        localStorage.removeItem('state');
        eventBus.$emit('updateClassDetails');
    },

    sync(context) {
        axios
            .get(BASE_URL + 'users/sync', headers())
            .then(response => {
                context.$store.dispatch('updateHasModal', false);
                context.$store.dispatch('updateActiveModal', '');
                context.$store.dispatch('replaceUser', response.data.data);
                eventBus.$emit('updateClassDetails');
            })
            .catch(error => outputError(error));
    },

    refreshToken(context) {
        let _this = this;
        axios
            .get(BASE_URL + 'users/refreshToken', headers())
            .then(response => {
                updateAPIToken(response.data.data);
                localStorage.setItem('token', API_TOKEN);
            })
            .then(() => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    updateUser(context, payload) {
        let _this = this;
        axios
            .put(BASE_URL + 'users/update', payload, headers())
            .then(response => {
                updateAPIToken(response.data.data);
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
                callback(null, response);
                _this.sync(context);
            })
            .catch(error => callback(error, null));
    },

    purchaseAnnualSubscription(context, callback) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/purchaseannualsubscription', {}, headers())
            .then(response => {
                _this.sync(context);
                callback(null, response);
            })
            .catch(error => callback(error, null));
    },

    purchaseMonthlySubscription(context, callback) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/purchasemonthlysubscription', {}, headers())
            .then(response => {
                _this.sync(context);
                callback(null, response);
            })
            .catch(error => callback(error, null));
    },

    subscriptionInfo(context, callback) {
        axios
            .get(BASE_URL + 'users/retrievesubscriptioninfo', headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    pauseRenewal(context) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/pausesubscription', {}, headers())
            .then(response => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    activateMonthly(context) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/activatemonthlysubscription', {}, headers())
            .then(response => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    activateAnnual(context) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/activateannualsubscription', {}, headers())
            .then(response => {
                _this.sync(context);
            })
            .catch(error => outputError(error));
    },

    billingInfo(context, callback) {
        axios
            .get(BASE_URL + 'users/billinghistory', headers())
            .then(response => {
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    },

    //this will retrieve the customer card information from Stripe
    cardInfo(context, callback) {
        let _this = this;
        axios
            .get(BASE_URL + 'users/retrievecardinfo', headers())
            .then(response => {
                callback(null, response.data.data);
            })
            .catch(error => callback(error, null));
    },

    updateCardInfo(context, payload, callback) {
        let _this = this;
        axios
            .post(BASE_URL + 'users/updatecardinfo', payload, headers())
            .then(response => {
                _this.sync(context);
                callback(response.data.data);
            })
            .catch(error => outputError(error));
    }
};
