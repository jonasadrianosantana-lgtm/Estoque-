<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter()

const nomeProduto = ref('')
const quantidade = ref('')
const preco = ref('')
const categoria = ref('')

interface Produto {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  categoria: string;
}
const produtos = ref<Produto[]>([])

let nextId = 1

onMounted(() => {
  const saved = localStorage.getItem('produtos')
  if (saved) {
    produtos.value = JSON.parse(saved)
    nextId = produtos.value.length > 0 ? Math.max(...produtos.value.map(p => p.id)) + 1 : 1
  }
})

function adicionarProduto(){
  if (!nomeProduto.value || !quantidade.value || !preco.value || !categoria.value) {
    alert('Preencha todos os campos!')
    return
  }
  const novoProduto: Produto = {
    id: nextId++,
    nome: nomeProduto.value,
    quantidade: Number(quantidade.value),
    preco: Number(preco.value),
    categoria: categoria.value
  }
  produtos.value.push(novoProduto)
  localStorage.setItem('produtos', JSON.stringify(produtos.value))
  
  // Reset form
  nomeProduto.value = ''
  quantidade.value = ''
  preco.value = ''
  categoria.value = ''
}

function removerProduto(id: number) {
  produtos.value = produtos.value.filter(p => p.id !== id)
  localStorage.setItem('produtos', JSON.stringify(produtos.value))
  nextId = produtos.value.length > 0 ? Math.max(...produtos.value.map(p => p.id)) + 1 : 1
}

function getTotalValor() {
  return produtos.value.reduce((total, p) => total + (p.quantidade * p.preco), 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}
</script>

<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-8">
        <h1>Estoque de Produtos</h1>
        <div class="card mb-4">
          <div class="card-body">
            <div class="row">
              <div class="col-md-6 mb-3">
                <label for="nomeProduto" class="form-label">Nome do Produto</label>
                <input type="text" v-model="nomeProduto" id="nomeProduto" class="form-control" placeholder="Nome">
              </div>
              <div class="col-md-3 mb-3">
                <label for="quantidade" class="form-label">Quantidade</label>
                <input type="number" v-model="quantidade" id="quantidade" class="form-control" placeholder="0">
              </div>
              <div class="col-md-3 mb-3">
                <label for="preco" class="form-label">Preço</label>
                <input type="number" step="0.01" v-model="preco" id="preco" class="form-control" placeholder="0.00">
              </div>
            </div>
            <div class="mb-3">
              <label for="categoria" class="form-label">Categoria</label>
              <input type="text" v-model="categoria" id="categoria" class="form-control" placeholder="Categoria">
            </div>
            <button @click="adicionarProduto" class="btn btn-primary">Adicionar Produto</button>
          </div>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card">
          <div class="card-body text-center">
            <h5>Total de Produtos: {{ produtos.length }}</h5>
            <h4>Valor Total Estoque: {{ getTotalValor() }}</h4>
          </div>
        </div>
      </div>
    </div>

    <table class="table table-hover mt-4">
      <thead class="table-dark">
        <tr>
          <th>Nome</th>
          <th>Qtd</th>
          <th>Preço</th>
          <th>Total</th>
          <th>Categoria</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="produto in produtos" :key="produto.id">
          <td>{{ produto.nome }}</td>
          <td>{{ produto.quantidade }}</td>
          <td>R$ {{ produto.preco.toFixed(2) }}</td>
          <td>R$ {{ (produto.preco * produto.quantidade).toFixed(2) }}</td>
          <td><span class="badge bg-secondary">{{ produto.categoria }}</span></td>
          <td><button @click="removerProduto(produto.id)" class="btn btn-danger btn-sm">Remover</button></td>
        </tr>
      </tbody>
    </table>
    <div class="text-end mt-3">
      <a href="/" class="btn btn-secondary">Voltar ao Cadastro</a>
    </div>
  </div>
</template>

<style scoped>
.card { box-shadow: 0 0.125rem 0.25rem rgba(0,0,0,.075); }
.badge { font-size: 0.8em; }
</style>
