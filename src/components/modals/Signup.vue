<template lang="html">
  <div id="modalSignup" class="modal modal--s reversed--head" :class="{'is--visible': active}">
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
            <div v-if="errorMessage.length > 0" class="well bg--light-negative border--negative align--center color--negative">
              <svg class="icon-lock icon--s margin--xs no--margin-tb no--margin-l">
                <use xlink:href="#icon-lock"></use>
              </svg>
              {{ errorMessage }}
            </div>
            <!-- /ERROR MESSAGE -->

            <!-- FACEBOOK LOGIN -->
            <div class="panel__section divider--or">
              <button @click="loginWithFacebook" class="btn btn--cta btn--block is--facebook">Continue with Facebook</button>
            </div>
            <!-- /FACEBOOK LOGIN -->

            <!-- SIGN UP WITH EMAIL -->
            <div class="panel__section">
              <form id="formRegister" class="form" @submit.prevent="signup">
                <div class="input input--text">
                  <input type="email" class="input__field" :class="{'not--empty': email.length > 0}" id="emailAddress" v-model="email" autofocus
                    required pattern="[^ @]*@[^ @]*">
                  <label for="emailAddress">Email Address</label>
                </div>
                <div class="input input--password">
                  <input type="password" class="input__field" :class="{'not--empty': password.length > 0}" id="createPass" v-model="password"
                    autocomplete="new-password" required>
                  <label for="createPass">Password</label>
                  <div class="input__link">Must be at least 8 characters.</div>
                </div>
                <button type="submit" class="btn btn--cta btn--block" data-loads>Create Account</button>
              </form>
            </div>
            <!-- /SIGN UP WITH EMAIL -->

            <!-- GO TO LOGIN -->
            <div class="panel__section align--center fontSize--m">
              <div class="well">
                Already have an account? <a @click="showLogin" class="link modal--toggle">Log In</a>
              </div>
            </div>
            <!-- /GO TO LOGIN -->

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

  export default {
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
        if ((this.hasModal) && (this.activeModal == 'signup')) {
          return true;
        } else {
          return false;
        }
      },
      loginPayload() {
        return {
          email: this.email,
          password: this.password
        }
      },
      facebookLoginPayload() {
        return {
          email: this.email,
          facebookId: this.facebookId,
          profileImageUrl: this.profileImageUrl,
          name: this.name
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
      signup() {

        if (this.password.length < 8) {
          console.log('password not long enough.');
          this.errorMessage = 'Please enter a password 8 characters or more.'
          return;
        }
        if (this.email.length == 0) {
          console.log('email not long enough');
          this.errorMessage = 'Please enter a valid email address'
          return;
        }
        let _this = this;
        User.signup(this, this.loginPayload, error => {
          if (error) {
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
      showLogin() {
        this.$store.dispatch('updateHasModal', true);
        this.$store.dispatch('updateActiveModal', 'login');
      }
    }
  }

</script>

<style>

</style>