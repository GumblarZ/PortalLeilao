import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

const user = {
  state:{
    user: {},
    loading: false,
    error: null,
  },
  mutations:{
    setUser(state, payload) {
      state.user = payload
    },
  },
  actions:{
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
            commit('setUser', newUser);
          }
        )
        .catch(err => {
          alert('Aconteceu algo inesperado. ' + err.message)
        })
    },
  },
  getters:{
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
  }
}


//modulo item
const item = {
  state:{
    items:[],
    item:{},
  },
  mutations:{
    resetItem(state){
      state.item = {
          active: true,
          category: "",
          description: "",
          imgUrl: [],
          initialBid: 0,
          name: "",
          bids: []
      }
    },
    setItem(state,payload){
      state.item = payload
    },
    setAllItems(state,payload){
      state.items = payload
    },
  },
  actions:{
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
  },
  getters:{}
}

//leilao
const bid = {
  state:{
    bids:[],
    bid:{}
  },
  mutations:{
    setAllBids(state,payload){
      state.bids = payload
    },
    setBid(state,payload){
      state.bid = payload
    },
    resetBid(state){
      state.bid = {
        name: "",
        description: "",
        items: [],
        local: "",
        startsOn: "",
        closedAt: "",
        organizer: "",
        mail: "",
        phone: ""
      }
    }
  },
  actions:{
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
    }
  }
}


Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    userApp: user,
    itemApp: item,
    bidApp: bid  
  },
  state: {   
    category:[], 
  },
  mutations: {
    setCategories(state, payload){
      state.category = payload
    }
  },
  actions: {
    //categorias
    getcategories({commit}){
      firebase.firestore().collection('item').doc('category').get().then(doc => { 
        let categories = [];
        categories.push(categories = doc.data().category);
        return commit('setCategories', categories);
      });  
    }
  },
  getters: {
    
  },
})