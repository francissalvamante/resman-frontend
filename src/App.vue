<template>
  <v-app style="background-color: #f3f3f3;">
    <v-app-bar app flat height="70px" v-if="ls.getItem('token')">
      <router-link :to="{ name: 'Home' }">
        <img src="@/assets/logo2.png" height="50" />
      </router-link>
      <v-toolbar-title class="custom-title">Francis Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="custom-avatar" color="grey"><span class="white--text headline">{{ avatarName() }}</span></v-avatar>
      <div style="margin-top: 20px">
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <p v-bind='attrs' v-on='on'>{{ ls.getItem('name') }}</p>
          </template>
          <v-list>
            <v-list-item class="pad-none">
              <v-list-item-title>
                <div class="clickable" @click="logout()">
                  <p>Logout</p>
                </div>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <v-main style="background-color: #f3f3f3;">
      <div class="banner" v-if="ls.getItem('token')">
        <p class="banner-tag">Rewards</p>
      </div>
      <router-view/>
    </v-main>
    <v-footer class="custom-footer" v-if="ls.getItem('token')">
      <p>Terms & Condition | Privacy Policy</p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class App extends Vue {
  authenticated = false
  ls = localStorage

  avatarName () {
    const fname = localStorage.getItem('name')?.split(' ')

    if (fname) {
      let avatar = ''
      for (let i = 0; i < fname.length; i++) {
        avatar += fname[i].charAt(0)
      }

      return avatar
    } else {
      return ''
    }
  }

  logout () {
    localStorage.clear()
    this.$router.push({ name: 'Login' })
  }

  mounted () {
    const token = localStorage.getItem('token')
    if (token) {
      this.authenticated = true
    }
  }
}
</script>

<style scoped lang="less">
  .clickable {
    cursor: pointer;
    padding-left: 10px;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: flex-end;
  }

  .pad-none {
    padding: unset;
  }

  .clickable:hover {
    background-color: #f1f1f1;
  }

  .banner {
    width: 100vw;
    height: 192px;
    background-color: #0274BB;
    display: flex;
    align-items: center;
    justify-content: center;

    .banner-tag{
      font-size: 56.7px;
      font-weight: bolder;
      color: #fff;
    }
  }

  .top-header {
    display: flex;
  }

  .custom-title {
    margin-left: 10px;
  }

  .custom-avatar {
    margin-right: 10px;
  }

  .custom-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 200px;
    font-weight: bolder;
    background-color: black !important;

    p {
      color: white;
    }
  }
</style>
