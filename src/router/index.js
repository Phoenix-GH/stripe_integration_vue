import Vue from 'vue';
import Router from 'vue-router';
import Landing from '../components/Landing.vue';
import PrivacyPolicy from '../components/PrivacyPolicy.vue';
import TermsOfUse from '../components/TermsOfUse.vue';
import FAQ from '../components/Faq.vue';
import Settings from '../components/settings/Settings.vue';
import Classes from '../components/classes/Classes.vue';
import ClassDetail from '../components/classes/ClassDetail.vue';
import MasterClassDetail from '../components/classes/MasterClassDetail.vue';
import MyClasses from '../components/classes/MyClasses.vue';
import SavedClasses from '../components/classes/SavedClasses.vue';
import Account from '../components/settings/Account.vue';
import Billing from '../components/settings/Billing.vue';
import EmailNotifications from '../components/settings/EmailNotifications.vue';
import Password from '../components/settings/Password.vue';
import Payments from '../components/settings/Payments.vue';
import Referrals from '../components/settings/Referrals.vue';
import Podcasts from '../components/podcasts/Podcasts.vue';
import PodcastDetail from '../components/podcasts/PodcastDetail.vue';
import UpgradeAccount from '../components/UpgradeAccount.vue';
import SearchResults from '../components/search/SearchResults.vue';
import Home from '../components/Home.vue';
import NotFoundComponent from '../components/NotFoundComponent.vue';
import Earnings from '../components/other/Earnings.vue';
import ReviewList from '../components/admin/ReviewList.vue';
import StudentList from '../components/admin/StudentList.vue';
import ResetPassword from '../components/other/PasswordReset.vue';
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

function checkLoggedInReset(to, from, next) {
    if (store.state.userLoggedIn) {
        next({
            path: '/settings/password',
            name: 'password',
            component: Password
        });
    } else {
        next();
    }
}

function checkAdminUser(to, from, next) {
    //if (store.state.user.role == 2) {
    next();
    //} else {
    //    console.log('what?');
    //}
}

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', name: 'landing', component: Landing, beforeEnter: checkLoggedIn },
        { path: '/home', name: 'home', component: Home },
        { path: '/podcasts', name: 'podcasts', component: Podcasts },
        { path: '/podcasts/:id', name: 'singlepodcast', component: PodcastDetail },
        { path: '/classes', name: 'classes', component: Classes },
        { path: '/classes/:id', name: 'singleclass', component: ClassDetail },
        { path: '/classes/masterclasses/:id', name: 'masterclass', component: MasterClassDetail },
        { path: '/myclasses', name: 'myclasses', component: MyClasses, beforeEnter: checkLoggedIn },
        { path: '/saved', name: 'saved', component: SavedClasses, beforeEnter: checkLoggedIn },
        { path: '/searchresults', name: 'searchresults', component: SearchResults },
        { path: '/privacypolicy', name: 'privacypolicy', component: PrivacyPolicy },
        { path: '/termsofuse', name: 'termsofuse', component: TermsOfUse },
        { path: '/faq', name: 'faq', component: FAQ },
        { path: '/earnings', name: 'earnings', component: Earnings },
        {
            path: '/resetpassword',
            name: 'resetpassword',
            component: ResetPassword,
            beforeEnter: checkLoggedInReset
        },
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
                },
                {
                    path: 'students',
                    name: 'students',
                    component: StudentList,
                    beforeEnter: checkAdminUser
                },
                {
                    path: 'reviews',
                    name: 'reviews',
                    component: ReviewList,
                    beforeEnter: checkAdminUser
                }
            ]
        },
        {
            path: '*',
            component: NotFoundComponent
        }
    ]
});
