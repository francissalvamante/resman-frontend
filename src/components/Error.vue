<template>
  <v-app class="error-comp">
    <div class="error-container">
      <div class="oops-class">OOPS!</div>
      <div class="error-message">500 - OUR SERVER IS ON A BREAK</div>
      <div class="btn-container">
        <v-btn elevation="2" large color="primary" @click="reloadPage">Reload</v-btn>
        <router-link :to="{ name: 'Home' }" style="text-decoration: none; color: inherit;">
          <v-btn elevation="2" large color="primary" v-if="returnToHome">Back to Home</v-btn>
        </router-link>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class ErrorComponent extends Vue {
  @Prop() error: boolean | undefined
  @Prop() returnToHome: boolean | undefined

  reloadPage () {
    this.$emit('reloadPage', true)
  }
}
</script>

<style lang="less" scoped>
  .error-comp {
    max-height: 200px;
  }
  .error-container {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: center;
    font-family: 'Montserrat', sans-serif;

    .oops-class {
      font-size: 236px;
      position: relative;
    }

    .error-message {
      background-color: white;
      position: relative;
      margin-top: -135px;
      padding: 10px;
      font-size: 28px;
    }

    .btn-container {
      margin-top: 20px;

      :nth-child(1) {
        margin-right: 10px;
      }
    }
  }
</style>
