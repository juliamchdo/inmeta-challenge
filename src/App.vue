<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router';
import NavBar from './components/NavBar.vue';
import { computed } from 'vue';

const route = useRoute();
const showNavBar = computed(() => route.path !== '/' && route.path !== '/new-login' && route.path !== '/trades');
</script>

<template>
  <NavBar v-if="showNavBar" />
  <router-view />
</template>

<style>
#app{
  height: 100dvh;
  background-color: var(--primary-color) !important;;
}
</style>
