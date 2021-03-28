<template>
  <v-app>
    <loading :show="prizes.length !== 0" />
    <div class="prizes-list" v-if="prizes.length > 0">
      <v-container>
        <v-row no-gutter v-for="chunk in productChunks" v-bind:key="chunk">
          <v-col cols="12" md="4" xs="12" sm="12" lg="4" xl="4" v-for="prize in chunk" v-bind:key="prize._id" v-spacer>
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

  .loading {
    height: 350px;
  }

  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
