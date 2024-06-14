<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Cards } from '../../types/Cards.types';
import VModal from '../../components/V-Modal.vue'
import { formatDate } from '../../utils/formatFields';
import { Modal } from '../../services/modal';
import VButton from '../../components/V-Button.vue';
import { CardsApi } from '../../api/cards-api';

let cardsList = ref<Cards[]>([]);

onMounted(async () => {
  await CardsApi.listAllCards().then((res) => {
    cardsList.value = res
  })
});

let selectedCard = ref<Cards>()
let showModal = ref(false);

function openModal(card: Cards) {
  selectedCard.value = card;
  showModal.value = true
  Modal.openModal('cardsListModal')
}

function addCard(id: string) {
  const params = {
    cardIds: [
      id
    ]
  }
  CardsApi.addUserCard(params)
}
</script>

<template>
  <main class="main">
    <VModal v-if="showModal" :title="selectedCard?.name" id="cardsListModal">
      <template #modal-body>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="img-card">
            <img :src="selectedCard?.imageUrl" class="card-img-modal" alt="card">
          </div>

          <div class="content">
            <p><span class="content-title">Nome:</span> {{ selectedCard?.name }}</p>
            <p><span class="content-title">Data de criação:</span> {{ selectedCard?.createdAt ?
              formatDate(selectedCard.createdAt) : 'Data não disponível' }}</p>
            <p><span class="content-title">Descrição:</span> {{ selectedCard?.description }}</p>
          </div>
        </div>
      </template>
      <template #footer>
        <VButton @click="addCard(selectedCard!.id)" size="default" text="Adicionar carta" />
      </template>
    </VModal>

    <div class="cards-container">
      <h1 class="title">Cartas para seleção</h1>
      <template v-if="cardsList.length > 0">
        <div class="cards-group">
          <div v-for="(card, i) in cardsList" :key="i" class="card">
            <img :src="card?.imageUrl" class="card-img-top" alt="card">
            <div class="card-body">
              <h5 class="card-title">{{ card?.name }}</h5>
              <VButton @click="openModal(card)" size="default" text="Ver detalhes" />
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

  .cards-group {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 2rem;
  }

  .card {
    width: 28rem !important;
    
    .card-body {
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
  }
}

.card-img-modal {
  width: 20rem;
  height: 25rem;
}

.content {
  font-size: 1.4rem;

  .content-title {
    font-weight: bold;
  }
}

@media screen and (max-width: 828px){
  .cards-group{
    flex-direction: column;
  }
}
</style>