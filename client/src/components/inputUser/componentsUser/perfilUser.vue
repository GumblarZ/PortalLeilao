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
              value="Joao Joao Joao"
              label="NOME COMPLETO :"
            />
          <v-text-field
            value="123-***-***-01"
            label="CPF :"
            disabled
          />
          <v-text-field
            value="Joaozinho@joao.com"
            label="EMAIL :"
          />
          <v-text-field
            value="24"
            label="IDADE :"
          />
          <v-text-field
            value="*************"
            label="SENHA :"
            disabled
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

export default { 
}
</script>