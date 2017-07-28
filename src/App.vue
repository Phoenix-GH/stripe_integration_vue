<template>
  <div class="page__wrapper" id="topdoc" :class="{'bg--fog': ['account', 'password', 'payments', 'billing', 'emailnotifications', 'referrals', 'reviews', 'students'].indexOf($route.name) > -1}">
    <appHeader></appHeader>
    <section class="page__block is--push">
      <div class="content" :class="{'no--pad-b': removePadding}">
        <router-view></router-view>
      </div>
      <loginModal></loginModal>
      <signupModal></signupModal>
      <reviewModal></reviewModal>
      <forgotPasswordModal></forgotPasswordModal>
      <shareModal></shareModal>
      <ahaModal></ahaModal>
      <contactModal></contactModal>
      <challengeInfoModal></challengeInfoModal>
    </section>
    <appFooter></appFooter>
  </div>
</template>

<script>
  //import header and footer
  import Header from './components/nav/Header.vue'
  import Footer from './components/nav/Footer.vue'

  //import modals
  import Login from './components/modals/Login.vue'
  import Signup from './components/modals/Signup.vue'
  import Review from './components/modals/Review.vue'
  import ForgotPassword from './components/modals/ForgotPassword.vue'
  import Share from './components/modals/Share.vue'
  import AHA from './components/modals/AHA.vue'
  import Contact from './components/modals/ContactForm.vue'
  import ChallengeInfo from './components/modals/ChallengeInfo.vue'

  //map getters from Vuex store
  import { mapGetters } from 'vuex';

  //import the event bus
  import { eventBus } from './main';

  //import cache
  import { loadCache } from './store';

  //import jquery
  import $ from 'jquery';

  //template exports
  export default {
    components: {
      appHeader: Header,
      appFooter: Footer,
      loginModal: Login,
      signupModal: Signup,
      reviewModal: Review,
      forgotPasswordModal: ForgotPassword,
      shareModal: Share,
      ahaModal: AHA,
      contactModal: Contact,
      challengeInfoModal: ChallengeInfo
    },
    data: function () {
      return {
        showUpgradeBanner: true
      }
    },
    methods: {
      updateAccount() {
        console.log('upgrade');
      }
    },
    computed: {
      ...mapGetters([
        'user', 'removePadding'
      ]),
      shouldHide() {
        if (this.user.subscribed) return true;
        if (!this.showUpgradeBanner) return true;
        if (this.user.subscribed == undefined || this.user.subscribed == false) return false;
      }
    },
    events: {
      'updateCompletedCount': function (data) {
        this.$broadcast('updateCompletedCount', data);
      }
    },
    created() {
      $(document).click(function (e) {
        console.log('close menu');
        eventBus.$emit('closeMenu');
      });

    }
  }

</script>

<style lang="scss">
  @import "./assets/scss/main.scss";
</style>