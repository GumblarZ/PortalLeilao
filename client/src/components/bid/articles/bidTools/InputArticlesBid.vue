<template>	
	<v-card 
		width="100%"
		flat
	>
		<v-card-title>
			<strong>
				Lance Atual:{{" R$"+ lanceNow+",00"}}
			</strong>
		</v-card-title>	
		<v-card 
			flat 
			v-if="lances" 
		>
			<v-row class="mt-5">
				<v-card-text 
					v-if="item.active == false" 
					class="red text-center"
				>
						<span class="white--text">
							Lote Fechado Para Lances
						</span>
				</v-card-text>
				<v-card-text v-else>
						{{"Minha cartela "+user.uid}}
						<v-text-field 
							v-mask="['########']"
							v-model="lance" 
							v-on:keyup.enter="AddLance()" 
							label="Faça seu lance" 
							placeholder="R$ 999,99"
							required
							outlined
						/>
						<v-btn 
							:class="layout.btn.type"
                            :color="layout.btn.color"
							v-on:click="AddLance()"
						>
							Faça seu Lance
						</v-btn>
				</v-card-text>	
			</v-row>
		</v-card>
			<!-- Auto lance beta -->
		<v-btn
			class="ma-4"
			v-if="autolance.modal != true"
			v-on:click="autoLanceModal()"
		>
			auto lance
		</v-btn>
		<v-card
			align="center" 
			class="py-auto"
			v-if="autolance.modal"
		>
			{{"Limite dado " + autolance.limit}}
			{{"status "+ autolance.active}}
			<v-text-field
				class="mx-3 mt-5"
				v-model="autolance.limit"
				label="De limite ao seu lance :"
				v-on:keyup.enter="autolancelimit(autolance.limit)"
			/>
				<v-row align="start" justify="center">
					<v-btn 
					color="gray" 
					v-on:click="autoLanceModal()"
					>
						Cancelar
					</v-btn>
					<v-btn
					:class="layout.btn.type"
                    :color="layout.btn.color"
					v-on:click="autolancelimit(autolance.limit)"
					>Confirmar
					</v-btn>
				</v-row>
		</v-card>
	</v-card>		
</template>

<script>
import {mapState} from 'vuex';
import {mask} from 'vue-the-mask'
//import firebase from 'firebase';
export default {
	directives: {mask},
	data(){
		return{
			lance: null,
			// teste auto lance
			autolance: {
				modal: false,
				active: false,
				limit: 0
			}
		};
	},
	methods: {
		AddLance() {
			this.lance = parseInt(this.lance);
			if(this.user.uid){
				if(this.lance > this.lanceNow){
					const time = new Date();
					const lanceConfirmado = {
						lance: this.lance, 
						time:`
						${time.getDate()}/
						${time.getMonth()+1}/
						${time.getFullYear()}-
						${time.getHours()}:
						${time.getMinutes()}
						`, 
						user: this.user.email , 
						idUser: this.user.uid, 
					};		
					this.$store.dispatch('addLance',{id:this.item.id,payload:lanceConfirmado})

				
				}else if(this.lance === this.lanceNow){
						this.$store.commit('ERRO',  ` valor igual ao lance atual, R$ ${this.lanceNow},00`)
					}else{
						this.$store.commit('ERRO',  ` valor abaixo do atual, R$ ${this.lanceNow},00`)
					}
			}else{
				this.$store.commit('MSG_FEED', "Logue Por favor")
				this.$router.push('/login')
			}
		},
		// Teste
		autoLanceModal(){
			this.autolance.modal = !this.autolance.modal;	
		},
		autolancelimit(limit){
			limit = parseInt(limit);
			if(limit <= this.lanceNow){
				alert("valor invalido")
			}else{
				alert(limit)
				this.autolance.active = true
				this.automaticolance(limit)
			}	
		}	
	},
	created() {
		this.$store.dispatch('getLances',this.item.id)
	},
	computed:{
		...mapState({
			layout: state => state.form,
			user: state => state.userApp.user,
			lances: state => state.itemApp.lances,
			item: state => state.itemApp.item,
			lanceMinimo: state => state.itemApp.item.initialBid
		}),
		// funcoes de leitura rapida na tela	
		lanceNow(now){
			if(!this.lances[0]){
				if(this.lanceMinimo){
					return this.lanceMinimo
				}else{
					return "00"
				}
			}else{	
				for (let i = 0; i < this.lances.length; i++) {
				now = this.lances[i].lance;
				}	
				return  now;
			}		
		},
		automaticolance(lance){
			if(this.autolance.active == true){
				console.log("ativo")
				let i = this.lances.length -1
				console.log(this.lances[i].idUser)
				if(this.user.uid == this.lances[i].idUser){
					lance = lance + lance*0.10
				}
			}
			alert(lance)
			return lance
		}

	}
}
</script>





