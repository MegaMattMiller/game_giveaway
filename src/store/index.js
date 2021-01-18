import Vue from 'vue';
import Vuex from 'vuex';
var faunadb = require('faunadb'),
  q = faunadb.query;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: ''
  },
  mutations: {
    updateData(state, value) {
      state.data = value;
    }
  },
  actions: {
    getData(context) {
      return new Promise((resolve, reject) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        var helper = client.paginate(q.Match(q.Index('active')));
        helper
          .map(function(ref) {
            return q.Get(ref);
          })
          .each(function(page) {
            if (page.length < 1) {
              reject(page);
            }
            var data = {};
            data.games = [];
            page.forEach((element) => {
              if (element.data.active) {
                data.games.push(element.data);
              }
            });
            context.commit('updateData', data);
            resolve(data);
          });
      });
    }
  },
  modules: {}
});
