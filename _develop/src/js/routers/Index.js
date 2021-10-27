import Vue from 'vue';
import Router from 'vue-router';
import Login from '../pages/Login/Index.vue';
import Main from '../pages/Main/Index.vue';
import User from '../pages/User/Index.vue';
import UserNew from '../pages/User/UserNew.vue';
import UserEdit from '../pages/User/UserEdit.vue';
import NotMatch from '../pages/NotMatch/Index.vue';
import store from '../store/store';
// const debug = process.env.NODE_ENV !== 'production';
const sub = '/learn-vue/';
Vue.use(Router);

const router = new Router({
  mode: 'history',
  // hash: false,
  routes: [
    {
      path: `${sub}login`,
      name: 'Login',
      component: Login
    },
    {
      path: `${sub}`,
      name: 'Main',
      component: Main
    },
    {
      path: `${sub}user`,
      name: 'User',
      component: User
    },
    {
      path: `${sub}user/new`,
      name: 'UserNew',
      component: UserNew
    },
    {
      path: `${sub}user/:id`,
      name: 'UserEdit',
      component: UserEdit
    },
    {
      path: `${sub}404`,
      name: 'NotMatch',
      component: NotMatch
    },
    {
      path: `${sub}:catchAll(.*)`,
      redirect: `${sub}404`
    }
  ]
});
router.beforeEach((to, from, next) => {
  console.log();
  const publicPages = [`${sub}login`];
  const authRequired = !publicPages.includes(to.path);
  const loggedIn = store.getters['auth/info'].isLogin;
  if (authRequired && !loggedIn) {
    next(`${sub}login`);
  } else if (!authRequired && loggedIn) {
    next(sub);
  } else {
    next();
  }
});

export default router;
