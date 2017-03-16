<template lang="html">

  <div class="panel">

              <!-- PANEL HEADER -->
              <div class="panel__head">
                  <div class="wrapper">
                      <div class="wrapper__inner">
                          <h3 class="ts--title">Account Settings</h3>
                          <p class="ts--body is--secondary">Make changes to your profile information and membership.</p>
                      </div>
                      <div class="wrapper__inner align--right">
                          <svg class="icon-account icon--l color--accent"><use xlink:href="#icon-account"></use></svg>
                      </div>
                  </div>
              </div>
              <!-- /PANEL HEADER -->

              <!-- PANEL BODY -->
              <div class="panel__body">

                  <!-- AVATAR -->
                  <div class="panel__section">
                      <div class="well">
                          <div class="wrapper">
                              <div class="wrapper__inner">
                                  <div class="avatar avatar--l margin--s no--margin-tb no--margin-l" :style="'background-image:url(' + user.profileImageUrl + ')'"></div>
                                  <!-- NOTE: Can be 'Never', '23 hours ago', 'Yesterday', '2 days ago', 'A month ago', '2 months ago', 'A year ago', '2 years ago' -->
                                  Updated: 2 days ago
                              </div>
                              <div class="wrapper__inner align--right">
                                  <ul class="list list--inline">
                                      <!-- NOTE: 'Delete' is only displayed if a photo has been uploaded -->
                                      <li class="item">
                                          <a class="link link--secondary fontSize--xs" href="#">Delete</a>
                                      </li>
                                      <li class="item">
                                          <button class="btn btn--primary" data-change="Uploading..." data-loads>Upload Photo</button>
                                      </li>
                                  </ul>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- /AVATAR -->

                  <!-- PROFILE FORM -->
                  <div class="panel__section">
                      <div class="well bg--snow">
                          <form id="formProfileSettings" class="form" action="">
                              <div class="input input--text">
                                  <input type="text" class="input__field not--empty" id="firstName" :value="user.firstName">
                                  <label for="firstName">First Name</label>
                              </div>
                              <div class="input input--text">
                                  <input type="text" class="input__field not--empty" id="lastName" :value="user.lastName">
                                  <label for="lastName">Last Name (Optional)</label>
                              </div>
                              <div class="input input--text">
                                  <input type="email" class="input__field not--empty" id="emailAddress" :value="user.email">
                                  <label for="emailAddress">Email Address</label>
                              </div>
                          </form>
                      </div>
                  </div>
                  <!-- /PROFILE FORM -->

                  <!-- MEMBERSHIP -->
                  <div clas="panel__section">
                      <div class="well">
                          <div class="wrapper">
                              <div class="wrapper__inner">
                                  <span class="ts--subtitle">Membership</span>
                                  <span class="ts--body is--secondary disp--block">Automatically renews: June 17, 2018</span>
                              </div>
                              <div class="wrapper__inner align--right">
                                  <button class="btn btn--secondary">Pause Renewal</button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <!-- /MEMBERSHIP -->

              </div>
              <!-- /PANEL BODY -->

          </div>
  </div>

</template>

<script>

import { User } from '../../api';
import { mapGetters } from 'vuex';

export default {
    computed: {
      ...mapGetters([
        'user', 'savedClasses', 'classesInProgress'
      ])
    }
}
</script>

<style lang="css">
</style>
