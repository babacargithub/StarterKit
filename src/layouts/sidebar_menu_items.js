const menuItems = [
  {
    title: 'Menu One',
    caption: 'quasar.dev',
    icon: 'ion-calendar',
    link: '/',
    open: true,
    subItems:[
      {
        title: 'A title',
        caption: 'A caption',
        icon: 'mdi-calendar',
        link: `/menu`,
      }
    ]
  },
  {
    title: 'Menu Two',
    open: false,
    caption: 'A caption',
    icon: 'mdi-calendar',
    link: `/menu`,
    subItems:[
      {
        title: 'Title',
        caption: null,
        icon: 'list',
        link: `/titles`,
      }]
  },
  {
    title: 'Menu Three',
    caption: 'forum.quasar.dev',
    icon: 'mdi-account',
    link: '/offres_senac',
    open: false,
    subItems: [
      {
        title: 'Title',
        caption: null,
        icon: 'list',
        link: `/titles`,
      }
    ]
  }
]
export default menuItems
