<template>
    <v-app>
      <v-row justify="center" >
        <!--INFORMAÇOES-->
        <v-col cols="12" sm="6">
          <v-row justify="center" class="mb-12"> 
            <h1>Perfil</h1>
          </v-row>
        <!--FOTO DO USUARIO-->
          <v-row justify="center"> 
            <v-avatar color="#422321" size="280">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
          </v-row>
        <!--dados do usuario-->
          <div class="mt-12">  
            <v-text-field
              outlined
              label="Nome Completo"
              :value="user.displayName"
              readonly
            />
          <v-text-field
            :value="Cpf"
            label="CPF :"
            outlined
            readonly
          />
          <v-text-field
            outlined
            :value="user.email"
            label="EMAIL :"
          />
          <v-text-field
            :value="user.phoneNumber"
            label="Telefone :"
            outlined
          />
          <v-row justify="center">
            <v-btn outlined color="#422321" >Alterar senha</v-btn>
          </v-row> 
        </div>          
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.userApp.user,
    }),
  },
  data(){
    return{
      usuario:'NOME',
      Cpf:'123-***-***-01',
      Email:'Joaozinho@joao.com',
      Idade:'24',
      Senha:'*************',
    }
  }
}
</script>