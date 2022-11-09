<template>
	<div class="grid grid-nogutter surface-section text-800">
		<div class="col-12 md:col-6 p-6 text-center md:text-left flex align-items-center justify-content-center">
			<div class="surface-card p-4 shadow-2 border-round-xl w-full lg:w-6">
				<div class="text-center mb-5">
					<img src="@/assets/UNICAES_Logo.png" alt="Image" height="50" class="mb-3">
					<div class="text-900 text-3xl font-medium mb-3">Solvencias</div>
					<span class="text-600 font-medium line-height-3">¿Ya tienes una cuenta?</span>
					<a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer" @click="toLogin()">Inicia aqui</a>
				</div>

				<div>
					<label for="username" class="block text-900 font-medium mb-2">Nombre de usuario</label>
					<InputText id="username" type="text" class="w-full mb-3" />

					<label for="email" class="block text-900 font-medium mb-2">Email</label>
					<InputText id="email" type="text" class="w-full mb-3" />

					<label for="password" class="block text-900 font-medium mb-2">Contraseña</label>
					<InputText id="password" type="password" class="w-full mb-3" />

					<label for="password_confirm" class="block text-900 font-medium mb-2">Confirmar Contraseña</label>
					<InputText id="password_confirm" type="password_confirm" class="w-full mb-3" />

					<div class="flex align-items-center justify-content-between mb-6">
						<div class="flex align-items-center">
							<Checkbox id="rememberme1" :binary="true" v-model="checked" class="mr-2"></Checkbox>
							<label for="rememberme1">Recuerdame</label>
						</div>
						<a class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">¿Se te olvidó tu contraseña?</a>
					</div>

					<Button label="Registrarme" icon="pi pi-user" class="w-full"></Button>
				</div>
			</div>
		</div>
		<div class="col-12 md:col-6 overflow-hidden">
			<img src="@/assets/GOPR2597.00_04_31_44.Imagen-fija002.jpg" alt="Image" class="md:ml-auto block h-screen" style="clip-path: polygon(8% 0, 100% 0%, 100% 100%, 0 100%)">
		</div>
	</div>
</template>

<script>
export default {
	methods: {
		toLogin(){
            window.location.href = '/admin/login';
        },
	}
}
</script>