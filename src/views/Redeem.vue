<template>
  <v-app>
    <loading :show="fetched" />
    <div class="d-flex mtop-30" v-if="fetched">
      <v-container>
        <v-row no-gutters>
          <v-col md="4" offset-md="2">
            <v-img height="400" v-bind:src="prize.imageUrl"></v-img>
          </v-col>
          <v-col md="4" class="margin-response">
            <v-card elevation="2" outlined class="p-20">
              <h1 style="margin-bottom: 30px;">{{ prize.name }}</h1>
              <hr>
              <modal :data="prize" :outOfStock="outOfStock" :message="message" :id="id" @updateMessage="updateMessage($event)" @updateQuantity="updateQuantity($event)" />
              <hr>
              <p style="margin-top: 20px;">{{ prize.quantity }} left in stock</p>
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
          <v-col md="2" offset-md="2" offset-sm="1">
            <p class="description-title">Description</p>
          </v-col>
          <v-col md="6" class="margin-response">
            <p>{{ prize.description }}</p>
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
import Modal from '../components/Modal.vue'
import Loading from '../components/Loading.vue'

interface MessageEvent {
  message: string;
  outOfStock: boolean;
}

@Component({
  components: {
    Modal,
    Loading
  }
})
export default class Redeem extends Vue {
  id: string = this.$route.params.id
  prize: PrizePojo = { name: '', description: '', imageUrl: '', quantity: 0 }
  fetched = false
  outOfStock = false
  message = ''

  async getPrize (id: string): Promise<PrizePojo> {
    const ret = await axios.get(process.env.VUE_APP_SERVER_URL + '/prize', { params: { _id: id } })
    this.fetched = true
    return ret.data
  }

  updateMessage (event: MessageEvent) {
    this.message = event.message
    this.outOfStock = event.outOfStock
  }

  updateQuantity (event: any) { this.prize.quantity = event }

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

  .description-title {
    font-size: 30px;
    font-weight: bolder;
    margin-top: -5px;
  }

  .bg-white {
    background-color: #fff;
  }

  .margin-response {
    margin-left: 20px;
  }

  @media screen and (max-width: 600px) {
    .margin-response {
      margin-left: unset;
    }
  }

  @media screen and (max-width: 960px) {
    .margin-reponse {
      margin-left: unset;
    }
  }
</style>
