import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    loading: false,
    error: null,
    category:[],
    items:[],
    item:{
        active: true,
        category: "",
        description: "",
        imgUrl: [],
        initialBid: 0,
        name: "",
        bids: []
    },
    bids:[],
    bid:{
      name: "",
      description: "",
      items: "",
      local: "",
      startsOn: "",
      closedAt: "",
      organizer: "",
      mail: "",
      phone: ""
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setItem(state,payload){
      state.item = payload
    },
    setCategories(state, payload){
      state.category = payload
    },
    setAllItems(state,payload){
      state.items = payload
    },
    setAllBids(state,payload){
      state.bids = payload
    },
    setBid(state,payload){
      state.bid = payload
    }
  },
  actions: {
    async getCurrentUser({ commit }) {
      let user = await firebase.auth().currentUser
      commit('setUser', user)


    },
    signUserUp({ commit }, payload) {
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.senha)
        .then(
          user => {
            const newUser = {
              id: user.user,
              registered: [],
            }
            commit('setUser', newUser)
            alert('Sua conta foi cadastrada com sucesso!')
          }).catch(err => {
            alert('Aconteceu algo inesperado. ' + err.message)
          });
    },
    signUserIn({ commit }, payload) {
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.senha)
        .then(
          data => {
            let newUser = {
              displayname: data.user.displayname,
              email: data.user.email,
              phoneNumber: data.user.phoneNumber,
              photoUrl: data.user.photoUrl,
              refreshToken: data.user.refreshToken,
              uid: data.user.uid
            }
            commit('setUser', newUser)
            alert('Logado ' + data.user.email);
          }
        )
        .catch(err => {
          alert('Aconteceu algo inesperado. ' + err.message)
        })
    },

    //categorias
    getcategories({commit}){
      firebase.firestore().collection('item').doc('category').get().then(doc => { 
        let categories = [];
        categories.push(categories = doc.data().category);
        return commit('setCategories', categories);
      });  
    },

    //items
    
    getAllItems({commit}){
      firebase.firestore().collection('artigo').orderBy('name').get().then(snapshot => {
        let ItemList = [];
        snapshot.forEach(doc =>{
          ItemList.push({
            id:doc.id,
            active: doc.data().active,
            category: doc.data().category,
            description: doc.data().description,
            imgUrl: doc.data().imgUrl,
            initialBid: doc.data().initialBid,
            name: doc.data().name
          });
        })        
        return commit('setAllItems', ItemList);
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    getItemByID({commit}) {
      firebase.firestore().collection('artigo').doc('jfZ3P79A90YITUHbzP7N').get().then(doc => {
        const item = doc.data();
        return commit('setItem', item)
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });

    },
    createItem({commit}, payload) { 
      firebase.firestore().collection('artigo').add(payload).then(doc => {
        commit('setItem', doc );
        return alert(doc.id);
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    //a testar
    updateItem({commit}, payload) { 
      firebase.firestore().collection('artigo').doc(payload.id).update(payload).then(doc => {
        commit('setItem', doc );
        alert(doc.name + " alterado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    deleteItem(payload) {
      console.log(payload);
      firebase.firestore().collection('artigo').doc(payload.id).delete().then(() => {
        alert("Deletado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },

    //bid 
    getAllBids({commit}){
      firebase.firestore().collection('leilao').get().then(snapshot =>{
        let bidsList = [];
        snapshot.forEach(doc =>{
          bidsList.push({
            id: doc.id,
            name: doc.data().name,
            description: doc.data().description,
            items: doc.data().items.length,
            startsOn: doc.data().startsOn,
            closedAt: doc.data().closedAt
          });
        })
        return commit('setAllBids', bidsList);
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    createBid({commit},payload){
      firebase.firestore().collection('leilao').add(payload).then(doc =>{
        commit('setBid', doc );
        return alert(doc.name + " criado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    updateBid(payload){
      firebase.firestore().collection('leilao').doc(payload.id).update(payload).then(doc => {
        return alert(doc.name + " atualizado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    deleteBid(payload){
      firebase.firestore().doc(payload.id).delete().then(
        alert("deletado com sucesso")
      ).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    getBidById({commit},payload){
      firebase.firestore().collection('leilao').doc(payload.id).then(doc =>{
        return commit('setBid', doc);
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    /*
  term(){
      firebase.firestore().collection('leilao')
      .doc('TermosPadroes').get().then(doc =>{
        let terms = doc.data();
        return terms
    }).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
    },
  */
  },
  getters: {
    user(state) {
      console.log(state)
      return state.user
    },
    loading(state){
      return state.loading
    },
    error(state){
      return state.error
    }
  },
})