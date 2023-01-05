import loginCredentials from "src/repository/LoginCredentials";
import { routerInstance } from "boot/router";

const menuItems = [
  {
    title: 'Mon compte',
    caption: 'Détails compte',
    icon: 'mdi-wallet',
    link: '/mon-compte',
    open: false,
    handlesClick: true,
    clickHandler: function (){
      routerInstance.push({name:"mon-compte"})
    }
  },
  {
    title: 'Partager à un ami',
    open: false,
    icon: 'mdi-share',
    link: `/menu`,
    handlesClick: true,
    clickHandler: function (){
        let text = `Je partage avec vous l'application DigiPress qui est très importante.
        Elle permet d'acheter les journaux sénégalais et de les lire intégralement de façon digitale.
         Elle résume toutes les émissions passées dans les télés ou dans la presse en ligne !.
         Voici les lien de téléchargement:
          -> PlayStore: https://play.google.com/id=golobone.digipress.sn
          -> AppStore: https://play.google.com/id=golobone.digipress.sn
         `
        window.location.href = "https://wa.me/?text="+ text
      },

  },{
    title: 'Nous contacter',
    open: false,
    icon: 'mdi-phone',
    link: `/contacts`,
    handlesClick: true,
    clickHandler: function (){
      routerInstance.push('/contacts')
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
