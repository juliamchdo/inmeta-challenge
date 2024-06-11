<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const password = ref('');

function submitLogin() {
  console.log(email.value, password.value)
}
</script>

<template>
  <main class="card">
    <h2>Cards Marketplace</h2>
    <form class="form">
      <div class="mb-3">
        <label for="email" class="col-form-label">Email</label>
        <input type="text" class="form-control" id="email" v-model="email" placeholder="exemplo@gmail.com" />
      </div>
      <div class="mb-3">
        <label for="password" class="col-form-label">Senha</label>
        <input type="password" class="form-control" v-model="password" id="password" />
      </div>
    </form>
    <router-link to="#" class="forgot-password">Esqueceu a senha?</router-link>
    <button type="button" class="login_btn" @click="submitLogin">Login</button>
    <div class="footer_card">
      <p>Não possui cadastro?</p>
      <router-link to="#">Cadastre-se agora!</router-link>
    </div>
  </main>
</template>

<style scoped lang="scss">
.card {
  width: auto;
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
