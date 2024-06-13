<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../services';
import { Trades, TradeCards } from '../types/Trades.types';
import VModal from '../components/V-Modal.vue'

let tradesList = ref<Trades[]>();
let isLoading = ref(true);
onMounted(async () => {
  const params = {
    rpp: 20,
    page: 1
  }
  await api.get('/trades', { params }).then((res) => {
    tradesList = res.data.list

  });
  isLoading.value = false
})


let showModal = ref(false);

function getTradeCardName(tradeCards: TradeCards[]) {
  if (tradeCards.length === 1) {
    return tradeCards[0].card.name
  } else {
    return tradeCards.map(item => item.card.name).join(', ');
  }
}

let selectedTrade = ref<Trades>();
function openModal(trade: Trades) {
  selectedTrade.value = trade
  showModal.value = true
}
</script>

<template>
  <main class="main">

    <VModal v-if="showModal" title="Cards Marketplace" id="tradesModal">
      <template #modal-body>

        <!-- <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <h5>Cartas oferecidas</h5>
            <template v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
              <div class="carousel-item active" v-if="trade.type == 'OFFERING'">
                <img :src="trade.card.imageUrl" class="d-flex align-items-center justify-content-center" alt="...">
              </div>
              <div class="carousel-item" v-if="trade.type == 'OFFERING'">
                <img :src="trade.card.imageUrl" class="d-flex align-items-center justify-content-center" alt="...">
              </div>
            </template>
          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls"
            data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div> -->

        <!-- <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="img-card-group">
            Imagens oferecidas
            <div class="img-card" v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
              <img v-if="trade.type === 'OFFERING'" :src="trade.card.imageUrl" alt="card image">
            </div>

            Imagens Recebidas
            <div class="img-card" v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
              <img v-if="trade.type === 'RECEIVING'" :src="trade.card.imageUrl" alt="card image">
            </div>
          </div>
        </div> -->
      </template>
    </VModal>

    <div class="cards-container mt-5 px-5">
      <h1 class="title">Todas solicitações de troca</h1>
      <template v-if="!isLoading">
        <div class="cards-group">
          <div v-for="(trade, i) in tradesList" :key="i" class="card">
            <div class="card-body">
              <h5 class="card-title">{{ trade.user.name }}</h5>
              <p class="card-text">
                <span>Cartas oferecidas:</span>
                {{ getTradeCardName(trade.tradeCards.filter(c => c.type === 'OFFERING')) }}
              </p>
              <p class="card-text">
                <span>Cartas recebidas:</span>
                {{ getTradeCardName(trade.tradeCards.filter(c => c.type === 'RECEIVING')) }}
              </p>
              <div class="text-end">
                <button @click="openModal(trade)" data-bs-toggle="modal" data-bs-target="#tradesModal"
                  class="btn btn-primary">Ver cartas</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss">
// .carousel-item{
// display: flex;
// align-items: center;
// justify-content: center;
// }
.img-card-group {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.cards-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .cards-group {
    width: 70%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin: 2rem 0;

    .card {
      width: 30rem;
      height: 20rem;

      .card-body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .card-title {
        font-size: 1.4rem;
        font-weight: bold;
      }

      .card-text {
        font-size: 1.2rem;
      }

      span {
        font-weight: bold;
      }

      .btn {
        background-color: var(--primary-color);
        border-color: var(--primary-color);
        font-size: 1.2rem
      }
    }
  }
}
</style>