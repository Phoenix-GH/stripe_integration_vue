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
              <router-link class="link is--active" :to="{ name: 'payments' }">Payments</router-link>
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
                      <h3 class="ts--title">Payment Settings</h3>
                      <p class="ts--body is--secondary">Change your saved method of payment.</p>
                  </div>
                  <div class="wrapper__inner align--right">
                      <svg class="icon-payments icon--l color--accent"><use xlink:href="#icon-payments"></use></svg>
                  </div>
              </div>
          </div>
          <!-- /PANEL HEADER -->

          <!-- PANEL BODY -->
          <div class="panel__body">
              <div class="panel__section">

                  <!-- PAYMENT METHOD -->
                  <!-- NOTE: Display only if Credit Card saved -->
                  <div class="well" v-if="hasStripeAccount">
                      <div class="wrapper">
                          <div class="wrapper__inner">
                              <ul class="list list--inline list--divided">
                                  <li class="item no--pad-l">
                                      <span class="cc__icon is--visa"></span>
                                  </li>
                                  <li class="item">
                                      <span class="ts--subtitle disp--block">Visa ending in 6455</span>
                                      <span class="ts--body is--secondary">Expires June/2018</span>
                                  </li>
                              </ul>
                          </div>
                          <div class="wrapper__inner align--right">
                              <button class="btn btn--secondary">Change Method</button>
                          </div>
                      </div>
                  </div>
                  <!-- /PAYMENT METHOD -->

                  <!-- PAYMENT METHOD - EMPTY STATE -->
                  <!-- NOTE: Display if no payment method is added -->
                  <div class="well is--empty align--center" v-if="!hasStripeAccount">
                      <p class="ts--body">You don't have a payment method saved yet.</p>
                      <button class="btn btn--primary">Add Credit Card</button>
                  </div>
                  <!-- /PAYMENT METHOD - EMPTY STATE -->

                  <!-- Billing Link -->
                  <div class="align--right" v-if="hasStripeAccount">
                      <a class="link link--secondary" href="/templates/settings/billing">View Billing History</a>
                  </div>

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
    },
    hasStripeAccount(){
      if (this.user.hasCustomerId) {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="css">
</style>
