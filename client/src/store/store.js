//depedencias
import Vue from "vue";
import Vuex from "vuex";
import firebase from "firebase/app";

//usuarios 
import user from "./modules/Backend/users/user";
import perfil from "./modules/Backend/users/perfil";
import login from "./modules/Backend/users/login";

//item
import item from "./modules/Backend/items/item";
import lances from "./modules/Backend/items/lances";
import info from "./modules/Backend/items/info";

//leilao
import bid from "./modules/Backend/bids/bid";
import bidManager from "./modules/Backend/bids/bidManager";
import registro from "./modules/Backend/bids/registroLotes";

//layout

import form from  "./modules/Frontend/layout/forms"

//action
import navEfoter from "./modules/Frontend/actions/nav&foter"
import alerts from "./modules/Frontend/actions/alerts";
import step from "./modules/Frontend/actions/steps";

//API
import viaCep from "./modules/API/viaCep"

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    userApp: user,
    perfil,
    login,
    itemApp: item,
    lances,
    info,
    bidApp: bid,
    bidManager,
    registro,
    alerts,
    stepApp: step,
    form,
    navEfoter,
    viaCep
  },
  state: {
    category: [],
    uf: [],
    alerts:[],
    mensagens:[],
    admView: false
  },
  mutations: {
    setCategories(state, payload) {
      state.category = payload;
    },
    setUF(state, payload) {
      state.uf = payload;
    },
    setAdmView(state, payload){
      state.admView = payload
    }
  },
  actions: {
    //categorias
    getcategories({ commit }) {
      firebase
        .firestore()
        .collection("item")
        .doc("category")
        .get()
        .then((doc) => {
          let categories = [];
          categories.push((categories = doc.data().item));
          return commit("setCategories", categories);
        });
    },
    getUF({ commit }) {
      firebase
        .firestore()
        .collection("item")
        .doc("uf")
        .get()
        .then((doc) => {
          let estados = [];
          estados = doc.data().item;
          return commit("setUF", estados);
        });
    },
  },
  getters: {},
});