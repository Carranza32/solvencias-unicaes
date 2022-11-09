<template>
	<div class="grid grid-nogutter surface-section text-800 h-screen">
		<div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center justify-content-center">
			<div class="surface-card p-4 shadow-2 border-round-xl w-full lg:w-6">
				<div class="text-center mb-5">
					<img src="@/assets/UNICAES_Logo.png" alt="Image" height="100" class="mb-3">
					<div class="text-900 text-3xl font-medium mb-3">Solvencias</div>
				</div>

				<div>
					<Message severity="error" v-if="isInvalid" :closable="false">Credenciales erroneas</Message>

					<label for="email1" class="block text-900 font-medium mb-2">Email</label>
					<InputText v-model="email" id="email1" type="text" :class="{'p-invalid':isInvalid}" class="w-full mb-3" />

					<label for="password1" class="block text-900 font-medium mb-2">Contraseña</label>
					<InputText v-model="password" id="password1" type="password" :class="{'p-invalid':isInvalid}" class="w-full mb-3" />					

					<div class="flex align-items-center justify-content-between mb-6">
						<div class="flex align-items-center">
							<Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
							<label for="rememberme1">Recuerdame</label>
						</div>
						<a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">¿Se te olvidó tu contraseña?</a>
					</div>

					<Button label="Iniciar" icon="pi pi-user" class="w-full" @click="toDashboard()"></Button>
				</div>
			</div>
		</div>
		<div class="col-12 md:col-6 overflow-hidden">
			<img src="@/assets/GOPR2597.00_04_31_44.Imagen-fija002.jpg" alt="Image" class="md:ml-auto block h-screen" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
		</div>
	</div>
</template>

<script>
import ApiService from '@/services/ApiService';

export default {
	data: () => ({
		isInvalid: false,
		email: 'admin.santaana@catolica.edu.sv',
		password: 'UNICAES_SANTA_ANA',
	}),
	ApiService: null,
	created() {
		this.ApiService = new ApiService();
	},
	methods: {
		toRegister(){
            window.location.href = '/admin/register';
        },
		async toDashboard(){
			try {
				const response = await this.ApiService.post('auth/sign-in', {
					username: this.email,
					password: this.password,
				});

				if (response?.access_token != null || response?.access_token != undefined) {
					localStorage.setItem('token', response?.access_token)
					window.location.href = '/admin/solvencias';
				}else{
					this.isInvalid = true;
					return
				}
			} catch (error) {
				this.isInvalid = true;
				return
			}
        },
	}
}
</script>