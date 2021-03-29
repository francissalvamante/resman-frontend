<template>
  <v-app>
    <div class="login-container">
      <v-card class="login-card" :loading="loading">
        <v-card-title class="login-title">
          <v-icon color="black" size="50px">mdi-lock</v-icon>
          <h3>Login</h3>
        </v-card-title>
        <div class="username">
          <v-text-field label="Username / Email" v-model="userlogin" append-icon="mdi-account-circle" :rules="[rules.required]" :disabled="loading"></v-text-field>
        </div>
        <div class="password">
          <v-text-field label="Password" v-model="password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass" :disabled="loading"></v-text-field>
        </div>
        <div class="action-container">
          <v-btn class="login-btn" color="primary" block @click="login()" :disabled="disable()">Login</v-btn>
          <p class="signup-spiel">Don't have an account? <router-link :to="{ name: 'Register' }">Sign Up</router-link></p>
        </div>
      </v-card>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

export interface User {
  username: string;
  name: string;
  email: string;
  accessToken: string;
}

@Component
export default class Login extends Vue {
  showPass = false
  success = false
  userlogin = ''
  password = ''
  loading = false
  rules = {
    required: (value: any) => !!value || 'Required.'
  }

  async login () {
    this.loading = true
    try {
      const resp = await axios.post(process.env.VUE_APP_SERVER_URL + '/api/auth/signin', { username: this.userlogin, email: this.userlogin, password: this.password })
      const user: User = resp.data

      localStorage.setItem('token', user.accessToken)
      localStorage.setItem('username', user.username)
      localStorage.setItem('name', user.name)
      localStorage.setItem('email', user.email)

      this.$router.push({ name: 'Home' })
      this.loading = false
    } catch (err) {
      this.loading = false
    }
  }

  disable () {
    return this.loading || this.userlogin === '' || this.password === ''
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;

    .login-title {
      display: inherit;
      flex-direction: column;
    }

    .login-card {
      background-color: #f1f1f1;
      padding: 0 30px 20px 30px;
      display: inherit;
      flex-direction: column;
      align-items: center;
    }

    .action-container {
      margin-top: 10px;
      width: 100%;

      .signup-spiel {
        font-size: 12px;
        margin-top: 10px;
      }
    }
  }
</style>
