<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import { mapActions } from 'vuex';

export default Vue.extend({
  name: 'home',
  components: {
    HelloWorld,
  },
  methods: {
    ...mapActions([
      'signIn',
      'getDataItems',
    ]),
  },
  mounted() {
    this.getDataItems();
  },
});
</script>
