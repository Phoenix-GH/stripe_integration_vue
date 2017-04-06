<template>
  <div class="page__wrapper">
    <!-- ALERTS -->
    <div class="alert" :class="{hideElement: shouldHide}">
      Get unlimited on-demand access for only $149/year!
      <a href="#">Upgrade Now!</a>
      <svg class="icon-close" @click="closeAlert">
        <use xlink:href="#icon-close"></use>
      </svg>
    </div>
    <!-- /ALERTS -->
    <appHeader></appHeader>
    <section class="page__block is--push">
      <div class="content">
        <router-view></router-view>
      </div>
      <loginModal></loginModal>
      <signupModal></signupModal>
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
      signupModal: Signup
    },
    methods: {
      closeAlert() {
        document.body.classList.remove('has--alert');
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ]),
      shouldHide() {
        if (this.user.subscribed == undefined) return true;
        if (this.user.subscribed) return true;
        return false;
      }
    },
    created() {

      if (this.user.subscribed == undefined) document.body.classList.remove('has--alert');
      if (this.user.subscribed) document.body.classList.remove('has--alert');

      $(document).click(function (e) {
        eventBus.$emit('closeMenu');
      });

      window.fbAsyncInit = function () {
        FB.init({
          appId: '263766374079183',
          xfbml: true,
          version: 'v2.8'
        });
      };

    }
  }

</script>

<style>
  @import "./assets/css/main.css";
  .hideElement {
    display: none
  }
</style>