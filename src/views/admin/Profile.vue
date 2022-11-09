<template>
	<div class="relative">
		<Toast />
        <ConfirmDialog></ConfirmDialog>

		<div class="" style="height: 60px;">
            <NavBar :title="Perfil" />
        </div>

		<div class="overflow-auto px-3 mt-5" style="max-width: 1478px; margin: 0 auto;">
			<div class="grid">
				<div class="col-12 text-left">
					<h2>Perfil</h2>
					<div class="card">
						<div class="p-fluid grid text-left">							
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Nombres</label>
								<InputText type="text" v-model="$store.state.user.first_name" class="" />
							</div>
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Apellidos</label>
								<InputText type="text" v-model="$store.state.user.last_name" class="" />
							</div>
							<div class="field col-12 md:col-12">
								<label for="email1" class="block text-900 font-medium mb-2">Email</label>
								<InputText type="text" v-model="$store.state.user.email" class="" />
							</div>
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Regiones</label>
								<MultiSelect id="multiselect" v-model="selected_regions" :options="$store.state.user.regions" optionLabel="region_id" placeholder="MultiSelect" class="" />
							</div>
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Roles</label>
								<MultiSelect id="multiselect" v-model="selected_roles" :options="$store.state.user.roles" optionLabel="role_id" placeholder="MultiSelect" class="" />
							</div>
						</div>
					</div>
				</div>
				<div class="col-12 text-left">
					<h2>Cambiar contraseña</h2>
					<div class="card">
						<div class="p-fluid grid text-left">							
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Contraseña</label>
								<Password id="password" v-model="value10" placeholder="Contraseña" class="" />
							</div>
							<div class="field col-12 md:col-6">
								<label for="email1" class="block text-900 font-medium mb-2">Repetir Contraseña</label>
								<Password id="password" v-model="value10" placeholder="Repetir Contraseña" class="" />
							</div>
						</div>
					</div>
				</div>
			</div>

        </div>
	</div>
</template>
<script>
import ApiService from '@/services/ApiService';
import NavBar from "@/components/NavBar.vue";

export default {
	ApiService: null,
	components: {
        NavBar,
    },
	created() {
		this.ApiService = new ApiService();
	},
	async mounted() {
		const response = await this.ApiService.getWithToken('user/me');
		this.$store.state.user = response;

		this.selected_regions = this.$store.state.user.regions;
		this.selected_roles = this.$store.state.user.roles;
	}
}
</script>