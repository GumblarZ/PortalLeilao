<template>
  <v-app id="inspire">
        <v-navigation-drawer permanent expand-on-hover>
          <!--INFOMAÇOES DO USUARIO-->
          <v-list :key="usuario.length" v-for="usuario in usuario">
            <v-list-item class="px-2">
              <v-list-item-avatar>
                <v-img src="https://cdn.shopify.com/s/files/1/0946/5368/products/alho_grande.jpg?v=1440442906"/>
              </v-list-item-avatar>
              <v-list>
                <v-list-item-title class="title">{{user.name}}</v-list-item-title>
                <v-list-item-subtitle class="title">{{user.email}}</v-list-item-subtitle>
              </v-list>
            </v-list-item>
          </v-list>
          <v-divider />
          <!--CATEGORIAS-->
          <v-list 
            nav 
            dense 
            :key="listas.title" 
            v-for="listas in conteudos">
            <!--titulo-->
              <v-list-group>
                <template v-slot:activator>
                  <v-list-item-icon>
                    <v-icon>{{listas.icon}}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-title v-text="listas.title"/>
                </template>
                <!--conteudo-->
                  <v-list-item-content 
                    dense 
                    :key="lista.conteudo" 
                    v-for="lista in listas.conteudo">
                        <v-btn text v-text="lista.title" @click="meunMudaPagina(lista.page)"/>
                  </v-list-item-content>
              </v-list-group>
              <v-divider class="mt-2"/>
          </v-list>
        </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default { 
  methods:{
    meunMudaPagina(page){
      this.$emit('pagina', page)
    }
  },
  computed: {
    ...mapState({
      user: state => state.userApp.user
    }),
  },
  created(){
    if(!this.user.refreshToken){
      alert('Logue por favor');
      this.$router.push('/')
    }  
  },
  data:() =>({
    usuario:[],
    conteudos:[
      //numero 1
      {icon:"mdi-home",
        title:"Artigos",
        conteudo:[
          {title:"Todas as Peças", page:1},
          {title:"adicionar", page:2},
          {title:"Minhas peças"}
        ]
      },
      //numero 2
      {icon:"mdi-home",
        title:"Leilao",
        conteudo:[
          {title:"Criar"},
          {title:"Todos os leiloes"},
          {title:"Meus leiloes"}
        ]
      },
      //numero 3
      {icon:"mdi-home",
        title:"Mala Direta",
        conteudo:[
          {title:"Gerenciar todos"},
          {title:"Criar"},
          {title:"Editar"},          
        ]
      },
      {
        icon:"mdi-home",
        title:"Administrativo",
        conteudo:[
          {title:"Levantamento Geral"},
          {title:"Gerenciar pocentagem"},
          {title:"reportar problema"},
          {Title:"imprimir documento"}
        ]
      }
    ] 
  })
};
</script>