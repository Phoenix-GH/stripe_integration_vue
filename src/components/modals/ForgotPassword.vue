<template>

    <div id="modalForgotPassword" class="modal modal--s reversed--head" :class="{'is--visible': active}">
        <div class="modal__wrapper modal__wrapper--transition no--pad">
            <div class="modal__body">
                <div class="modal__head bg--black bg--wood is--reversed">
                    <span class="ts--headline">Forgot Password?</span>
                </div>
                <div class="well no--border">

                    <!-- PANEL BODY -->
                    <div class="panel__body">

                        <!-- SUCCESS MESSAGE -->
                        <div v-if="showSuccess" class="well bg--snow align--center">
                            <svg class="icon-check-circle icon--s color--accent margin--xs no--margin-tb no--margin-l">
                                <use xlink:href="#icon-check-circle"></use>
                            </svg>
                            An email has been sent to <span class="fontWeight--2 link link--secondary">{{ email }}</span>
                        </div>
                        <!-- /SUCCESS MESSAGE -->

                        <!-- ERROR MESSAGE -->
                        <div v-if="showError" class="well bg--light-negative border--negative align--center color--negative">
                            <svg class="icon-close icon--s margin--xs no--margin-tb no--margin-l">
                                <use xlink:href="#icon-close"></use>
                            </svg>
                            {{ errorMessage }}
                        </div>
                        <!-- /ERROR MESSAGE -->

                        <!-- RESET PASSWORD -->
                        <div class="panel__section">
                            <form class="form" @submit.prevent="">
                                <div class="input input--text">
                                    <input v-model="email" type="email" class="input__field" required>
                                    <label for="emailAddress">Email Address</label>
                                </div>
                                <div class <div class="align--center">
                                    <ul class="list list--buttons">
                                        <li class="item">
                                            <button @click="resetPassword" class="btn btn--primary btn--block">Reset Password</button>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <!-- /RESET PASSWORD -->

                    </div>
                    <!-- /PANEL BODY -->
                </div>
            </div>
        </div>
        <div class="modal__overlay" @click="close"></div>
    </div>


</template>

<script>
    import { User, Class } from '../../api';
    import { mapGetters } from 'vuex';

    export default {
        data: function () {
            return {
                email: '',
                errorMessage: 'No account was found for that email address...',
                showError: false,
                showSuccess: false
            }
        },
        computed: {
            ...mapGetters([
                'hasModal', 'activeModal', 'user'
            ]),
            active() {
                if ((this.hasModal) && (this.activeModal == 'forgotpassword')) {
                    return true;
                } else {
                    return false;
                }
            },
            checkErrorMessage() {
                return this.showError;
            }
        },
        methods: {
            close() {
                this.showError = false;
                this.showSuccess = false;
                this.$store.dispatch('updateHasModal', false);
                this.$store.dispatch('updateActiveModal', '');
            },
            resetPassword() {
                if (this.email.length == 0) {
                    return;
                }
                let payload = {
                    email: this.email
                }
                let _this = this;
                User.requestPasswordReset(this, payload).then(response => {
                    console.log(JSON.stringify(response));
                    console.log('success!!!!');
                    _this.showError = false;
                    _this.showSuccess = true;
                }).catch(err => {
                    console.log(JSON.stringify(err));
                    _this.showSuccess = false;
                    _this.showError = true;
                })
            }
        }
    }

</script>

<style>

</style>