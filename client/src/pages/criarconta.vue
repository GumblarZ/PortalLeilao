<template>
    <v-main>
        <v-row  justify="center">
            <v-window
                width="100%"
                align="center"
                v-model="step">
                {{this.$store.getters.user}}
                <!--fase 1-->
                <v-window-item :value="1">
                    <v-card max-width="30%" min-width="450" class="mb-12 pa-12"  :elevation="10" width="50%" >
                    <user titulo="Cadastre-se com..."
                    @email="getAccountData"
                    :buttons="buttons"
                    @clicked="clique"
                    />
                    </v-card>
                </v-window-item>
                <!--fase 2-->
                <v-window-item :value="2">
                    <v-card max-width="30%" min-width="450" class="mb-12 pa-12"  :elevation="10" width="50%" >
                        <personal
                        @data="getPersonalData"
                        :buttons="dataButtons"
                        @clicked="clique"/>
                    </v-card>
                </v-window-item>
                <!--fase 3-->
                <v-window-item :value="3">
                    <v-card max-width="30%" min-width="450" class="mb-12 pa-12"  :elevation="10" width="50%" >
                        <Address/>
                    </v-card>
                </v-window-item>
                <!--Button-->
                <v-row align="end" justify="center">
                    <v-card-actions>
                        <!--back to home-->
                       
                        <!--back to item-->
                        <v-btn
                        text
                        large
                        depressed
                        color="#422321"
                        @click="step--"
                        v-if="step != 1">
                            voltar
                        </v-btn>
                        <v-spacer/>
                        <!--next-->
                        <!--next page-->
                        <v-btn
                        color="#422321"
                        class="white--text"
                        depressed
                        large
                        v-if="step === 3"
                        to="/"
                        >
                            Finalizar
                        </v-btn>   
                    </v-card-actions>
                </v-row>
            </v-window>  
        </v-row>
    </v-main>
</template>
<script>
import user from '../components/Modal/criarUsuario/formEmailSenha';
import personal from '../components/Modal/criarUsuario/cadastrarDadosPessoais';
import Address from '../components/Modal/endereco'
export default { 
    components:{
        user,
        personal,
        Address
    },
    data(){
        return{
            personalData:{},
            accountData:{},
            dataButtons:[
                {
                    text:"Voltar",
                    click:'voltar',
                    color:"#422321",
                },  
                {
                    text:"Salvar",
                    click:'dado',
                    color:"#422321",
                },  
            ],
            buttons:[
                {
                    text:"Voltar",
                    click:'voltar',
                    color:"#422321",
                },
                {
                    text:"Criar",
                    click:'signUp',
                    color:"#422321",
                }
            ],
            step: 1,
            UF: ['SP', 'RJ', 'MG', 'PR', 'MN'],            
        }
    },

    methods:{
        getAccountData(accountData){
            this.accountData = accountData
                },
        getPersonalData(personalData){
            this.personalData = personalData
        },
        clique(botao){
            if(this.step===2 && botao=="dado"){
                this.step++
            }
            if(this.step===1 && botao=="signUp" ){
                this.signUp().then(
                    this.step++             
                )
            }

        },
        async signUp () {
            await this.$store.dispatch('signUserUp', this.accountData)
        }
    }
}
</script>