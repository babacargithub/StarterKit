import loginCredentials from "src/repository/LoginCredentials";
import { routerInstance } from "boot/router";

const menuItems = [
  {
    title: 'Item 1',
    caption: 'lorum ipsom',
    icon: 'mdi-wallet',
    link: '/mon-compte',
    open: false,
    handlesClick: true,
    clickHandler: function (){
      routerInstance.push({name:"mon-compte"})
    }
  },
  {
    title: 'Déconnexion',
    icon: 'mdi-account',
    link: '/logout',
    open: false,
    handlesClick: true,
    clickHandler: function (){
      loginCredentials.logout()
      routerInstance.push('/')
    }
  }
]
export default menuItems
