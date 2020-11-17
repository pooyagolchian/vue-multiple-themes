<script>
import Vue from 'vue';
import VueMultipleThemes from '@/vue-multiple-themes.vue';

export default Vue.extend({
  name: 'ServeDev',
  components: {
    VueMultipleThemes
  }
});
</script>

<template>
  <div id="app">
    <vue-multiple-themes />
  </div>
</template>
