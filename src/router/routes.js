
import MonCompte from "pages/users/MonCompte.vue";

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '', component: () => import('pages/HomePage.vue'),
      },
      {
        path: 'login', component: () => import('pages/users/Login.vue'),
      },
    
      {
        path: 'mon-compte',
        name:"mon-compte",
        component: MonCompte,
        meta: {
          requiresAuth: true
        }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
