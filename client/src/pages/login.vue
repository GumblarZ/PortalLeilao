<template >
    <v-main>
      <v-row  justify="center">
        <v-card max-width="30%" min-width="450" class="mb-6 pa-3"  :elevation="10" width="50%" >
          <v-row justify="center">
            <login  
              titulo="Entre com..."
              @clicked="clique"
              @email="getAccountData"
              :buttons="buttons"
              @submit.prevent="onSignIn"
              />
          </v-row>
        </v-card>
       </v-row> 
        {{accountData}}
    </v-main>
</template>


<script>
import login from '../components/Modal/criarUsuario/formEmailSenha'
export default {
  components:{
    login
  },
  data: () => ({
    drawer: null,
    buttons:[
      {
        text:"Voltar",
        click:'voltar',
        color:"#422321",
      },
      {
        text:"Logar",
        click:'login',
        color:"#422321",
      }
    ],
    //dados pro login 
    accountData:""
  }),
  computed:{
    user(){
      return this.$store.getters.user
      },
    error(){
      return this.$store.getters.error
      },
    loading(){
      return this.$store.getters.loading
      },  
    },
  watch:{
    user(value){
      if(value == null && value == undefined){
        this.$router.push('/')
      }
    }
  },  
  methods:{
    getAccountData(accountData){
      this.accountData = accountData
    },
    async clique(botao){
      if(botao == 'login'){
        await this.$store.dispatch('signUserIn',this.accountData).then(
          this.$router.push('/')
        )
      }
    },
  }
}
</script>