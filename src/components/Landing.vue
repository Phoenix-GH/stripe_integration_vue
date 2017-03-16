<template>
    <div class="container">
        <div class="row">
          <div class="col-sm-12" v-if="!user">
            <h1>PLEASE LOGIN</h1>
          </div>
          <div class="col-sm-12" v-else>
            <div class="col-sm-4">
              <img :src="user.profileImageUrl"/>
            </div>
            <div class="col-sm-8">
              <h1>{{ user.firstName }} {{ user.lastName }}</h1>
              <h3>Is currently logged in.</h3>
              <p>
                {{user}}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <button @click="login" class="btn btn-primary">Login</button>
          <button @click="refreshToken" class="btn btn-primary">Refresh Token</button>
          <button @click="signup" class="btn btn-primary">Signup</button>
          <button @click="logout" class="btn btn-primary">Logout</button>
        </div>
    </div>
</template>

<script>
    import { User } from '../api';
    import { mapGetters } from 'vuex';
    export default {
        computed: {
          ...mapGetters([
            'user'
          ])
        },
        methods: {
          login() {
            User.login(this, { email: 'aaron+3@manhattanmobile.net', password: 'test123'});
          },
          signup() {
            User.signup(this, { email: 'aaron+3@manhattanmobile.net', password: 'test123'});
          },
          logout() {
            User.logout(this);
          },
          refreshToken() {
            User.refreshToken(this);
          }
        }
    }
</script>

<style scoped>
  img {
    object-fit: cover;
    width: 100px;
    height: 100px;
  }
</style>
