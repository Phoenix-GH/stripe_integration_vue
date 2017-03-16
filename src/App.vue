<template>
  <div class="page__wrapper">
    <appHeader></appHeader>
    <section class="page__block is--push">
      <div class="content container container--fw">
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

  //import jquery, meh
  import $ from 'jquery';

  //template exports
  export default {
      components: {
          appHeader: Header,
          appFooter: Footer,
          loginModal: Login,
          signupModal: Signup
      },
      created() {

        //set the user based on what is in local storage
        let user = JSON.parse(localStorage.getItem('user'));
        if ((user != null) || (user)) {
          this.$store.dispatch('updateUser', user);
        } else {
          this.$store.dispatch('updateUser', undefined);
        }

        //emit close menu event
        $(document).click(function(e){
            eventBus.$emit('closeMenu');
        });

      }
  }

</script>

<style>
@import "./assets/css/main.css";
</style>
