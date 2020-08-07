<template>
  <v-app id="inspire">
    <v-row no-gutters>
      <navegacao
      @pagina='mudaPage'
      />
      <v-col> 
        <v-window v-model="page" >
          <v-window-item :value="1" >
            <principalPage/>
          </v-window-item>
          <v-window-item :value="2" >
            <produtos/>
          </v-window-item>
          <v-window-item :value="3">           
            <addItem/>
          </v-window-item>
          <v-window-item :value="4">           
            <h1>a fazer</h1>
          </v-window-item>

          <!-- leilao -->
          <v-window-item :value="5">           
            <listBid/>
          </v-window-item>
          <v-window-item :value="6">           
            <addBid/>
          </v-window-item>
          <v-window-item :value="6">           
            <h1>a fazer</h1>
          </v-window-item>
        </v-window>
      </v-col>
    </v-row>
  </v-app>  
</template>

<script>
import navegacao from "../components/leiloeiro/menu"
import produtos from "../components/products/getItens"
import addItem from  "../components/item/additem"
import addBid from "../components/bid/addBid/inputBid"
import listBid from "../components/bid/listbid"
import principalPage from "../components/leiloeiro/principalPage"

export default {
  components:{
    navegacao,
    produtos,
    addItem,
    addBid,
    listBid,
    principalPage
  },
  data(){
    return{
      page: 0,
    }
  },
  methods:{
    mudaPage(page){
      this.page = page;
    }
  }

}
</script>