<template>
  <v-app>
      <v-card 
      flat 
      width="80%"
      class="mx-auto"
      >
        <v-row justify="center" class="mt-8">
          <p class="display-2">Leiloes</p>
        </v-row>
        <v-row justify="center">
          <v-col cols="6">
            <v-text-field
                outlined
                label="Procure aqui"
                append-icon="mdi-map-marker"
            ></v-text-field>
          </v-col>
        </v-row>
          <v-divider class="mx-12"/>
        <v-row class="mt-6" justify="space-around">
          <v-card
          width="24%"
          :key="card.length"
          v-for="card in cards"
          >
            <v-img height="250px" src="https://cdn.vuetifyjs.com/images/cards/store.jpg" class="white--text align-end bold" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-card-title>{{card.Title}}</v-card-title>
                <v-card-subtitle class="white--text">{{card.Description}}</v-card-subtitle>
            </v-img>
              <v-row align="end">
                <v-chip-group>
                  <v-col>
                      <v-row align="center" dense>
                        <v-col>
                          <h4 class="font-weight-light">Data de Abertura: </h4>
                          <v-spacer></v-spacer>
                          <v-chip color="green" class="white--text subtitle">{{card.dataStart}}</v-chip>
                        </v-col>
                      </v-row>
                      <v-row align="center" dense>
                        <v-col>
                          <h4 class="font-weight-regular">Data de Encerramento: </h4>
                          <v-spacer></v-spacer>
                          <v-chip color="red" class="white--text subtitle">{{card.dataEnd}}</v-chip>
                        </v-col>
                      </v-row>
                    <v-card-subtitle rigth class="title">Lotes: {{card.Lote}}</v-card-subtitle>
                  </v-col>
                </v-chip-group>
              </v-row>
            </v-card>
        </v-row>
      </v-card> 
  </v-app>
</template>

<script>
export default {
  data(){
    return{
      cards:[
        {Title:'Titulo',Description:'adsadadsadsafgvd', dataStart:'12/07', dataEnd:'36/07', Lote:'24'},
        {Title:'Titulo',Description:'Descriçao', dataStart:'12/07', dataEnd:'36/07', Lote:'24'},
        {Title:'Titulo',Description:'Descriçao', dataStart:'12/07', dataEnd:'36/07', Lote:'24'},
        {Title:'Titulo',Description:'Descriçao', dataStart:'12/07', dataEnd:'36/07', Lote:'24'}
      ]
    }
  }
}
</script>
