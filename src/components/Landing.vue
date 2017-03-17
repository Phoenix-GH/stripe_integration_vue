<template>
    <div class="container">
        <div class="row">
          <h3>{{ message }}</h3>
          <div class="col-sm-12" v-if="!userLoggedIn">
            <h1>PLEASE LOGIN</h1>
          </div>
          <div class="col-sm-12" v-else>
            <div class="col-sm-4">
              <img :src="user.profileImageUrl"/>
            </div>
            <div class="col-sm-8">
              <h1>{{ user.firstName }} {{ user.lastName }}</h1>
              <p>
                {{user}}
              </p>
            </div>
          </div>
        </div>
        <div class="row">
          <button @click="loginWithFacebook" class="btn btn-primary">Login FB</button>
          <button @click="refreshToken" class="btn btn-primary">Get FB Picture</button>
          <button @click="updateFacebookInfo" class="btn btn-primary">Update FB Info</button>
          <button @click="logout" class="btn btn-primary">Logout FB</button>
        </div>
    </div>
</template>

<script>

  import { User } from '../api';
  import { mapGetters } from 'vuex';

  export default {
    data: function() {
      return {
        message: ''
      }
    },
    created() {

      window.fbAsyncInit = function() {
          FB.init({
              appId      :'263766374079183',
              xfbml      :true,
              version    :'v2.8'
          });
      };

    },
    computed: {
      ...mapGetters([
        'user', 'userLoggedIn'
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
        FB.logout(function(response) {
          console.log(JSON.stringify(response));
          this.message = JSON.stringify(response);
        })
      },
      refreshToken() {
        FB.api('/me', function(response) {
          FB.api(
              "/"+response.id+"/picture",
              function(response) {
                console.log(JSON.stringify(response));
                this.message = JSON.stringify(response);
              }
          );
        });
      },
      loginWithFacebook() {
        let _this = this;
        FB.login(function(response) {
          console.log(JSON.stringify(response));
          this.message = JSON.stringify(response);
          // handle the response
          if (response.status === 'connected') {
            // Logged into your app and Facebook.
            console.log('logged in!');
          } else {
            // The person is not logged into this app or we are unable to tell.
            console.log('not logged in...');
          }
        }, { scope: 'public_profile, email'});
      },
      updateFacebookInfo() {
        FB.api('/me', function(response) {
          console.log(JSON.stringify(response));
          this.message = JSON.stringify(response);
        });
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
