<template>
	<div>
		<Menubar :model="items" style="background-color: #6c0e0e;" class="border-noround border-none fixed top-0 left-0 right-0 w-full z-5">
			<template #start>
				<div class="flex align-items-center ml-3">
					<img src="../assets/UNICAES_Logo.png" alt="Logo" class="h-2rem mx-3">
					<Button class="p-button-link text-white text-xl font-medium">{{ title }}</Button>
				</div>
			</template>
			<template #item="{item}">
				<Button @click="toUrl(item.to)" :icon="item.icon" :label="item.label" class="p-button-text p-button-secondary p-button-rounded text-white text-lg font-medium" />
			</template>
			<template #end>
				<Menu ref="menu" :model="menuitems" :popup="true" />
				<Button
				class="p-button-text p-button-rounded text-white"
				icon="pi pi-fw pi-user"
				@click="toggleMenu"
				/>
			</template>
		</Menubar>
	</div>
</template>

<script>
import Menubar from "primevue/menubar";

export default {
	name: "NavBar",
	components: {
		Menubar,
	},
	props: [
		'title'
	],
	data(){
		return {
			selectedModule: null,
			visibleLeft: false,
			items: [
				{
					label:'Solvencias',
					icon:'pi pi-fw pi-file-pdf',
					class: 'text-white',
					to: 'admin.solvencias'
				},
				{
					label:'Gestion',
					icon:'pi pi-fw pi-user',
					class: 'text-white',
					to: 'admin.usuarios'
				},
			],
			menuitems: [
				{
					label:'Perfil',
					class: 'capitalize',
					command: () => this.toUrl('admin.profile')
				},
				{
					separator: true
				},
				{
					label:'Salir',
					class: 'capitalize',
					command: () => this.toUrl('admin.login')
				}
			],
		}
	},
	methods: {
        toAdmin(){
            window.location.href = '/admin';
        },
        toggleMenu(event) {
            this.$refs.menu.toggle(event);
        },
		toUrl(url){
            this.$router.push({ name: url })
        },
    },
}
</script>