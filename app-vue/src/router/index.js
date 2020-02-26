import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Books from '../views/Books.vue'
import CreateBook from '../views/CreateBook.vue'
import UserBooks from '../views/UserBooks.vue'
import Loan from '../views/Loans.vue'
import CreateLoan from '../views/CreateLoans.vue'
import HomeUser from '../views/HomeUser.vue'
import HomeLibrarian from '../views/HomeLibrarian.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/singup',
    name: 'singup',
    component: SignUp
  },
  {
    path: '/books',
    name: 'books',
    component: Books
  },
  {
    path: '/userbooks',
    name: 'userbooks',
    component: UserBooks
  },
  {
    path: '/createbook',
    name: 'createbook',
    component: CreateBook
  },
  {
    path: '/loans',
    name: 'loans',
    component: Loan
  },
  {
    path: '/createloans',
    name: 'createloans',
    component: CreateLoan
  },
  {
    path: '/homeuser',
    name: 'homeuser',
    component: HomeUser
  },
  {
    path: '/homelibrarian',
    name: 'homelibrarian',
    component: HomeLibrarian
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router