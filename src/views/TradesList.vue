<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../services';
import { Trades, TradeCards } from '../types/Trades.types';
import VModal from '../components/V-Modal.vue'
import { Modal } from '../services/modal';
import VButton from '../components/V-Button.vue';
import { AuthService } from '../services/auth';
import { toast } from 'vue3-toastify';


let tradesList = ref<Trades[]>();
let isLoading = ref(true);
let isAuthenticated = AuthService.isAuthenticated();

const props = defineProps<{
  userId?: string
}>()

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
  Modal.openModal('tradesModal')
}

function deleteTrade(tradeId: string){
  api.delete(`/trades/${tradeId}`).then(() =>{
      toast('Solcitação de troca deletada!', {
        "type": 'success',
        "transition": "slide",
        "dangerouslyHTMLString": true
      })
  }).catch((error) => {
    const msg = error.response.data.message;
    toast(msg, {
      "type": 'error',
      "transition": "slide",
      "dangerouslyHTMLString": true
    })
  })
}

</script>

<template>
  <main class="main">
    <VModal v-if="showModal" size="lg" title="Cards Marketplace" id="tradesModal">
      <template #modal-body>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <div class="img-card-container">
           <h5 class="title">Cartas oferecidas</h5>
            <div class="img-card-group">
              <template class="img-card" v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
                <img v-if="trade.type === 'OFFERING'" :src="trade.card.imageUrl" alt="card image">
              </template>
            </div>

            <h5 class="title">Cartas Recebidas</h5>
            <div class="img-card-group" >
              <template class="img-card" v-for="(trade, i) in selectedTrade?.tradeCards" :key="i">
                <img v-if="trade.type === 'RECEIVING'" :src="trade.card.imageUrl" alt="card image">
              </template>
            </div>
          </div>
        </div>
      </template>
    </VModal>

    <div class="cards-container mt-2">
      <div class="d-flex flex-column align-items-start">
        <h1>Todas solicitações de troca</h1>
        <p v-if="!isAuthenticated">Faça login para solicitar troca de cartas</p>
      </div>
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
              <div class="d-flex justify-content-end gap-2">
                <VButton v-if="trade.userId === props.userId" @click="deleteTrade(trade.id)" size="small" type="secondary" text="Deletar solicitação" />
                <VButton @click="openModal(trade)" size="default" text="Ver cartas" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<style scoped lang="scss">
.title{
  font-size: 1.8rem;
  font-weight: bold;
}
.img-card-container{
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 2rem;
}

.img-card-group{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    margin: 1rem 0;
    gap: 1rem;
  }

.cards-container {
  width: 60%;
   display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;

  .cards-group {
    width: 100%;
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
    }
  }
}
</style>