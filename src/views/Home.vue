<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../services';
import { Cards } from '../types/Cards.types';
import VModal from '../components/V-Modal.vue'
import { formatDate } from '../utils/formatFields';

let cards = ref<Cards[]>([]);

onMounted(async () => {
  await api.get('me/cards').then((res) => {
    cards.value = res.data;
  });
})


let selectedCard = ref<Cards>()
let showModal = ref(false);

function openModal(card: Cards){
  selectedCard.value = card;
  showModal.value = true
}
</script>

<template>
  <main class="main">
    <VModal v-if="showModal" :title="selectedCard?.name" id="exampleModal">
      <template #modal-body>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="img-card">
            <img :src="selectedCard?.imageUrl" class="card-img-modal" alt="card">
          </div>

          <div class="content">
            <p><span class="content-title">Nome:</span> {{ selectedCard?.name }}</p>
            <p><span class="content-title">Data de criação:</span> {{ selectedCard?.createdAt ? formatDate(selectedCard.createdAt) : 'Data não disponível'  }}</p>
            <p><span class="content-title">Descrição:</span> {{ selectedCard?.description }}</p>
          </div>
        </div>
      </template>
    </VModal>
    
    <div class="cards-container">
      <h1 class="title">Suas cartas</h1>
      <template v-if="cards.length > 0">
        <div class="cards-group">
          <div v-for="(card, i) in cards" :key="i" class="card">
            <img :src="card.imageUrl" class="card-img-top" alt="card">
            <div class="card-body">
              <h5 class="card-title">{{ card.name }}</h5>
              <button @click="openModal(card)" data-bs-toggle="modal" data-bs-target="#exampleModal" class="btn btn-primary">Ver detalhes</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss">
.cards-container {
  width: 70%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2rem;
  margin-top: 4rem;

  .cards-group{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .card {
    width: 28rem !important;

    .card-body{
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1rem;
    }

    .card-img-top {
      height: 30rem;
    }

    .card-title {
      font-weight: bold;
      font-size: 1.3rem;
    }

    .card-text {
      font-size: 1.2rem;
    }

    .btn{
      background-color: var(--primary-color);
      border-color: var(--primary-color);
      font-size: 1.2rem;
    }
  } 
}

.card-img-modal{
  width: 20rem;
  height: 25rem;
}

.content{
font-size: 1.4rem;
  .content-title{
  font-weight: bold;
}
}
</style>