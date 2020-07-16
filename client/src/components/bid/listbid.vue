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
        <v-row  justify="space-around">
          <!--CARTOES-->
          <v-card
          width="24%"
          :key="card.length"
          v-for="card in cards"
          class="mt-9 mb-3"
          >
            <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/store.jpg" class="white--text align-end bold" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)">
                <v-card-title>{{card.Title}}</v-card-title>
            </v-img>
              <v-row align="end" dense>
                  <v-col>
                    <v-card-title class="subtitle-2">{{card.Description}}</v-card-title>
                    <v-card-subtitle>{{card.timeStart}} - {{card.Status}}</v-card-subtitle>
                    <v-divider/>
                    <v-card-subtitle class="title">Lotes: {{card.Lote}}</v-card-subtitle>
                  </v-col>
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
        {Title:'Titulo',Description:'adsadadsadsafgvd',timeStart:'19:00', Status:'finalizado', Lote:'24'},
        {Title:'Titulo',Description:'dnasjndjkansjdnjksandjknasfnujdnfnsdjfdn',timeStart:'19:00', Status:'aberto', Lote:'24'},
        {Title:'Titulo',Description:'dnasjndjkansjdnjksandjknasfnujdnfnsdjfdn',timeStart:'19:00', Status:'aguardo', Lote:'24'},
        {Title:'Titulo',Description:'dnasjndjkansjdnjksandjknasfnujdnfnsdjfdn',timeStart:'19:00', Status:'finalizado', Lote:'24'},
        {Title:'Titulo',Description:'dnasjndjkansjdnjksandjknasfnujdnfnsdjfdn',timeStart:'19:00', Status:'finalizado', Lote:'24'}
      ]
    }
  }
}
</script>
