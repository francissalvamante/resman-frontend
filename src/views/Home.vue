<template>
  <v-app>
    <div class="prizes-spiel">
      <p>Here is the full list of prizes that you can win.</p>
    </div>
    <prize-list/>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PrizeList from '@/components/PrizeList.vue'

@Component({
  components: {
    PrizeList
  }
})
export default class Home extends Vue {}
</script>

<style lang="less" scoped>
  .prizes-spiel {
    height: 144px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: transparent;

    p {
      font-size: 19px;
    }
  }
</style>
