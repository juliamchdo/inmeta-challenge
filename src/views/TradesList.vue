<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue';
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

function getTradeCardName(tradeCards: TradeCards[]){
  if(tradeCards.length === 1) {
    return tradeCards[0].card.name
  } else {
    return tradeCards.map(item => item.card.name).join(', ');
  }
}

let selectedTrade = ref<Trades>();
function openModal(trade: Trades){
  selectedTrade.value = trade
  showModal.value = true
  console.log(toRaw(selectedTrade.value))
}
</script>

<template>
  <main class="main">

    <VModal v-if="showModal" title="Cards Marketplace" id="tradesModal">
      <template #modal-body>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="img-card-group">
            Imagens oferecidas
           <div class="img-card"  v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
            <img v-if="trade.type === 'OFFERING'" :src="trade.card.imageUrl" alt="card image">
           </div>

           Imagens Recebidas
           <div class="img-card"  v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
            <img v-if="trade.type === 'RECEIVING'" :src="trade.card.imageUrl" alt="card image">
           </div>
          </div>
        </div>
      </template>
    </VModal>

    <div class="cards-container">
      <h1 class="title">Todas solicitações de troca</h1>
      <template v-if="!isLoading">
        <div class="cards-group">
          <div v-for="(trade, i) in tradesList" :key="i" class="card">
            <div class="card-body">
              <h5 class="card-title"><span>Usuário:</span> {{ trade.user.name }}</h5>
              <p>
                <span>Cartas oferecidas:</span>
                {{ getTradeCardName(trade.tradeCards.filter(c => c.type === 'OFFERING')) }}
              </p>
              <p>
                <span>Cartas recebidas:</span>
                {{ getTradeCardName(trade.tradeCards.filter(c => c.type === 'RECEIVING')) }}
              </p>
              <button @click="openModal(trade)" data-bs-toggle="modal" data-bs-target="#tradesModal" class="btn btn-primary">Ver cartas</button>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>