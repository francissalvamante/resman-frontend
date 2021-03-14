<template>
  <v-app>
    <div class="prizes-list">
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="@/assets/prize1.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="@/assets/prize2.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="@/assets/prize3.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="https://res.cloudinary.com/dmoqfrr2i/image/upload/v1615724407/Demo%20App/prize4_tptogr.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="@/assets/prize5.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
                  Redeem <v-icon class="rotate-180">mdi-chevron-up</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
          <v-col cols="12" md="4">
            <v-card class="custom-card" elevation="2" outlined>
              <v-img height="250" src="@/assets/prize6.png"></v-img>
              <div class="prize-title">Win a Flyaway</div>
              <div class="redeem-btn">
                <v-btn rounded color="yellow">
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

@Component({
  components: {
  }
})

export default class PrizeList extends Vue {}
</script>

<style lang="less" scoped>
  .prizes-list {
    width: 100vw;

    .custom-card {
      border-radius: 24px !important;
      margin-right: 20px;
      margin-bottom: 20px;
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
