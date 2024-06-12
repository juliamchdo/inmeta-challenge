<script setup lang="ts">
import { RouterLink } from 'vue-router';
function showSidebar() {
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  sidebar.style.display = 'flex'
}
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  sidebar.style.display = 'none'
}
</script>

<template>
  <nav>
    <ul class="sidebar">
      <li @click=hideSidebar()>
        <router-link to="#">
          <img src="../assets/icons/close.svg" alt="close">
        </router-link>
      </li>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="#">Adicionar cartas</router-link></li>
      <li><router-link to="#">Solicitações de trocas</router-link></li>
    </ul>
    <ul>
      <li class="d-flex align-items-center nav-title">Cards Marketplace</li>
      <li class="hideOnMobile"><router-link to="/">Home</router-link></li>
      <li class="hideOnMobile"><router-link to="#">Adicionar cartas</router-link></li>
      <li class="hideOnMobile"><router-link to="#">Solicitações de trocas</router-link></li>
      <li class="menu-button" @click=showSidebar()>
        <router-link to="#">
          <img src="../assets/icons/menu.svg" alt="close">
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  background-color: #282a36;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.1);
  color: white;
}

nav ul {
  width: 100%;
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin: 0;
}

nav li {
  height: 50px;
  font-size: 1.4rem;
}

nav a {
  height: 100%;
  padding: 0 30px;
  text-decoration: none;
  display: flex;
  align-items: center;
  color: white;
}

nav a:hover {
  transition: .5s;
  background-color: #3c3f50;
}

nav li:first-child {
  margin-right: auto;
}

.nav-title {
  font-size: 2.2rem;
  padding-left: 2rem
}

.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 250px;
  background-color: white;
  backdrop-filter: blur(12px);
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
}

.sidebar li {
  width: 100%;
}

.sidebar a {
  width: 100%;
}

.menu-button {
  display: none;
}

@media(max-width: 800px) {
  .hideOnMobile {
    display: none;
  }

  .menu-button {
    display: block;
  }
}

@media(max-width: 400px) {
  .sidebar {
    width: 100%;
  }
}
</style>
