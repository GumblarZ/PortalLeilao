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
    item:{
      active: true,
        category: "",
        description: "",
        imgUrl: [],
        initialBid: 0,
        name: "",
        bids: []
    }
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
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
    // metodos copiados da API
    getItemByID(itemID) {
      firebase.firestore().collection('item').doc(itemID).get().then(doc => {
        const item = doc.data();
        return item;
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });

    },
    createItem(item) {
      const newItem = {
        active: true,
        category: item.category,
        description: item.description,
        imgUrl: item.imgUrl,
        initialBid: item.initialBid,
        name: item.name,
        bids: []
      };

      firebase.firestore().collection('item').add(newItem).then(doc => {
        return doc.id;
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });

    },
    updateItem(item) {
      const id = item.id;
      const updateItem = {
        active: item.active,
        category: item.category,
        description: item.description,
        imgUrl: item.imgUrl,
        initialBid: item.initialBid,
        name: item.name
      };

      firebase.firestore().collection('item').doc(id).update(updateItem).then(doc => {
        alert(doc.name + " alterado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    deleteItem(itemId) {
      const id = itemId;
      firebase.firestore().collection('item').doc(id).delete().then(() => {
        alert("Deletado com sucesso");
      }).catch(err => {
        alert('Aconteceu algo inesperado. ' + err.message);
      });
    },
    // leilao retirado da api
  
  term(){
    firebase.firestore().collection('leilao')
    .doc('TermosPadroes').get().then(doc =>{
      let terms = doc.data();
      return res.status(200).send(terms);
  }).catch(err => {
    alert('Aconteceu algo inesperado. ' + err.message);
  });
  },
  
  //puxando pelo Id

  getBidById(bidId){
    firebase.firestore().collection('leilao').doc(bidId).then(doc =>{
      return bid = doc.data();
    }).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
  },

  getAllbids(){
    firebase.firestore().collection('leilao').get().then(snapshot =>{
      let bids = [];
      snapshot.forEach(doc =>{
        bids.push({
          name: doc.data().name,
                      description: doc.data().description,
                      items: doc.data().items,
                      startsOn: doc.data().startsOn,
                      closedAt: doc.data().closedAt
        });
      })
      return bids;
    }).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
  },
  
  //criando leilao
 
  createBid(bid){
    let newBid = {}
    firebase.firestore().collection('leilao').add(newBid).then(doc =>{
      return doc.name
    }).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
  },
  updateBid(bid){
    firebase.firestore().collection('leilao').doc(bid.id).update(bid).then(doc => {
      return alert(doc.name + " atualizado com sucesso");
    }).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
  },
  
  deleteBid(bidID){
    firebase.firestore().doc(bidId).delete().then(
      alert("deletado com sucesso")
    ).catch(err => {
      alert('Aconteceu algo inesperado. ' + err.message);
    });
  }
  
  },
  getters: {
    user(state) {
      console.log(state)
      return state.user
    }
  },
})