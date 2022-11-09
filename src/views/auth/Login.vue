<template>
	<div class="grid grid-nogutter surface-section text-800">
		<ConfirmDialog></ConfirmDialog>
		<Toast />
		<div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center ">
			<section>
				<span class="block text-6xl font-bold mb-1">Solicitud de Solvencia</span>
				<p class="mt-0 mb-4 text-700 line-height-3">
				La solvencia de biblioteca es un documento oficial,que hace constar que el estudiante no tiene libros pendientes de entregar,sanciones por entregas tardías o cualquier otro asunto con la Biblioteca.
				Si deseas solicitar tu solvencia, necesitas llenar el siguiente formulario:</p>

				<div class="field">
					<label for="carnet">Número de carnet (Sin guiones)</label><br>
					<InputText v-model="carnet" id="carnet" type="text" aria-describedby="carnet-help" class="w-full" />
					<small id="carnet-help" class="p-error"></small>
				</div>

				<div class="field">
					<label for="email">Correo electrónico</label><br>
					<InputText v-model="email" id="email" type="email" aria-describedby="email-help" class="w-full" />
					<small id="username1-help">Email donde te gustaría recibir la solvencia.</small>
					<small id="email-help" class="p-error"></small>
				</div>
				
				<Button label="Solicitar" @click="confirm()" type="button" class="mr-3 p-button-raised"></Button>
			</section>
		</div>
		<div class="col-12 md:col-6 overflow-hidden">
			<img src="@/assets/GOPR2597.00_04_31_44.Imagen-fija002.jpg" alt="Image" class="md:ml-auto block h-screen" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
		</div>

		<Dialog header="Solicitud de Solvencia" v-model:visible="showConfirm" :style="{width: '450px'}" :modal="true">
			<div class="confirmation-content">
				<i class="pi pi-exclamation-triangle text-yellow-500 mr-3" style="font-size: 2rem" />
				<span>Confirma tu información</span>

				<div class="mt-3">
					<label class="block text-900 font-medium mb-2">Razón por la que le gustaría tener una solvencia</label>
					<Dropdown v-model="selectedReason" :options="reasons" optionLabel="name" class="w-full" :showClear="false" />
				</div>

				<div class="flex flex-column field mt-2">
					<p><strong>Nombres:</strong> {{ user_info.first_name }}</p>
					<p><strong>Apellidos:</strong> {{ user_info.last_name }}</p>
					<p><strong>Carnet:</strong> {{ user_info.carnet_code }}</p>
					<p><strong>Correo:</strong> {{ user_info.email }}</p>
					<p><strong>Carrera:</strong> {{ user_info.career }}</p>
					<p><strong>Facultad:</strong> {{ user_info.faculty }}</p>
				</div>
			</div>
			<template #footer>
				<Button label="No" icon="pi pi-times" @click="showConfirm = false" class="p-button-text p-button-secondary"/>
				<Button label="Si" icon="pi pi-check" @click="confirmSolvencie()" class="p-button-text" />
			</template>
		</Dialog>
	</div>
</template>

<script>
import ApiService from '@/services/ApiService';

export default {	
	data() {
		return {
			carnet: null,
			email: null,
			confirm_email: null,
			isInvalid: false,
			user_info: {},
			message: '',
			showConfirm: false,
			selectedReason: {name: 'Graduación', code: 'GRADUACION'},
			reasons: [
				{name: 'Graduación', code: 'GRADUACION'},
				{name: 'Reingreso', code: 'REINGRESO'},
				{name: 'Retiro', code: 'RETIRO'},
				{name: 'Otros motivos ', code: 'OTROS_MOTIVOS'},
			]
		};
	},
	ApiService: null,
	created() {
		this.ApiService = new ApiService();
	},
	methods: {
        async confirm() {
			try {
				const response = await this.ApiService.post('solvencies/request', {
					carnet_code: this.carnet,
				});

				if (response == null) {
					this.isInvalid = true;
					return
				}

				this.user_info = response.data;
				this.message = response.message;
				this.showConfirm = true
			} catch (error) {
				this.isInvalid = true;
				return
			}

            // this.$confirm.require({
            //     message: '¿Estas seguro que deseas solicitar una solvencia?',
            //     header: 'Confirmación',
            //     icon: 'pi pi-exclamation-triangle',
			// 	acceptLabel: 'Si',
			// 	acceptIcon: 'pi pi-check',
			// 	rejectIcon: 'pi pi-times',
            //     accept: () => {
            //         this.$toast.add({severity:'success', summary: 'Éxito', detail:'Solvencia solicitada correctamente', life: 3000});
            //     },
            //     reject: () => {
            //         //callback to execute when user rejects the action
            //     },
            //     onHide: () => {
            //         //Callback to execute when dialog is hidden
            //     }
            // });
        },

		async confirmSolvencie(){
			console.log(this.selectedReason);
			try {
				const response = await this.ApiService.post('solvencies/confirm', {
					carnet_code: this.carnet,
					email: this.email,
					reason: this.selectedReason.code,
				});

				console.log(response);

				this.showConfirm = false

				this.$toast.add({severity:'success', summary: 'Éxito', detail:'Solvencia solicitada correctamente', life: 3000});

				this.carnet = ''
				this.email = ''
			} catch (error) {
				
			}
		}
    }
}
</script>