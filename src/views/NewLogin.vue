<script setup lang="ts">
import { computed, ref } from 'vue';
import api from '../services';
import VInput from '../components/V-Input.vue'

const email = ref('');
const password = ref('');
const name = ref('');
const isPasswordValid = computed(() => password.value.trim() !== '');
const isEmailValid = computed(() => email.value.trim() !== '');
const isNameValid = computed(() => email.value.trim() !== '');
const errorMessage = ref('Campo obrigatório');

let errors = ref({
  name: false,
  email: false,
  password: false
})

function createLogin() {
  if (validateForm()) {
    api.post('/register', { name: name.value, email: email.value, password: password.value }).then((res) => {
      console.log('res', res)
    })
  }
}

function validateForm(): boolean {
  errors.value = { name: false, email: false, password: false };
  if (!isEmailValid.value) errors.value.email = true
  if (!isPasswordValid.value) errors.value.password = true;
  if (!isNameValid.value) errors.value.password = true;
  return errors.value.email || errors.value.password || errors.value.name ? false : true
}
</script>

<template>
  <main class="card">
    <h2>Novo usuário</h2>
    <form class="form">
      <VInput label="Nome" id="name" type="text" v-model="name" placeholder="Insira seu nome"></VInput>
      <p v-if="errors.name" class="invalid">{{ errorMessage }}</p>

      <VInput label="Email" id="email" type="text" v-model="email" placeholder="exemplo@gmail.com"></VInput>
      <p v-if="errors.email" class="invalid">{{ errorMessage }}</p>

      <VInput label="Senha" id="password" type="password" v-model="password"></VInput>
      <p v-if="errors.password" class="invalid">{{ errorMessage }}</p>
    </form>
    <router-link to="#" class="forgot-password">Esqueceu a senha?</router-link>
    <button type="button" class="login_btn" @click="createLogin">Cadastrar</button>
    <div class="footer_card">
      <router-link to="/">Voltar</router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
.card {
  width: 30rem;
  height: auto;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2.0rem;
  border-radius: 2.0rem;

  .form {
    display: flex;
    flex-direction: column;
    width: 100%;

    .invalid {
      color: red;
      border-color: red;
    }
  }

  .form input {
    padding: 1rem;
    border-radius: 5px;
    border: 1px solid #DDDDDD;
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .7);
  }

  .form input.email {
    margin-bottom: 1.5rem;
  }

  .form input.pass {
    margin-bottom: .5rem;
  }

  .login_btn {
    width: 100%;
    font-size: 14px;
    color: white;
    border-radius: 1.5rem;
    border: none;
    background-color: #003A74;
    padding: .8rem;
    margin: 1.5rem 0 1.5rem 0;
    background: linear-gradient(-90deg, #003A74, #006AD5);
    box-shadow: 1px 5px 9px rgba(211, 211, 211, .9);
  }

  .footer_card {
    display: flex;
    width: 100%;
    justify-content: center;
  }

  .footer_card p {
    margin-right: 1rem;
  }

  .footer_card a {
    color: #5881D0;
  }
}

.card h2 {
  margin-bottom: 1rem;
}

.card a.forgot-password {
  width: 100%;
  display: flex;
  color: #5881D0;
}
</style>
