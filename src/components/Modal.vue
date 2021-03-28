<template>
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
          :disabled="outOfStock || data.quantity === 0"
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
            <img v-bind:src="data.imageUrl" alt="">
          </v-avatar>
        </div>
        <div class="d-flex mtop-30">
          <p>Redeem for {{ data.name }}?</p>
        </div>
        <v-card-actions class="just-content-center">
          <v-btn class="redeem-btn-color" rounded @click="redeemPrize()">Yes</v-btn>
          <v-btn class="cancel-btn" rounded @click="dialog = !dialog">Cancel</v-btn>
        </v-card-actions>
      </v-card>
      <v-card>
        <loading :show="!loading" />
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
          <p>{{ data.name }}</p>
        </div>
        <v-card-actions class="just-content-center">
          <router-link :to="{ name: 'Home' }" style="text-decoration: none; color: inherit;">
            <v-btn class="redeem-btn-color" rounded @click="redeemed = !redeemed">More Prizes</v-btn>
          </router-link>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { PrizePojo } from './PrizeList.vue'
import axios from 'axios'
import Loading from './Loading.vue'

@Component({
  components: {
    Loading
  }
})
export default class Modal extends Vue {
  @Prop() data: PrizePojo | undefined
  @Prop() outOfStock: boolean | undefined
  @Prop() message: string | undefined
  @Prop() id: number | undefined
  dialog = false
  loading = false
  redeemed = false

  async redeemPrize () {
    this.loading = true
    const ret = await axios.post(process.env.VUE_APP_SERVER_URL + '/prize', { _id: this.id })

    this.loading = false
    if (ret.data.updated) {
      this.redeemed = true
      this.$emit('updateQuantity', ret.data.doc.quantity)
    } else {
      this.$emit('updateMessage', { message: ret.data.message, outOfStock: true })
      this.dialog = false
    }
  }
}
</script>

<style lang="less" scoped>
  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
