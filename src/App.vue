<template>
  <v-app style="background-color: #f3f3f3;">
    <v-app-bar app flat height="70px">
      <img src="@/assets/logo2.png" height="50" />
      <v-toolbar-title class="custom-title">Francis Test</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-avatar class="custom-avatar" color="grey"><span class="white--text headline">JD</span></v-avatar>
      <div>John Doe</div>
    </v-app-bar>
    <v-main style="background-color: #f3f3f3;">
      <router-view/>
    </v-main>
    <v-footer class="custom-footer">
      <p>Terms & Condition | Privacy Policy</p>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  })
})
</script>

<style scoped lang="less">
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
