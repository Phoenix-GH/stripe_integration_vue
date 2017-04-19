import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../components/Landing.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import TermsOfUse from '../components/TermsOfUse.vue';
import FAQ from '../components/Faq.vue';
import Settings from '../components/settings/Settings.vue';
import Course from '../components/classes/Course.vue';
import Classes from '../components/classes/Classes.vue';
import ClassDetail from '../components/classes/ClassDetail.vue';
import MyClasses from '../components/classes/MyClasses.vue';
import SavedClasses from '../components/classes/SavedClasses.vue';
import Account from '../components/settings/Account.vue';
import Billing from '../components/settings/Billing.vue';
import EmailNotifications from '../components/settings/EmailNotifications.vue';
import Password from '../components/settings/Password.vue';
import Payments from '../components/settings/Payments.vue';
import Referrals from '../components/settings/Referrals.vue';
import Podcasts from '../components/Podcasts.vue';
import UpgradeAccount from '../components/UpgradeAccount.vue';
import SearchResults from '../components/search/SearchResults.vue';
import Home from '../components/Home.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';
import { store } from '../store';

Vue.use(Router);

function checkLoggedIn(to, from, next) {
    if (!store.state.userLoggedIn) {
        next({
            path: '/home',
            name: 'home',
            component: Home
        });
    } else {
        next();
    }
}

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'landing', component: Landing, beforeEnter: checkLoggedIn },
        { path: '/home', name: 'home', component: Home },
        { path: '/podcasts', name: 'podcasts', component: Podcasts },
        { path: '/classes', name: 'classes', component: Classes },
        { path: '/classes/:id', name: 'singleclass', component: ClassDetail },
        { path: '/myclasses', name: 'myclasses', component: MyClasses, beforeEnter: checkLoggedIn },
        { path: '/saved', name: 'saved', component: SavedClasses, beforeEnter: checkLoggedIn },
        { path: '/searchresults', name: 'searchresults', component: SearchResults },
        { path: '/privacypolicy', name: 'privacypolicy', component: PrivacyPolicy },
        { path: '/termsofuse', name: 'termsofuse', component: TermsOfUse },
        { path: '/faq', name: 'faq', component: FAQ },
        {
            path: '/upgradeaccount',
            name: 'upgradeaccount',
            component: UpgradeAccount,
            beforeEnter: checkLoggedIn
        },
        {
            path: '/settings',
            name: 'settings',
            component: Settings,
            beforeEnter: (to, from, next) => {
                let loggedIn = store.state.userLoggedIn;
                if (loggedIn) {
                    next();
                }
            },
            children: [
                {
                    path: 'account',
                    name: 'account',
                    component: Account
                },
                {
                    path: 'password',
                    name: 'password',
                    component: Password
                },
                {
                    path: 'payments',
                    name: 'payments',
                    component: Payments
                },
                {
                    path: 'billing',
                    name: 'billing',
                    component: Billing
                },
                {
                    path: 'emailnotifications',
                    name: 'emailnotifications',
                    component: EmailNotifications
                },
                {
                    path: 'referrals',
                    name: 'referrals',
                    component: Referrals
                }
            ]
        },
        {
            path: '*',
            component: NotFoundComponent
        }
    ]
});
