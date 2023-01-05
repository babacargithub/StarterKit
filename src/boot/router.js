import { boot } from 'quasar/wrappers'
import loginCredentials from "src/repository/LoginCredentials";
let routerInstance = void 0

export default boot(({ app, router}) => {
  routerInstance = router

  router.beforeEach((to, from) => {
    // instead of having to check every route record with
    // to.matched.some(record => record.meta.requiresAuth)
    if (typeof to.meta.requiresAuth != "undefined" && to.meta.requiresAuth  && !loginCredentials.isConnected()) {
      // this route requires auth, check if logged in
      // if not, redirect to login page.
      return {
        path: '/login',
        // save the location we were at to come back later
        query: { redirect: to.fullPath },
      }
    }
  })
})
export {routerInstance}

