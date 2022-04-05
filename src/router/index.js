import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Add from '../views/Add.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'Add',
    component: Add,
    // eslint-disable-next-line no-unused-vars
    beforeEnter: (to, from, next) => {
      if (to.query.auth == process.env.VUE_APP_PASSWORD) {
        next();
      } else {
        return false;
      }
    }
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
