<template>
  <div class='d-flex loading' v-if="!show">
    <v-progress-circular
      :size="70"
      :width="7"
      indeterminate
      color="primary"></v-progress-circular>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop() show: boolean | undefined
}
</script>

<style lang="less" scoped>
  .d-flex {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .loading {
    height: 350px;
  }
</style>
