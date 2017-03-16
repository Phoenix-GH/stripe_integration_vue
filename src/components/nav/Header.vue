<template lang="html">

  <!-- ===== MAIN NAVIGATION ===== -->
          <div class="page__block">
              <header class="header header__main wrapper">
                  <router-link class="logo logo_smm" :to="{ name: 'landing' }">Self Made Man</router-link>
                  <div class="main__nav">
                      <nav class="wrapper">
                          <ul class="list list--inline wrapper__inner">
                              <li class="item has--icon">
                                  <router-link class="link" :to="{ name: 'classes' }">
                                  <svg class="icon-grid color--brand"><use xlink:href="#icon-grid"></use></svg>
                                  <span class="mobile--hide">Classes</span></router-link>
                              </li>
                              <li class="item mobile--hide">
                                <router-link class="link" :to="{ name: 'podcasts' }">Podcast</router-link>
                              </li>
                          </ul>
                          <div class="wrapper__inner align--right">
                              <ul id="userNav" class="list list--inline list--divided">

                                  <!-- LOGGED IN NAV -->
                                  <li id="navClasses" class="item" v-if="visible">
                                      <ul class="list list--inline">

                                          <!-- NOTE: Display on 'Paid Account' -->
                                          <li id="navClasses" class="item">
                                              <router-link class="link has--badge is--primary" :to="{ name: 'myclasses' }" :data-badge="classesInProgress.length">My Classes</router-link>
                                          </li>
                                          <!-- /NOTE -->

                                          <!-- NOTE: Display on 'All Accounts' -->
                                          <li id="navSaved" class="item">
                                            <router-link class="link has--badge is--primary" :to="{ name: 'saved' }" :data-badge="savedClasses.length">Saved</router-link>
                                          </li>
                                          <!-- /NOTE -->

                                      </ul>
                                  </li>

                                  <!-- NOTE: Display on 'All Accounts' -->
                                  <li id="navAccount" class="item has--icon has--popover" :class="{'is--active': profileMenuVisible}" v-if="visible" @click.stop="showProfileMenu">
                                      <div class="avatar avatar--m" :style="{ 'background-image': 'url(' + profileImage + ')' }"></div>
                                      <a class="link link--dropdown"><span class="mobile--hide">{{ user ? user.firstName : "" }}</span></a>
                                      <ul class="list list--nav list--dropdown">
                                          <li class="item mobile--only">
                                              <a class="has--badge is--primary" data-badge="0" href="/my-classes">My Classes</a>
                                          </li>
                                          <li class="item mobile--only">
                                              <a class="has--badge" data-badge="0" href="/saved">Saved</a>
                                          </li>
                                          <li class="item has--icon">
                                            <router-link class="link" :to="{ name: 'account' }"><svg class="icon-account icon--s"><use xlink:href="#icon-account"></use></svg>
                                            My Profile</router-link>
                                          </li>
                                          <li class="item">
                                              <router-link class="link" :to="{ name: 'billing' }">
                                                  <svg class="icon-billing icon--s"><use xlink:href="#icon-billing"></use></svg>
                                                  Billing
                                              </router-link>
                                          </li>
                                          <li class="item">
                                              <router-link class="link" :to="{ name: 'referrals' }">
                                                  <svg class="icon-reward icon--s"><use xlink:href="#icon-reward"></use></svg>
                                                  Refer a Friend
                                              </router-link>
                                          </li>
                                          <li class="item is--divided" @click="logOut">
                                              <router-link :to="{ name: 'landing' }">
                                                  <svg class="icon-lock icon--s"><use xlink:href="#icon-lock"></use></svg>
                                                  Sign Out
                                              </router-link>
                                          </li>
                                      </ul>
                                  </li>
                                  <!-- /NOTE -->

                                  <!-- NOTE: Display on 'Free Accounts' only -->
                                    <li id="navUpgrade" class="item" v-if="showUpgrade">
                                        <button class="btn btn--primary is--affirmative">Upgrade</button>
                                    </li>

                                  <!-- /NOTE -->
                                  <!-- /LOGGED IN NAV -->

                                  <!-- LOGGED OUT NAV -->
                                  <li id="navLoggedOut" class="item" v-if="!visible">
                                      <ul class="list list--inline">
                                          <li class="item" @click="showLogin">
                                              <a class="link modal--toggle" href="javascript:;">Log In</a>
                                          </li>
                                          <li class="item" @click="showSignup">
                                              <button class="btn btn--primary is--affirmative modal--toggle">Sign Up</button>
                                          </li>
                                      </ul>
                                  </li>
                                  <!-- /LOGGED OUT NAV -->
                              </ul>
                          </div>
                      </nav>
                      <div class="input input--search">
                          <input type="text" id="siteSearch" placeholder="Search for classes and podcast episodes…">
                      </div>
                  </div>
              </header>
          </div>
          <!-- ===== /MAIN NAVIGATION ===== -->


</template>

<script>
  import { User } from '../../api';
  import { mapGetters } from 'vuex';

  //import the event bus
  import { eventBus } from '../../main';

  export default {
      created() {
        eventBus.$on('closeMenu', () => {
          this.profileMenuVisible = false;
        })
      },
      data: function() {
        return {
          profileMenuVisible: false
        }
      },
      computed: {
        ...mapGetters([
          'user', 'savedClasses', 'classesInProgress'
        ]),
        visible() {
          if (this.user != undefined) {
            return true;
          } else {
            return false;
          }
        },
        showUpgrade(){
          if ((this.user != undefined) && (!this.user.subscribed)) {
            return true;
          } else {
            return false;
          }
        },
        profileImage() {
          if ((this.user != undefined) && (this.user.profileImageUrl)) {
            return this.user.profileImageUrl;
          } else {
            return "";
          }
        }
      },
      methods: {
        showProfileMenu() {
          if (this.profileMenuVisible) {
            this.profileMenuVisible = false;
          } else {
            this.profileMenuVisible = true;
          }
        },
        showLogin() {
          this.$store.dispatch('updateHasModal', true);
          this.$store.dispatch('updateActiveModal', 'login');
        },
        showSignup() {
          this.$store.dispatch('updateHasModal', true);
          this.$store.dispatch('updateActiveModal', 'signup');
        },
        logOut() {
          User.logout(this);
        }
      }
  }

</script>

<style lang="css">


</style>
