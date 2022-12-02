import { boot } from 'quasar/wrappers'
import loginCredentials from "src/repository/LoginCredentials";
export default boot(({ app, router}) => {
  router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (to.meta.requiresAuth && !loginCredentials.isConnected()) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        path: '/client',
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      }
    }
  })
})

