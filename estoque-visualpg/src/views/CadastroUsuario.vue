<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const nome = ref('')
const email = ref('')
const senha = ref('')

function cadastrar(){
  if (!nome.value || !email.value || !senha.value) {
    alert('Preencha todos os campos!')
    return
  }
  // Salvar usuário no localStorage (simulado)
  const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]')
  usuarios.push({ nome: nome.value, email: email.value, senha: senha.value })
  localStorage.setItem('usuarios', JSON.stringify(usuarios))
  
  nome.value = ''
  email.value = ''
  senha.value = ''
  
  router.push('/estoque')
}
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center mb-4">Cadastro de Usuário</h1>
        <div class="card">
          <div class="card-body">
            <div class="mb-3">
              <label for="nome" class="form-label">Nome</label>
              <input type="text" v-model="nome" id="nome" class="form-control" placeholder="Digite o nome">
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">Email</label>
              <input type="email" v-model="email" id="email" class="form-control" placeholder="Digite o email">
            </div>
            <div class="mb-3">
              <label for="senha" class="form-label">Senha</label>
              <input type="password" v-model="senha" id="senha" class="form-control" placeholder="Digite a senha">
            </div>
            <button @click="cadastrar" class="btn btn-primary w-100">Cadastrar e Ir para Estoque</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card { box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075); }
</style>
