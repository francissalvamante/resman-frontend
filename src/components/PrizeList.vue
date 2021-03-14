<template>
  <v-app>
    <div class="prizes-list">
      <v-container>
        <v-row no-gutter v-for="chunk in productChunks" v-bind:key="chunk">
          <v-col cols="12" md="4" v-for="prize in chunk" v-bind:key="prize.name">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" v-bind:src="prize.image_url"></v-img>
              <div class="prize-title">{{ prize.name }}</div>
              <div class="redeem-btn">
                <v-btn class="redeem-btn-color" rounded>
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import _ from 'lodash'

interface PrizePojo {
  name: string;
  description: string;
  image_url: string;
  quantity: number;
}

@Component
export default class PrizeList extends Vue {
  prizes: PrizePojo[] = [];

  async getAllPrizes (): Promise<PrizePojo[]> {
    const ret = await axios.get('http://91ae04fa4521.ngrok.io/prize')
    return ret.data
  }

  async mounted () {
    this.prizes = await this.getAllPrizes()
    console.log('this.prizes', this.prizes)
  }

  get productChunks () {
    return _.chunk(Object.values(this.prizes), 3)
  }
}
</script>

<style lang="less" scoped>
  .prizes-list {
    width: 100vw;

    .custom-card {
      border-radius: 24px !important;
      margin-right: 20px;
      margin-bottom: 20px;
    }

    .redeem-btn-color {
      background-color: #FFCF0B;
      padding: 20px 30px;
    }

    .rotate-180 {
      transform: rotate(90deg);
    }

    .prize-title {
      display: flex;
      height: 100px;
      align-items: center;
      justify-content: center;
    }

    .redeem-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 30px;
    }
  }
</style>
