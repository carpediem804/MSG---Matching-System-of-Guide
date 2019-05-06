<template>
  <v-ons-toolbar>
    <div class="left">
      <slot name="left">
        <v-ons-back-button v-if="backLabel">
          {{ backLabel }}
        </v-ons-back-button>
      </slot>
    </div>
    <div class="center">
      <img src="../assets/logo6.png" alt="">
      <!-- <img v-if="this.title=='home'" src="../assets/logo5.png">
      <slot v-else>{{ title }}</slot> -->
    </div>
    <div class="right"><slot name="right"></slot></div>
  </v-ons-toolbar>
</template>

<script>
export default {
  props: ['title', 'backLabel']
};
</script>
