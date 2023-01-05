import AfficherArticle from "pages/les_unes/AfficherArticle.vue";
import Acheter from "pages/paiements/Acheter.vue";
import AfficherArchive from "pages/les_unes/AfficherArchive.vue";
import NosContacts from "pages/contact/NosContacts.vue";
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
        path: 'la_une',
        name: "la_une",
        component: () => import('pages/les_unes/LaUne.vue')
      },
      {
        path: 'a_la_une/parution/:parution/pages',
        component: () => import('pages/les_unes/Pages.vue'),
        name: "a_la_une_pages"
      },   {
        path: 'a_la_une/articles/:article',
        name: "a_la_une_lire_article",
        component: AfficherArticle,
      },{
        path: 'acheter/parution_date/:parutionDate',
        name: "acheter",
        component: Acheter,
        meta: { requiresAuth: true},
        props: true
      },
      {
        path: 'themes',
        component: () => import('pages/les_unes/ThemesList.vue')
      },
      {
        path: 'resumes',
        name: "resume_index",
        component: () => import('pages/resumes/ResumesIndex.vue')
      },
      {
        path: 'resumes/:id/afficher',
        name: "resume_afficher",
        props: true,
        component: () => import('pages/resumes/AfficherResume.vue')
      },{
        path: 'archives',
        component: () => import('pages/les_unes/ArchivesList.vue')
      },
      {
        path: 'archives/search/parution/:date_parutions',
        name:"archives_search",
        component: AfficherArchive,
      },
      {
        path: 'contacts',
        name:"contacts",
        component: NosContacts,
        meta: {
          requiresAuth: false
        }
      },
      {
        path: 'mon-compte',
        name:"mon-compte",
        component: MonCompte,
        meta: {
          requiresAuth: true
        }
      },
      /*
      {
        path: 'a_al_une/articles/page/:page',
        name:"a_la_une_articles",
        component: Articles,
      },


      {
        path: 'themes',
        component: () => import('@/views/ThemesList.vue')
      },
      {
        path: 'archives',
        component: () => import('@/views/ArchivesList.vue')
      },
      {
        path: 'archives/search/parution/:date_parutions',
        name:"archives_search",
        component: AfficherArchive,
      },
      {
        path: 'annonces',
        component: () => import('@/views/AnnoncesList.vue')
      },{
        path: 'annonces/consulter/:annonce',
        name: "afficherAnnonce",
        component: () => import('@/views/AfficherAnnonce.vue')
      },
      {
        path: 'mon-compte',
        component: () => import('@/views/MonCompte.vue')
      }*/
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
