<template>
  <div class="page__wrapper">
    <appHeader></appHeader>
    <section class="page__block is--push">
      <div class="content">
        <router-view></router-view>
      </div>
      <loginModal></loginModal>
      <signupModal></signupModal>
      <reviewModal></reviewModal>
      <forgotPasswordModal></forgotPasswordModal>
      <shareModal></shareModal>
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
      shareModal: Share
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
        'user'
      ]),
      shouldHide() {
        if (this.user.subscribed) return true;
        if (!this.showUpgradeBanner) return true;
        if (this.user.subscribed == undefined || this.user.subscribed == false) return false;
      }
    },
    created() {

      $(document).click(function (e) {
        eventBus.$emit('closeMenu');
      });

    }
  }

</script>

<style>
  @import "./assets/css/main.css";
  .hideElement {
    display: none
  }
</style>