<script setup lang="ts">
import { onMounted, ref } from 'vue';
import api from '../services';
import { Cards } from '../types/Cards.types';

let cards = ref<Cards[]>([]);

onMounted(async () => {
  const params = {
    token: localStorage.getItem('token')
  }
  await api.get('me/cards', {
    headers: {
      'Authorization': `Bearer ${params.token}`
    }
  }).then((res) => {
    cards.value = res.data;
  });

  cards.value = [
    {
      "id": "acfc92a6-777b-4f47-8fa0-9237bc4f3e68",
      "name": "Academy Researchers",
      "description": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
      "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
      "createdAt": new Date()
    },
    {
      "id": "arfc92a6-777b-4f47-8fa0-9237bc4f3e68",
      "name": "Academy Researchers",
      "description": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
      "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
      "createdAt": new Date()
    },
    {
      "id": "arfc92a6-777b-4f45-8fa0-9237bc4f3e68",
      "name": "Academy Researchers",
      "description": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
      "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
      "createdAt": new Date()
    },
    {
      "id": "5rfc92a6-777b-4f45-8fa0-9237bc4f3e68",
      "name": "Academy Researchers",
      "description": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
      "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
      "createdAt": new Date()
    },
    {
      "id": "arfc42a6-777b-4f45-8fa0-9237bc4f3e68",
      "name": "Academy Researchers",
      "description": "When Academy Researchers enters the battlefield, you may put an Aura card from your hand onto the battlefield attached to Academy Researchers.",
      "imageUrl": "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=132072&type=card",
      "createdAt": new Date()
    },
  ]
})
</script>

<template>
  <main class="d-flex align-items-center justify-content-center flew-wrap">
    <div class="cards-container">
      <h1 class="title">Suas cartas</h1>

      <template v-if="cards.length > 0">
        <div class="d-flex align-items-start justify-content-center flex-wrap gap-4">
          <div v-for="(card, i) in cards" :key="i" class="card" style="width: 18rem;">
            <img :src="card.imageUrl" class="card-img-top" alt="card">
            <div class="card-body">
              <h5 class="card-title">{{ card.name }}</h5>
              <p class="card-text">{{ card.description }}</p>
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
  justify-content: center;
  gap: 2rem;

  .title {
    color: white;
  }

  .card {
    width: 30rem !important;

    .card-img-top {
      height: 30rem;
    }

    .card-title {
      font-weight: bold;
      font-size: 1.4rem;
    }

    .card-text {
      font-size: 1.2rem;
    }
  }
}
</style>