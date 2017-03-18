<template lang="html">

  <div class="row">

      <!-- LEFT SIDEBAR -->
      <div class="col col--2-of-12 col--push-1-of-12">
        <ul class="list list--nav page__tabs">
          <li class="item">
              <router-link class="link" :to="{ name: 'account' }">Account</router-link>
          </li>
          <li class="item" v-if="!hasFacebook">
              <router-link class="link is--active" :to="{ name: 'password' }">Password</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'referrals' }">Referrals</router-link>
          </li>
        </ul>
      </div>
      <!-- /LEFT SIDEBAR -->

      <!-- MAIN CONTENT -->
      <div class="col col--7-of-12">
        <div class="panel">

          <!-- PANEL HEADER -->
          <div class="panel__head">
              <div class="wrapper">
                  <div class="wrapper__inner">
                      <h3 class="ts--title">Change Password</h3>
                      <p class="ts--body is--secondary">Keep your account secure, and your information safe.</p>
                  </div>
                  <div class="wrapper__inner align--right">
                      <svg class="icon-lock icon--l color--accent"><use xlink:href="#icon-lock"></use></svg>
                  </div>
              </div>
          </div>
          <!-- /PANEL HEADER -->

          <!-- PANEL BODY -->
          <div class="panel__body">

              <!-- PASSWORD INFO -->
              <div class="panel__section">
                  <p>For better security, try using a mix of upper/lower-case letters, numbers and special characters like '!@#$%^&*', and don't use passwords like 'password' or '1234567890.'</p>
              </div>
              <!-- /PASSWORD INFO -->

              <!-- PASSWORD FORM -->
              <div class="panel__section">
                  <div class="well bg--snow">
                      <form id="formChangePassword" class="form" action="">
                          <div class="input input--password">
                              <input type="password" class="input__field" :class="{'not--empty': password.length > 0}" id="currentPassword" v-model="password">
                              <label for="currentPassword">Current Password</label>
                              <div class="input__link"></div>
                          </div>
                          <div class="input input--password">
                              <input type="password" class="input__field" :class="{'not--empty': newPassword.length > 0}" id="newPassword" v-model="newPassword">
                              <label for="newPassword">New Password</label>
                              <div class="input__link"></div>
                              <span class="input__helper">Must be at least 8 characters (case sensitive)</span>
                          </div>
                      </form>
                  </div>
              </div>
              <!-- /PASSWORD FORM -->

          </div>
          <!-- /PANEL BODY -->

        </div>
      </div>
      <!-- /MAIN CONTENT -->

      <!-- RIGHT SIDEBAR -->
      <div class="col col--2-of-12 align--center" :class="{hide: shouldHide}">
          <ul class="list list--buttons">
              <li class="item">
                  <button class="btn btn--primary" @click="changePassword">Save Changes</button>
              </li>
              <li class="item" @click="discardChanges">
                  <a class="link link--secondary fontSize--xs">Discard Changes</a>
              </li>
          </ul>
      </div>
      <!-- / RIGHT SIDEBAR -->

  </div>

</template>

<script>
import { User } from '../../api';
import { mapGetters } from 'vuex';
import $ from 'jquery';
export default {
  data: function() {
    return {
      password: '',
      newPassword: '',
      errorMessage: ''
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    hasFacebook() {
      if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
      return true;
    },
    shouldHide() {
      if (this.password.length >= 4) {
        return false;
      }
      return true;
    }
  },
  methods: {
    changePassword() {
      User.resetPassword(this, {oldPassword: this.password, newPassword: this.newPassword}, (err, response) => {
        if (err) {
          alert('There was an error reseting your password');
          return;
        }
        alert('Success!');
        this.discardChanges();
      });
    },
    discardChanges() {
      this.password = '';
      this.newPassword = '';
    }
  },
  created() {

    //===== Showing/Hiding Password Toggle
    $(document).ready(function(){
      $('.input--password .input__field').each(function(){
          var input = $(this),
          toggle = $(this).siblings('.input__link'),
          show = '<svg class="input__link--icon icon-show"><use xlink:href="#icon-show"></use></svg><a class="link" href="javascript:;">Show</a>',
          hide = '<svg class="input__link--icon icon-hide"><use xlink:href="#icon-hide"></use></svg><a class="link" href="javascript:;">Hide</a>';
          $(toggle).html(show);
          $(toggle).click(function(){
              if ($(input).attr('type') === 'password'){
                  $(input).attr('type', 'text');
                  $(toggle).html(hide);
              } else{
                  $(input).attr('type', 'password');
                  $(toggle).html(show);
              }
          })
      });
    });

  }
}
</script>

<style lang="css">
</style>
