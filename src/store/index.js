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
    setGameID(context, payload) {
      return new Promise((resolve) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        client
          .query(q.Update(q.Ref(q.Collection('game-keys'), payload.ref), { data: { gameId: payload.gameId } }))
          .then((ret) => {
            resolve(ret);
          });
      });
    },
    markGameRedeemed(context, payload) {
      return new Promise((resolve) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        client
          .query(q.Update(q.Ref(q.Collection('game-keys'), payload.ref), { data: { active: false } }))
          .then((ret) => {
            resolve(ret);
          });
      });
    },
    submitData(context, payload) {
      return new Promise((resolve) => {
        var client = new faunadb.Client({
          secret: process.env.VUE_APP_APP_TOKEN,
          domain: 'db.fauna.com',
          scheme: 'https'
        });
        var createP = client.query(
          q.Create(q.Collection('game-keys'), {
            data: { title: payload.title, active: true, humble_url: payload.url, gameId: payload.gameId }
          })
        );
        createP.then(function(response) {
          resolve(response);
        });
      });
    },
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
                element.data.ref = element.ref.id;
                data.games.push(element.data);
              }
            });
            data.games.sort(function(a, b) {
              var textA = a.title.toUpperCase();
              var textB = b.title.toUpperCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
            context.commit('updateData', data);
            resolve(data);
          });
      });
    }
  }
});
