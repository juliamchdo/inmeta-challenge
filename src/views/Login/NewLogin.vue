<script setup lang="ts">
import { ref } from 'vue';
import { isInputEmpty } from '../../utils/InputValidation';
import api from '../../services';
import VInput from '../../components/V-Input.vue'
import VButton from '../../components/V-Button.vue'
import VCard from '../../components/V-Card.vue'
import router from '../../router';
import { toast } from 'vue3-toastify';
import { LoginApi } from '../../api/login-api';

const email = ref('');
const password = ref('');
const name = ref('');
const isPasswordValid = isInputEmpty(password);
const isEmailValid = isInputEmpty(email);
const isNameValid = isInputEmpty(name);
const errorMessage = ref('Campo obrigatório');
let loading = ref(false)
let errors = ref({
  name: false,
  email: false,
  password: false
})

function createLogin() {
  if (validateForm()) {
    loading.value = true

    const params = {
      email: email.value,
      name: name.value,
      password: password.value
    }

    LoginApi.registerUser(params).then(() => loading.value = false)
   
  }
}

function validateForm(): boolean {
  errors.value = { name: false, email: false, password: false };
  if (!isEmailValid.value) errors.value.email = true
  if (!isPasswordValid.value) errors.value.password = true;
  if (!isNameValid.value) errors.value.name = true;
  return errors.value.email || errors.value.password || errors.value.name ? false : true
}
</script>

<template>
  <div class="d-flex align-items justify-content-center">
    <VCard title="Novo usuário" class="card-container">
      <template #body>
        <form class="form">
          <VInput label="Nome" id="name" type="text" v-model="name" placeholder="Insira seu nome"></VInput>
          <p v-if="errors.name" class="invalid">{{ errorMessage }}</p>

          <VInput label="Email" id="email" type="text" v-model="email" placeholder="exemplo@gmail.com"></VInput>
          <p v-if="errors.email" class="invalid">{{ errorMessage }}</p>

          <VInput label="Senha" id="password" type="password" v-model="password"></VInput>
          <p v-if="errors.password" class="invalid">{{ errorMessage }}</p>
        </form>

        <VButton @click="createLogin" :loading="loading" size="large" text="Cadastrar"></VButton>
        <div class="footer_card">
          <router-link to="/">Voltar</router-link>
        </div>
      </template>
    </VCard>
  </div>
</template>

<style scoped lang="scss">
.card-container {
  margin-top: 5rem;

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .invalid {
      color: var(--red);
    }
  }

  .footer_card {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .footer_card p {
    margin-right: .5rem;
  }

  .footer_card a {
    color: var(--light-blue);
  }
}
</style>
