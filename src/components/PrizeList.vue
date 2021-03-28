<template>
  <v-app>
    <loading :show="prizes.length > 0" />
    <div class="prizes-list" v-if="prizes.length > 0">
      <div class="flex-container">
        <div class="flex-content" v-for="prize in prizes" v-bind:key="prize._id">
          <v-card class="custom-card" elevation="2" outlined>
            <v-img height="250" v-bind:src="prize.imageUrl"></v-img>
            <div class="prize-title">{{ prize.name }}</div>
            <div class="redeem-btn">
              <router-link :to="{ name: 'Redeem', params: { id: prize._id } }" style="text-decoration: none; color: inherit;">
                <v-btn class="redeem-btn-color" rounded to="">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </router-link>
            </div>
          </v-card>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import Loading from './Loading.vue'

export interface PrizePojo {
  name: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

@Component({
  components: {
    Loading
  }
})
export default class PrizeList extends Vue {
  prizes: PrizePojo[] = [];

  async getAllPrizes (): Promise<PrizePojo[]> {
    const ret = await axios.get(process.env.VUE_APP_SERVER_URL + '/prizes')
    return ret.data
  }

  async mounted () {
    this.prizes = await this.getAllPrizes()
  }
}
</script>

<style lang="less" scoped>
  .prizes-list {
    width: 100vw;

    .custom-card {
      border-radius: 24px !important;
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

  .flex-container {
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-align-content: center;
    -ms-flex-line-pack: center;
    align-content: center;
    -webkit-align-items: flex-start;
    -ms-flex-align: start;
    align-items: flex-start;

    .flex-content {
      -webkit-order: 0;
      -ms-flex-order: 0;
      order: 0;
      -webkit-flex: 0 1 auto;
      -ms-flex: 0 1 auto;
      flex: 0 1 auto;
      -webkit-align-self: auto;
      -ms-flex-item-align: auto;
      align-self: auto;
      margin: 10px;
    }

    @media screen and (max-width: 768px) {
      .flex-content {
        width: 100%;
        margin: unset;
        padding: 15px
      }
    }
  }
</style>
