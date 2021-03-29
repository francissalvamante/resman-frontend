<template>
  <v-app>
    <div class="register-container">
      <v-card class="register-card" :loading="loading">
        <v-card-title class="register-title">
          <v-icon color="black" size="50px">mdi-account-box</v-icon>
          <h3>Register</h3>
        </v-card-title>
        <div class="detail-container">
          <v-text-field label="Username" v-model="data.username" append-icon="mdi-account-circle" :rules="[rules.required]" :disabled="loading"></v-text-field>
        </div>
        <div class="detail-container">
          <v-text-field label="First Name" v-model="data.firstName" :rules="[rules.required]" :disabled="loading"></v-text-field>
        </div>
        <div class="detail-container">
          <v-text-field label="Last Name" v-model="data.lastName" :rules="[rules.required]" :disabled="loading"></v-text-field>
        </div>
        <div class="detail-container">
          <v-text-field label="Email" v-model="data.email" append-icon="mdi-mail" :rules="[rules.required]" :disabled="loading"></v-text-field>
        </div>
        <div class="detail-container">
          <v-text-field label="Password" v-model="data.password" :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="showPass ? 'text' : 'password'" @click:append="showPass = !showPass" :disabled="loading"></v-text-field>
        </div>
        <div class="action-container">
          <v-btn color="primary" block @click="register()" :disabled="disable()">Register</v-btn>
        </div>
      </v-card>
      <v-snackbar color="error" timeout="2000" v-model="error">Username and/or Email is already in use.</v-snackbar>
      <v-snackbar color="success" timeout="2000" v-model="success">Registration Successful.</v-snackbar>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'

@Component
export default class Register extends Vue {
  loading = false
  showPass = false
  error = false
  success = false
  rules = {
    required: (value: any) => !!value || 'Required.'
  }

  data = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  async register () {
    this.loading = true
    try {
      await axios.post(process.env.VUE_APP_SERVER_URL + '/api/auth/signup', this.data)
      this.loading = false
      this.success = true
      setTimeout(() => {
        this.$router.push({ name: 'Login' })
      }, 1500)
    } catch (err) {
      this.loading = false
      this.error = true
    }
  }

  disable () {
    return this.data.username === '' || this.data.firstName === '' || this.data.lastName === '' || this.data.email === '' || this.data.password === ''
  }
}
</script>

<style lang="less" scoped>
  .register-container {
    display: flex;
    height: 100vh;
    align-items: center;
    justify-content: center;

    .register-title {
      display: inherit;
      flex-direction: column;
    }

    .register-card {
      background-color: #f1f1f1;
      padding: 0 30px 20px 30px;
      display: inherit;
      flex-direction: column;
      align-items: center;
      width: 25%;
    }

    .action-container {
      margin-top: 10px;
      width: 100%;

      .signup-spiel {
        font-size: 12px;
        margin-top: 10px;
      }
    }

    .detail-container {
      width: 100%;
    }
  }
</style>
