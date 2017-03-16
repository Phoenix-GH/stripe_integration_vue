<template lang="html">
  <div class="row">

      <!-- LEFT SIDEBAR -->
      <div class="col col--2-of-12 col--push-1-of-12">
        <ul class="list list--nav page__tabs">
          <li class="item">
              <router-link class="link" :to="{ name: 'account' }">Account</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'password' }">Password</router-link>
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

      <!-- SETTINGS PANEL -->
      <div class="col col--7-of-12">
        <!-- <component :is="activeComponent" keep-alive></component> -->
        <router-view></router-view>
      </div>
      <!-- /SETTINGS PANEL -->

      <!-- RIGHT SIDEBAR -->
      <!-- NOTE: Only display the sidebar if changes have been made to '#formProfileSettings' -->
      <div class="col col--2-of-12 align--center hide">
          <ul class="list list--buttons">
              <li class="item">
                  <button class="btn btn--primary">Save Changes</button>
              </li>
              <li class="item">
                  <a class="link link--secondary fontSize--xs" href="#">Discard Changes</a>
              </li>
          </ul>
      </div>
      <!-- / RIGHT SIDEBAR -->
  </div>
</template>

<script>

  export default {
  }

</script>

<style lang="css">
</style>
