<template lang="html">
  <div id="modalSignup" class="modal modal--s reversed--head" :class="{'is--visible': active}">
      <div class="modal__wrapper modal__wrapper--transition no--pad">
        <a href="javascript:;" class="modal__close" @click="close"><svg class="icon-close icon--s"><use xlink:href="#icon-close"></use></svg></a>
        <div class="modal__body">
            <div class="modal__head bg--black bg--wood is--reversed">
                <span class="ts--headline">Join the Community</span>
                <p class="ts--subtitle">Get started today and become the best you can be.</p>
            </div>
            <div class="well panel no--border">

                <!-- PANEL BODY -->
                <div class="panel__body">

                    <!-- FACEBOOK LOGIN -->
                    <div class="panel__section divider--or">
                        <button class="btn btn--cta btn--block is--facebook">Continue with Facebook</button>
                    </div>
                    <!-- /FACEBOOK LOGIN -->

                    <!-- SIGN UP WITH EMAIL -->
                    <div class="panel__section">
                        <form id="formRegister" class="form" action="">
                            <div class="input input--text">
                                <input type="email" class="input__field" id="emailAddress" value="" required>
                                <label for="emailAddress">Email Address</label>
                            </div>
                            <div class="input input--password">
                                <input type="password" class="input__field" id="createPass" value="" required>
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
                            Already have an account? <a class="link modal--toggle" href="javascript:;" data-target="#modalLogin">Log In</a>
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

import { mapGetters } from 'vuex';
export default {
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
    }
  },
  methods: {
    close() {
      this.$store.dispatch('updateHasModal', false);
      this.$store.dispatch('updateActiveModal', '');
    }
  }
}

</script>

<style lang="css">
</style>
