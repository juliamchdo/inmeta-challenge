<script setup lang="ts">
import { RouterLink, useRoute } from 'vue-router';
import { AuthService } from '../services/auth';

const route = useRoute();
const isTradesList = route.path == '/trades'
function showSidebar() {
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  sidebar.style.display = 'flex'
}
function hideSidebar() {
  const sidebar = document.querySelector('.sidebar') as HTMLElement;
  sidebar.style.display = 'none'
}

function logout(){
  AuthService.logout()
}
</script>

<template>
  <nav>
    <ul class="sidebar">
      <li v-if="!isTradesList" @click=hideSidebar()>
        <router-link to="#">
          <img class="sidebar-button" src="../assets/icons/close.svg" alt="close">
        </router-link>
      </li>
      <li class="nav-link" v-if="!isTradesList"><router-link to="/home">Home</router-link></li>
      <li class="nav-link" v-if="!isTradesList"><router-link to="/cards">Adicionar cartas</router-link></li>
      <li class="nav-link" v-if="!isTradesList"><router-link to="/new-trades">Solicitações de trocas</router-link></li>
      <li class="nav-link" v-if="isTradesList"><router-link to="/">ir para Login</router-link></li>
    </ul>
    <ul>
      <li class="d-flex align-items-center nav-title">
        <img class="cards-icon"  src="../assets/icons/cards.svg" alt="close">
        Cards Marketplace
      </li>
      <li v-if="!isTradesList" class="hideOnMobile"><router-link to="/home">Home</router-link></li>
      <li v-if="!isTradesList" class="hideOnMobile"><router-link to="/cards">Adicionar cartas</router-link></li>
      <li v-if="!isTradesList" class="hideOnMobile"><router-link to="/new-trades">Solicitações de trocas</router-link></li>
      <li v-if="!isTradesList" class="hideOnMobile logout" title="Sair"  @click=logout()>
        <img class="sidebar-button" src="../assets/icons/logout.svg" alt="logout">
      </li>
      <li class="menu-button" @click=showSidebar()>
        <router-link to="#">
          <img class="sidebar-button" src="../assets/icons/menu.svg" alt="close">
        </router-link>
      </li>
      <li v-if="isTradesList" class="hideOnMobile"><router-link to="/">Ir para Login</router-link></li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
.cards-icon{
  width: 4.0rem;
  height: 4.0rem;
}
nav {
  padding: 2rem 0;
  background-color: var(--primary-color);
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

  .nav-link{
    font-size: 1.6rem;
  }
}

.logout img {
  height: 3rem;
  margin-right: 1rem
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
  color: var(--secondary-color);
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
  background-color: var(--primary-color);
  backdrop-filter: blur(12px);
  box-shadow: -10px 0 10px rgba(0, 0, 0, 0.1);
  list-style: none;
  display: none;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  z-index: 999;
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
