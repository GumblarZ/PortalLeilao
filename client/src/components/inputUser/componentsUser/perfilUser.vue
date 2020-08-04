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
              <v-img :src="user.photoUrl"></v-img>
            </v-avatar>
          </v-row>
          <v-row justify="center">

            <v-file-input
              multiple
                show-size
                counter
                @change="onUpload"
                prepend-icon="mdi-camera"
                v-model="image"
                label="Insira a Imagem"
              outlined color="#422321" 
            >
            Alterar foto de perfil
            </v-file-input>

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
            {{user.photoUrl}}
          </v-row> 
        </div>          
      </v-col>
    </v-row>
  </v-app>
</template>
<script>
import firebase from "firebase";
import "firebase/storage";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      user: (state) => state.userApp.user,
    }),
  },
  data(){
    return{
      Cpf:'123-***-***-01',
      image:""
    }
  },
  methods: {
    async onUpload() {
      let images = this.image;
      images.forEach(image => {
        firebase.storage().ref("PerfilImage/" + this.user.uid).put(image).then(snapshot => {
            snapshot.ref.getDownloadURL().then(url => {
                console.log(url)
                this.$store.dispatch('uploadProfileImg', url);
            });
          });
      });
      console.log(this.user.photoUrl);
    },
    
  }
}
</script>