<template>
    <div class="optionalPadding">
        <div class="row content">

            <div v-if="showError">
                {{ errorMessage }}
            </div>

            <!-- SETTINGS PANEL -->
            <div class="col col--4-of-12 col--centered">
                <div class="panel">
                    <!-- PANEL HEADER -->
                    <div class="panel__head">
                        <div class="wrapper">
                            <div class="wrapper__inner">
                                <h3 class="ts--title">Set New Password</h3>
                                <p class="ts--body is--secondary">Keep your account secure, and your information safe.</p>
                            </div>
                            <div class="wrapper__inner align--right">
                                <svg class="icon-lock icon--l color--accent">
                                    <use xlink:href="#icon-lock"></use>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <!-- /PANEL HEADER -->

                    <!-- PANEL BODY -->
                    <div class="panel__body">

                        <!-- PASSWORD FORM -->
                        <div class="panel__section">
                            <div class="well bg--snow">
                                <div class="input input--password">
                                    <input type="password" class="input__field" :class="{'not--empty': password.length > 0}" id="currentPassword" v-model="password" autocomplete="new-password">
                                    <label for="currentPassword">New Password</label>
                                    <div class="input__link"></div>
                                </div>
                                <div class="input input--password">
                                    <input type="password" class="input__field" :class="{'not--empty': repeatpassword.length > 0}" id="repeatPassword" v-model="repeatpassword" autocomplete="new-password">
                                    <label for="repeatPassword">Type it Again</label>
                                    <div class="input__link"></div>
                                    <span class="input__helper">Must be at least 8 characters (case sensitive)</span>
                                </div>
                                <button class="btn btn--primary btn--block" @click="resetPassword">Reset Password</button>
                            </div>
                        </div>
                        <!-- /PASSWORD FORM -->

                    </div>
                    <!-- /PANEL BODY -->
                </div>
            </div>
            <!-- /SETTINGS PANEL -->

        </div>
    </div>
</template>

<script>
    import { User } from '../../api';
    import { mapGetters } from 'vuex';
    export default {
        data: function () {
            return {
                password: '',
                repeatpassword: '',
                showError: false,
                errorMessage: 'Enter your new password and click on reset password.'
            }
        },
        computed: {
            ...mapGetters([
                'user', 'userLoggedIn'
            ])
        },
        methods: {
            resetPassword() {

                if (this.password.length < 8) {
                    this.showError = true;
                    this.errorMessage = "Password length must be 8 characters or more.";
                    return;
                }

                if (this.repeatpassword.length < 8) {
                    this.showError = true;
                    this.errorMessage = "Repeat Password length must be 8 characters or more.";
                    return;
                }

                if (this.password != this.repeatpassword) {
                    this.showError = true;
                    this.errorMessage = "Password and Repeat Password do not match!";
                    return;
                }

                this.showError = false;
                this.errorMessage = "Enter your new password and click on reset password.";

                let token = this.$route.query.token;
                let password = this.password;
                let params = {
                    token: token,
                    password: password
                }

                let _this = this;
                User.resetPasswordWithToken(this, params).then(response => {
                    console.log('password reset');
                    _this.goHome();
                }).catch(err => {
                    console.log('password not reset');
                    this.showError = true;
                    this.errorMessage = err.response.data.message;
                })
            },
            goHome() {
                this.$router.push({ name: 'landing' });
            }
        },
        mounted() {
            if (this.userLoggedIn) {
                //user is logged in, send to profile
                this.$router.push({ name: 'settings/password' });
            }
        }
    }

</script>

<style scoped>
    .panelz {
        padding: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-self: center;
        justify-content: center;
    }
</style>
