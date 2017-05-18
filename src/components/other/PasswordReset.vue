<template>
    <div class="panelz">
        <h1>Reset Password</h1>

        <div v-if="showError">
            {{ errorMessage }}
        </div>
        <div class="panelz">
            <input type="password" class="input__field" :class="{'not--empty': password.length > 0}" v-model="password">
            <input type="password" class="input__field" :class="{'not--empty': repeatpassword.length > 0}" v-model="repeatpassword">
            <button @click="resetPassword">Reset Password</button>
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