<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="auth('wesso')" class="button--wesso">Auth wesso</button>

    <div class="">
      <pre style="text-align: left" v-if="response !== null">{{ JSON.stringify(response, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to OAuth2 Client',
      access_token: null,
      response: null,
      user_info_uri: 'http://localhost:8998/api/userinfo'
    }
  },
  methods: {
    auth: function(provider) {
      if (this.$auth.isAuthenticated()) {
        this.$auth.logout()
      }

      this.response = null
      const self = this
      this.$auth.authenticate(provider).then(function (authResponse) {

        console.log(authResponse.data)
        let access_token = authResponse.data.access_token

        if (provider === 'wesso') {
          self.$http.get(self.user_info_uri, {
            headers: {'Authorization': access_token}
          }).then(function (response) {
            self.response = response
            console.log(response.data.user)
            // 将 user 保存到本地
            // 也可整合到 vuex 中
            localStorage.setItem('user', JSON.stringify(response.data.user))
          })
        }
      }).catch(function (err) {
        this_.response = err
      })
    },
    authLogout: function() {
      this.$auth.logout().then(() => {
        if (!this.$auth.isAuthenticated()) {
          this.response = null
        }
      })
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
button {
  background-color: transparent;
  border: 1px solid #ddd;
  border-radius: 3px;
  font-size: inherit;
  font-weight: 700;
  line-height: 2rem;
  padding: 0 2rem;
}

button:hover {
  cursor: pointer;
}


.button--wesso  { color: #1da1f2; border: 1px solid #1da1f2; }
</style>
