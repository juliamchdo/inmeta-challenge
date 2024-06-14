<script setup lang="ts">
import { onMounted, ref } from 'vue';
import VInput from '../../components/V-Input.vue';
import api from '../../services';
import { Cards } from '../../types/Cards.types';
import VModal from '../../components/V-Modal.vue';
import { Modal } from '../../services/modal';
import VButton from '../../components/V-Button.vue';
import TradesList from './TradesList.vue';
import { toast } from 'vue3-toastify';

const userCards = ref<Cards[]>([]);
const allCards = ref<Cards[]>([]);
const userId = ref('')

onMounted(async () => {
  await api.get('me/cards').then((res) => {
    userCards.value = res.data;
  });

  await api.get('me').then((res) => {
    userId.value = res.data.id;
  });

  const params = {
    rpp: 90,
    page: 1
  }
  const userCardNames = userCards.value.map((card: { name: string; }) => card.name);
  await api.get('cards', { params }).then((res) => {
    allCards.value = res.data.list.filter((a: { name: string; }) => {
      return a.name != "" && !userCardNames.includes(a.name)
    })
  })
})

const offeringCards = ref('');
const receivingCards = ref('');

let totalOfferingCards = ref<string[]>([])
let totalReceivingCards = ref<string[]>([])


function addOfferingCards(id: string) {
  totalOfferingCards.value.push(id)
}

function addReceivingCards(id: string) {
  totalReceivingCards.value.push(id)
}

let showModal = ref(false);
let selectedCard = ref<Cards>()

function openModal(card: Cards) {
  selectedCard.value = card;
  showModal.value = true;
  Modal.openModal('addTradeModal');
}

function sendNewTrade(){

  let cards:any = [];

  totalOfferingCards.value.forEach(card => {
    cards.push({
      cardId: card,
      type: 'OFFERING'
    })
  });

  totalReceivingCards.value.forEach(card => {
    cards.push({
      cardId: card,
      type: 'RECEIVING'
    })
  })

  api.post('trades', {cards}).then((res) =>{
      toast('Solcitação de troca enviada', {
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
    <VModal v-show="showModal" :title="selectedCard?.name" id="addTradeModal">
      <template #modal-body>
        <div class="d-flex align-items-center justify-content-center gap-4">
          <img :src="selectedCard?.imageUrl" class="card-img-modal" alt="card">
        </div>
      </template>
    </VModal>

    <template v-if="userCards.length > 0">
      <div class="trade-card">
      <div class="select-cards">
        <h5 class="title">Selecione suas cartas para trocar</h5>
        <div class="cards-list all-cards">
          <template v-for="(userCard, i) in userCards" :key="i">
            <div class="checkbox-input">
              <VInput :label="userCard.name" :id="userCard.id" v-model="offeringCards" type="checkbox"
                @click="addOfferingCards(userCard.id)" />
              <img class="eye" @click="openModal(userCard)" title="Ver carta" src="../assets/icons/eye.png"
                alt="eye icon">
            </div>
          </template>
        </div>
      </div>

      <div class="select-cards">
        <h5 class="title">Selecione as cartas para receber</h5>
        <div class="cards-list all-cards">
          <template v-for="(card, i) in allCards" :key="i">
            <div class="checkbox-input">
              <VInput :label="card.name" :id="card.id" v-model="receivingCards" type="checkbox"
                @click="addReceivingCards(card.id)" />
              <img class="eye" @click="openModal(card)" title="Ver carta" src="../assets/icons/eye.png" alt="eye icon">
            </div>
          </template>
        </div>
        <div class="text-end mt-4 me-4">
          <VButton @click="sendNewTrade" size="default"  text="Enviar solicitação" />
        </div>
      </div>
    </div>
    </template>
    <template v-else>
        <div class="w-50 mt-5 alert alert-dark" role="alert">
          Você ainda não possui cartas para trocar. Clique 
          <RouterLink to="/cards">aqui</RouterLink>
          para adicionar
        </div>
      </template>

    <TradesList :user-id="userId" />
  </main>
</template>


<style scoped lang="scss">
 
.all-cards {
  height: 20rem !important;
  display: flex;
}

.cards-list {
  overflow-y: scroll;
  border: 1px solid var(--secondary-color);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin: 0 1rem;

  .checkbox-input {
    display: flex;
    align-items: center;

    .eye {
      width: 2rem;
      height: 2rem;
    }
  }
}

.trade-card {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 2rem;
  .select-cards{
    height: 10rem;
  }
 
  .title {
    margin: 1rem;
    font-size: 1.8rem;
  }
}

@media screen and (max-width: 480px) {
  .trade-card {
    width: 100%;
    .select-cards {
      width: 100%;
      .cards-list {
        width: 100%;
      }
    }
  }
}

@media screen and (max-width: 723px) {
  .trade-card{
    height: 60rem;
  }
}

@media screen and (min-width: 724px) {
  .trade-card{
    height: 35rem;
  }
}
</style>