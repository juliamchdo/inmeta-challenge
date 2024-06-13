<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VInput from '../components/V-Input.vue';
import api from '../services';
import { Cards } from '../types/Cards.types';

const userCards = ref<Cards[]>([]);
const allCards = ref<Cards[]>([]);

onMounted(async () => {
  await api.get('me/cards').then((res) => {
    userCards.value = res.data;
  });

  const params = {
    rpp: 90,
    page: 1
  }
  await api.get('cards', { params }).then((res) => {
    allCards.value = res.data.list.filter((a: { name: string; }) => a.name !== '')
  })
})

const offeringCards = ref('');
const receivingCards = ref('');

let totalOfferingCards = ref<string[]>([])


function addCards(id: string){
  totalOfferingCards.value.push(id)
}
</script>

<template>
  <main class="main">
    <div class="trade-card">
      <h5 class="title">Selecione suas cartas para trocar</h5>
      <div class="cards-list">
        <template v-for="(userCard, i) in userCards" :key="i">
          <VInput 
            :label="userCard.name" 
            :id="userCard.id" 
            v-model="offeringCards" 
            type="checkbox" 
          />
        </template>
      </div>

      <h5 class="title">Selecione as cartas que deseja receber</h5>
      <div class="cards-list all-cards">
        <template v-for="(card) in allCards" :key="i">
          <VInput 
            :label="card.name" 
            :id="card.id" 
            v-model="receivingCards" 
            type="checkbox" 
            @click="addCards(card.id)"
          />
        </template>

      </div>
    </div>
  </main>
</template>


<style>
.all-cards {
  height: 20rem !important;
  overflow-y: scroll;
}

.cards-list {
  display: flex;
  flex-direction: column;
}

.trade-card {
  width: 60%;
  border: 1px solid var(--primary-color);
  border-radius: 2rem;
  margin-top: 5rem;
  padding: 2rem;

  .title {
    font-size: 1.8rem;
  }
}
</style>