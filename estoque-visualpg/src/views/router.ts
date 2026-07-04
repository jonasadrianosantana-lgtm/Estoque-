import { createRouter, createWebHistory } from 'vue-router'
import CadastroUsuario from '../views/CadastroUsuario.vue'
import EstoqueProdutos from '../views/EstoqueProdutos.vue'

const routes = [
  {
    path: '/',
    name: 'CadastroUsuario',
    component: CadastroUsuario
  },
  {
    path: '/estoque',
    name: 'EstoqueProdutos',
    component: EstoqueProdutos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router