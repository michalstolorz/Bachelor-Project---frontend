import Vue from 'vue'
import VueRouter from 'vue-router'
import Repair from '../views/Repair.vue'
import Repairs from '../views/Repairs.vue'
import AddRepair from '../views/AddRepair.vue'
import RepairTypes from '../views/RepairTypes.vue'
import RegisterEmployee from '../views/RegisterEmployee.vue'
import RegisterCustomer from '../views/RegisterCustomer.vue'
import Login from '../views/Login.vue'
import CustomerRepairs from '../views/CustomerRepairs.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/repair/:id',
    name: 'Repair',
    component: Repair
  },
  {
    path: '/repairs',
    name: 'Repairs',
    component: Repairs
  },
  {
    path: '/repairTypes',
    name: 'RepairTypes',
    component: RepairTypes
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/addRepair',
    name: 'AddRepair',
    component: AddRepair
  },
  {
    path: '/registerEmployee',
    name: 'RegisterEmployee',
    component: RegisterEmployee
  },
  {
    path: '/registerCustomer',
    name: 'RegisterCustomer',
    component: RegisterCustomer
  },
  {
    path: '/customerRepairs',
    name: 'CustomerRepairs',
    component: CustomerRepairs
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
