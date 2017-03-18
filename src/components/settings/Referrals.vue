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
              <router-link class="link" :to="{ name: 'billing' }">Billing</router-link>
          </li>
          <li class="item">
              <router-link class="link" :to="{ name: 'emailnotifications' }">Email Notifications</router-link>
          </li>
          <li class="item">
              <router-link class="link is--active" :to="{ name: 'referrals' }">Referrals</router-link>
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
                      <h3 class="ts--title">Rewards &amp; Referrals</h3>
                      <p class="ts--body is--secondary">Keep track of the friend’s you’ve referred and the rewards you’ve received.</p>
                  </div>
                  <div class="wrapper__inner align--right">
                      <svg class="icon-reward icon--l color--accent"><use xlink:href="#icon-reward"></use></svg>
                  </div>
              </div>
          </div>
          <!-- /PANEL HEADER -->

          <!-- PANEL BODY -->
          <div class="panel__body">

              <!-- SHARING -->
              <div class="panel__section">
                  <h4 class="ts--subtitle">Give a month, earn a month!</h4>
                  <p class="ts--body is--secondary">
                      Share your unique referral code with your friends and you’ll both receive a free month of Premium when they sign up!
                  </p>
                  <div class="well bg--snow" style="overflow:visible;">
                      <div class="wrapper">
                          <div class="wrapper__inner padding--m no--pad-l no--pad-tb">
                              <div class="input input--text" data-tooltip="Click to copy" data-tip-pos="right">
                                  <input type="text" class="input__field not--empty" data-copy="Copied!" readonly id="inputID" value="http://smm.co/J3ki80a">
                                  <label for="inputID">Referral URL</label>
                              </div>
                          </div>
                          <div class="wrapper__inner" style="width:190px; transform: translateY(-4px);">

                            <!-- FACBOOK SHARE -->
                            <div id="fb-root"></div>

                            <div data-href="https://selfmademan.com/" data-layout="button" data-size="small" data-mobile-iframe="true" class="fb-share-button fb_iframe_widget" fb-xfbml-state="rendered" fb-iframe-plugin-query="app_id=263766374079183&amp;container_width=190&amp;href=https%3A%2F%2Fselfmademan.com%2F&amp;layout=button&amp;locale=en_US&amp;mobile_iframe=true&amp;sdk=joey&amp;size=small">
                              <span style="vertical-align: bottom; width: 59px; height: 20px;">

                                <iframe name="f1e731dbabbe5c" width="1000px" height="1000px" frameborder="0" allowtransparency="true" allowfullscreen="true" scrolling="no" title="fb:share_button Facebook Social Plugin" src="https://www.facebook.com/v2.8/plugins/share_button.php?app_id=263766374079183&amp;channel=http%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter%2Fr%2Fao6eUeuGXQq.js%3Fversion%3D42%23cb%3Df1a38e046c80f2%26domain%3Dlocalhost%26origin%3Dhttp%253A%252F%252Flocalhost%253A8080%252Ffa32620891dc1c%26relation%3Dparent.parent&amp;container_width=190&amp;href=https%3A%2F%2Fselfmademan.com%2F&amp;layout=button&amp;locale=en_US&amp;mobile_iframe=true&amp;sdk=joey&amp;size=small" style="border: none; visibility: visible; width: 59px; height: 20px;" class="">
                                </iframe>

                              </span>
                            </div>

                            <div class="disp--ib" style="transform: translateY(7px);">
                              <iframe id="twitter-widget-0" scrolling="no" frameborder="0" allowtransparency="true" class="twitter-share-button twitter-share-button-rendered twitter-tweet-button" title="Twitter Tweet Button" src="http://platform.twitter.com/widgets/tweet_button.a0ec3119d8db2bc5422f2144c89ad7a9.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;original_referer=http%3A%2F%2Flocalhost%3A8080%2Fsettings%2Freferrals&amp;size=m&amp;text=Self%20Made%20Man&amp;time=1489866942995&amp;type=share&amp;url=http%3A%2F%2Flocalhost%3A8080%2Fsettings%2Freferrals" style="position: static; visibility: visible; width: 61px; height: 20px;"></iframe>
                              <script2 src="//platform.twitter.com/widgets.js" type="text/javascript"></script2>
                            </div>

                            <div>
                              <a class="btn btn--share is--email" href="mailto:" style="transform: translateY(7px);">Email</a>
                            </div>

                          </div>
                      </div>
                  </div>
              </div>
              <!-- /SHARING -->

              <!-- MY REFERRALS -->
              <div class="panel__section">
                  <h4 class="ts--subtitle">My Referrals</h4>

                  <!-- REFERRALS - (EMPTY STATE) -->
                  <!-- NOTE: Display only if the user has no referrals -->
                  <div class="well is--empty align--center">
                      You haven't invited any friends yet.
                  </div>
                  <!-- /REFERRALS - (EMPTY STATE) -->

                  <!-- REFERRALS -->
                  <table class="table" v-if="loggedIn">
                      <tbody>

                          <!-- SINGLE REFERRAL -->
                          <tr>
                              <td>
                                  <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-2.jpg')"></div>
                                  William D.
                              </td>
                              <td class="align--center">
                                  Jan 17, 2017
                              </td>
                              <td class="align--right fontWeight--2">
                                  1 Month Free
                              </td>
                          </tr>
                          <!-- /SINGLE REFERRAL -->

                          <!-- SINGLE REFERRAL -->
                          <tr>
                              <td>
                                  <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-3.jpg')"></div>
                                  Senisa S.
                              </td>
                              <td class="align--center">
                                  Jan 17, 2017
                              </td>
                              <td class="align--right fontWeight--2">
                                  <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                                  <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                      <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                      1 Month Free
                                  </span>
                              </td>
                          </tr>
                          <!-- /SINGLE REFERRAL -->

                          <!-- SINGLE REFERRAL -->
                          <tr>
                              <td>
                                  <div class="avatar avatar--s" style="background-image:url('/assets/img/placeholder/avatar-4.jpg')"></div>
                                  Bosco B.
                              </td>
                              <td class="align--center">
                                  Jan 17, 2017
                              </td>
                              <td class="align--right fontWeight--2">
                                  <!-- NOTE: Display 'check' icon if the credit has already been applied to the account -->
                                  <span data-tooltip="Mar. 11, 2017" data-tip-pos="left">
                                      <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-l no--margin-tb"><use xlink:href="#icon-check-circle"></use></svg>
                                      1 Month Free
                                  </span>
                              </td>
                          </tr>
                          <!-- /SINGLE REFERRAL -->

                      </tbody>
                  </table>
                  <!-- /REFERRALS -->

              </div>
              <!-- MY REFERRALS -->

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
  computed: {
    ...mapGetters([
      'user'
    ]),
    hasFacebook() {
      if ((this.user.facebookId == undefined) || (this.user.facebookId == null) || (this.user.facebookId.length == 0)) return false;
      return true;
    },
    loggedIn() {
      return false;
    }
  }
}
</script>

<style lang="css">
</style>
