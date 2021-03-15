<template>
  <v-app>
    <div class='d-flex loading' v-if="prize.length === 0">
      <v-progress-circular
        :size="70"
        :width="7"
        indeterminate
        color="primary"></v-progress-circular>
    </div>

    <div class="d-flex mtop-30" v-if="prize.length > 0">
      <v-container>
        <v-row no-gutters>
          <v-col md="4" offset-md="2">
            <v-img height="400" v-bind:src="prize[0].image_url"></v-img>
          </v-col>
          <v-col md="4" style="margin-left: 10px;">
            <v-card elevation="2" outlined class="p-20">
              <h1 style="margin-bottom: 30px;">{{ prize[0].name }}</h1>
              <hr>
              <div class="redeem-btn">
                <v-dialog
                  v-model="dialog"
                  persistent
                  width="500"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn class="redeem-btn-color" rounded
                      v-bind="attrs"
                      v-on="on"
                      :disabled="outOfStock || prize[0].quantity === 0"
                    >
                      Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                    </v-btn>
                  </template>
                  <v-card style="padding-bottom: 20px;" v-if="!redeemed && !loading">
                    <v-card-title class="dialog-title">
                      <h1 style="margin-right: 75px;">Are you sure?</h1>
                      <span @click="dialog = !dialog" class="close-btn"><v-icon>mdi-close</v-icon></span>
                    </v-card-title>
                    <div class="d-flex">
                      <v-avatar size="150" style="margin-top: 30px;">
                        <img v-bind:src="prize[0].image_url" alt="">
                      </v-avatar>
                    </div>
                    <div class="d-flex mtop-30">
                      <p>Redeem for {{ prize[0].name }}?</p>
                    </div>
                    <v-card-actions class="just-content-center">
                      <v-btn class="redeem-btn-color" rounded @click="redeemPrize()">Yes</v-btn>
                      <v-btn class="cancel-btn" rounded @click="dialog = !dialog">Cancel</v-btn>
                    </v-card-actions>
                  </v-card>
                  <v-card v-if="loading">
                    <div class='d-flex loading'>
                      <v-progress-circular
                        :size="70"
                        :width="7"
                        indeterminate
                        color="primary"></v-progress-circular>
                    </div>
                  </v-card>
                  <v-card v-if="redeemed && !loading" style="padding-bottom: 20px;">
                    <v-card-title class="dialog-title">
                      <span @click="dialog = !dialog; redeemed = false;" class="close-btn"><v-icon>mdi-close</v-icon></span>
                    </v-card-title>
                    <div class="d-flex mbot-30">
                      <h1>Congratulations!</h1>
                    </div>
                    <div class="d-flex">
                      <p>You redeemed</p>
                    </div>
                    <div class="d-flex mbot-30" style="margin-top: -20px;">
                      <p>{{ prize[0].name }}</p>
                    </div>
                    <v-card-actions class="just-content-center">
                      <router-link :to="{ name: 'Home' }" style="text-decoration: none; color: inherit;">
                        <v-btn class="redeem-btn-color" rounded @click="redeemed = !redeemed">More Prizes</v-btn>
                      </router-link>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </div>
              <hr>
              <p style="margin-top: 20px;">{{ prize[0].quantity }} left in stock</p>
              <p class="oos-error" v-if="outOfStock">{{ message }}</p>
            </v-card>
          </v-col>
        </v-row>
        <v-row class="mtop-30 mbot-30">
          <v-col md="8" offset-md="2">
            <hr>
          </v-col>
        </v-row>
        <v-row>
          <hr>
          <v-col md="2" offset-md="2">
            <p class="description-title">Description</p>
          </v-col>
          <v-col md="6">
            <p>{{ prize[0].description }}</p>
          </v-col>
        </v-row>
      </v-container>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import axios from 'axios'
import { PrizePojo } from '../components/PrizeList.vue'

@Component
export default class Redeem extends Vue {
  id: string = this.$route.params.id
  prize: PrizePojo[] = []
  dialog = false
  redeemed = false
  outOfStock = false
  message = undefined
  loading = false;

  async getPrize (id: string): Promise<PrizePojo[]> {
    const ret = await axios.get('http://ffea3880e8a5.ngrok.io/prize', { params: { _id: id } })

    return ret.data
  }

  async redeemPrize () {
    this.loading = true
    const ret = await axios.post('http://ffea3880e8a5.ngrok.io/prize', { _id: this.id })

    this.loading = false
    if (ret.data.updated) {
      this.redeemed = true
      this.prize[0].quantity = ret.data.doc.quantity
    } else {
      this.outOfStock = true
      this.message = ret.data.message
      this.dialog = false
    }
  }

  async created () {
    this.prize = await this.getPrize(this.id)
  }
}
</script>

<style lang="less" scoped>
  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .oos-error {
    color: #ff0033;
    margin-top: -20px;
    font-size: 12px;
  }

  .close-btn {
    cursor: pointer;
  }

  .close-btn:hover {
    background-color: #EBEBEB;
    border-radius: 10px;
  }

  .dialog-title {
    display: flex;
    justify-content: flex-end;
  }

  .just-content-center {
    justify-content: center;
  }

  .cancel-btn {
    background-color: #EBEBEB !important;
    padding: 20px 30px !important;
  }

  .redeem-btn {
    display: flex;
    margin: 30px 0px;
  }

  .redeem-btn-color {
    background-color: #FFCF0B !important;
    padding: 20px 30px !important;
  }

  .rotate-180 {
    transform: rotate(90deg);
  }

  .p-20 {
    padding: 20px;
  }

  .mtop-30 {
    margin-top: 30px;
  }

  .mbot-30 {
    margin-bottom: 30px;
  }

  .loading {
    height: 350px;
  }

  .description-title {
    font-size: 30px;
    font-weight: bolder;
    margin-top: -5px;
  }

  .bg-white {
    background-color: #fff;
  }
</style>
