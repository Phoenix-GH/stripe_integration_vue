<template lang="html">

  <div class="row">

      <!-- LEFT SIDEBAR -->
      <div class="col col--2-of-12 col--push-1-of-12">
        <ul class="list list--nav page__tabs">
          <li class="item">
              <router-link class="link" :to="{ name: 'account' }">Account</router-link>
          </li>
          <li class="item" v-if="!hasFacebook">
              <router-link class="link" :to="{ name: 'password' }">Password</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'payments' }">Payments</router-link>
          </li>
          <li class="item">
              <router-link class="link is--active" :to="{ name: 'billing' }">Billing</router-link>
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
                      <h3 class="ts--title">Billing</h3>
                      <p class="ts--body is--secondary">Next invoice date – Feb 17, 2017</p>
                  </div>
                  <div class="wrapper__inner align--right">
                      <svg class="icon-billing icon--l color--accent"><use xlink:href="#icon-billing"></use></svg>
                  </div>
              </div>
          </div>
          <!-- /PANEL HEADER -->

          <!-- PANEL BODY -->
          <div class="panel__body">
              <div class="panel__section">

                  <!-- INVOICE LIST -->
                  <table class="table">
                      <tbody>

                          <!-- SINGLE INVOICE (REFERRAL REWARD) -->
                          <!-- NOTE: If the month was comp'd from a referral, the total is '$0.00' and the 'reward' icon is displayed. Additionally the 'View Receipt' link is disabled. -->
                          <tr>
                              <td>
                                  <span class="ts--subtitle disp--block">Jan 17, 2017</span>
                                  <span class="ts--body is--secondary">Monthly Membership</span>
                              </td>
                              <td class="align--right">
                                  <div class="disp--ib align--left">
                                      <!-- NOTE: Has a tooltip with the name of the person referred -->
                                      <span class="ts--subtitle disp--block" data-tooltip="Bruce Springclean" data-tip-pos="left">
                                          $0.00
                                          <svg class="icon-reward icon--s color--accent"><use xlink:href="#icon-reward"></use></svg>
                                      </span>
                                      <a class="link link--secondary is--disabled">View Reciept</a>
                                  </div>
                              </td>
                          </tr>
                          <!-- SINGLE INVOICE (REFERRAL REWARD) -->

                          <!-- SINGLE INVOICE (NORMAL) -->
                          <tr>
                              <td>
                                  <span class="ts--subtitle disp--block">Dec 17, 2017</span>
                                  <span class="ts--body is--secondary">Monthly Membership</span>
                              </td>
                              <td class="align--right">
                                  <div class="disp--ib align--left">
                                      <span class="ts--subtitle disp--block">
                                          $14.95
                                      </span>
                                      <a class="link link--secondary" href="#">View Reciept</a>
                                  </div>
                              </td>
                          </tr>
                          <!-- SINGLE INVOICE (NORMAL) -->

                      </tbody>
                  </table>
                  <!-- /INVOICE LIST -->

                  <!-- EMPTY STATE -->
                  <!-- NOTE: Display if no history is available -->
                  <div class="well is--empty align--center">
                      <p class="ts--body">You don't have any billing history yet.</p>
                  </div>
                  <!-- /EMPTY STATE -->

              </div>
          </div>
          <!-- /PANEL BODY -->

        </div>

      </div>
      <!-- /MAIN CONTENT -->

  </div>

</template>

<script>
import { User } from '../../api';
import { mapGetters } from 'vuex';
export default {
  data: function() {
    return {
      topics: []
    }
  },
  computed: {
    ...mapGetters([
      'user'
    ]),
    hasFacebook() {
      if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
      return true;
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
