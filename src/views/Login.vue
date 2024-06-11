<script setup lang="ts">
import { computed, ref } from 'vue';
import api from '../services';
import VInput from '../components/V-Input.vue'
import VButton from '../components/V-Button.vue'
import VCard from '../components/V-Card.vue'

const email = ref('');
const password = ref('');
const isPasswordValid = computed(() => password.value.trim() !== '');
const isEmailValid = computed(() => email.value.trim() !== '');
const errorMessage = ref('Campo obrigatório');

let errors = ref({
  email: false,
  password: false
})

function submitLogin() {
  if (validateForm()) {
    api.post('/login', { email: email.value, password: password.value }).then((res) => {
      console.log('res', res)
    })
  }
}

function validateForm(): boolean {
  errors.value = { email: false, password: false };
  if (!isEmailValid.value) errors.value.email = true
  if (!isPasswordValid.value) errors.value.password = true;
  return errors.value.email || errors.value.password ? false : true
}
</script>

<template>
  <VCard title="Cards Marketplace">
    <template #body>
      <form class="form">
        <VInput label="Email" id="email" type="text" v-model="email" placeholder="exemplo@gmail.com"></VInput>
        <p v-if="errors.email" class="invalid">{{ errorMessage }}</p>

        <VInput label="Senha" id="password" type="password" v-model="password"></VInput>
        <p v-if="errors.password" class="invalid">{{ errorMessage }}</p>
      </form>
      <router-link to="#" class="forgot-password">Esqueceu a senha?</router-link>

      <VButton @click="submitLogin" size="large" text="Login"></VButton>
      <div class="footer_card">
        <p>Não possui cadastro?</p>
        <router-link to="new-login">Cadastre-se agora!</router-link>
      </div>
      <div class="footer_card">
        <router-link to="#">Acessar trocas</router-link>
      </div>
    </template>
  </VCard>

</template>

<style scoped lang="scss">
.form {
  display: flex;
  flex-direction: column;
  width: 100%;

  .invalid {
    color: red;
  }
}

.forgot-password {
  width: 100%;
  display: flex;
}

.footer_card {
  display: flex;
  width: 100%;
  justify-content: center;
}

.footer_card p {
  margin-right: 1rem;
}
</style>
