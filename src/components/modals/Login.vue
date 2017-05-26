<template lang="html">
  <div id="modalLogin" class="modal modal--s reversed--head" :class="{'is--visible': active}">
    <div class="modal__wrapper modal__wrapper--transition no--pad">
      <a href="javascript:;" class="modal__close" @click="close">
        <svg class="icon-close icon--s">
          <use xlink:href="#icon-close"></use>
        </svg>
      </a>
      <div class="modal__body">
        <div class="well panel no--border">

          <!-- PANEL BODY -->
          <div class="panel__body">

            <!-- ERROR MESSAGE -->
            <div class="well bg--light-negative border--negative align--center color--negative" v-if="checkErrorMessage">
              <svg class="icon-lock icon--s margin--xs no--margin-tb no--margin-l">
                <use xlink:href="#icon-lock"></use>
              </svg>
              {{ errorMessage }}
            </div>
            <!-- /ERROR MESSAGE -->

            <!-- FACEBOOK LOGIN -->
            <div class="panel__section divider--or">
              <button class="btn btn--cta btn--block is--facebook" @click="loginWithFacebook">Log In with Facebook</button>
            </div>
            <!-- /FACEBOOK LOGIN -->

            <!-- SIGN IN WITH EMAIL -->
            <div class="panel__section">
              <form class="form" @submit.prevent="">
                <div class="input input--text">
                  <input v-model="email" type="email" class="input__field" :class="{'not--empty': email.length > 0}" required>
                  <label for="emailAddress">Email Address</label>
                </div>
                <div class="input input--password">
                  <input v-model="password" type="password" class="input__field" :class="{'not--empty': password.length > 0}" required>
                  <label for="createPass">Password</label>
                </div>
                <div class="align--center">
                  <ul class="list list--buttons">
                    <li class="item">
                      <button type="submit" class="btn btn--cta btn--block" @click="login">Log In</button>
                    </li>
                    <li class="item">
                      <a class="link link--secondary modal--toggle" href="javascript:;" @click="showForgotPassword">Forgot Password?</a>
                    </li>
                  </ul>
                </div>

              </form>
            </div>
            <!-- /SIGN IN WITH EMAIL -->

            <!-- GO TO CREATE ACCOUNT -->
            <div class="panel__section align--center fontSize--m">
              <div class="well">
                Don't have an account yet? <a @click="showSignup" class="link modal--toggle">Sign Up</a>
              </div>
            </div>
            <!-- /GO TO CREATE ACCOUNT -->

          </div>
          <!-- /PANEL BODY -->
        </div>
      </div>
    </div>
    <div class="modal__overlay" @click="close"></div>
  </div>
</template>

<script>
  import { User } from '../../api';
  import { mapGetters } from 'vuex';
  import { eventBus } from '../../main';

  export default {
    created() {

    },
    data: function () {
      return {
        email: '',
        password: '',
        facebookId: '',
        errorMessage: '',
        profileImageUrl: '',
        name: ''
      }
    },
    computed: {
      ...mapGetters([
        'hasModal', 'activeModal'
      ]),
      active() {
        if ((this.hasModal) && (this.activeModal == 'login')) {
          return true;
        } else {
          return false;
        }
      },
      loginPayload() {
        return {
          email: this.email,
          password: this.password,
          facebookId: this.facebookId,
          profileImageUrl: this.profileImageUrl
        }
      },
      facebookLoginPayload() {
        return {
          email: this.email,
          facebookId: this.facebookId,
          profileImageUrl: this.profileImageUrl,
          name: this.name
        }
      },
      checkErrorMessage() {
        if (this.errorMessage.length > 0) {
          return true;
        } else {
          return false;
        }
      }
    },
    methods: {
      close() {
        this.email = '';
        this.password = '';
        this.facebookId = '';
        this.profileImageUrl = '';
        this.errorMessage = '';
        this.name = '';
        this.$store.dispatch('updateHasModal', false);
        this.$store.dispatch('updateActiveModal', '');
      },
      login() {
        if (this.email.length == 0) {
          console.log('email not long enough');
          this.errorMessage = 'Please enter a valid email address'
          return;
        }
        if (this.password.length < 1) {
          console.log('password not long enough.');
          this.errorMessage = 'Please enter a password 8 characters or more.'
          return;
        }
        let _this = this;
        User.login(this, this.loginPayload, error => {
          if (error) {
            console.log(error.response.data.message);
            _this.errorMessage = error.response.data.message;
          }
        })
      },
      loginWithFacebook() {
        let _this = this;
        FB.login(function (response) {
          // handle the response
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            let __this = _this;
            FB.api('/me', function (response) {

              let params = {
                facebookId: response.id,
                name: response.name,
                profileImageUrl: `https://graph.facebook.com/${response.id}/picture?type=large`
              }
              if (response.email) {
                params.email = response.email;
              }
              __this.createFacebookAccount(params);
            });
          } else {
            // The person is not logged into this app or we are unable to tell.
            alert('There was a problem logging into Facebook.');
          }
        }, { scope: 'public_profile, email' });
      },
      createFacebookAccount(params) {
        let payload = params;
        if (payload.name.length > 0) {
          let res = this.name.split(" ");
          if (res.length > 0) {
            payload.firstName = res[0];
            payload.lastName = res[1];
          }
        }
        User.loginFacebook(this, payload);
      },
      showSignup() {
        this.$store.dispatch('updateHasModal', true);
        this.$store.dispatch('updateActiveModal', 'signup');
      },
      showForgotPassword() {
        this.$store.dispatch('updateHasModal', true);
        this.$store.dispatch('updateActiveModal', 'forgotpassword');
      }
    }
  }

</script>

<style lang="css">

</style>
