
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/PageHome.vue') },
      { path: '/search', component: () => import('pages/PageSearch.vue') },
      { path: '/create', component: () => import('pages/pageCreate.vue') },
      { path: '/notification', component: () => import('pages/PageNotification.vue') },
      { path: '/user', component: () => import('pages/PageUser.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
