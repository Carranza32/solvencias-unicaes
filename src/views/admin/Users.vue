<template>
    <div class="relative">
		<Toast />
        <ConfirmDialog></ConfirmDialog>

		<div class="" style="height: 60px;">
            <NavBar :title="Solvencias" />
        </div>

        <div class="card mt-8 mx-8">
            <Toolbar class="mb-4">
                <template #start>
                    <Button label="New" icon="pi pi-plus" class="p-button-primary mr-2" @click="openNew" />
                    <Button label="Delete" icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
                </template>

                <template #end>
                    <Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
            </Toolbar>

            <DataTable ref="dt" :value="users" v-model:selection="selectedProducts" dataKey="id" 
                :paginator="true" :rows="10" :filters="filters"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[5,10,25]" responsiveLayout="scroll">
                <template #header>
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
						<h5 class="mb-2 md:m-0 p-as-md-center">Gestion de usuarios</h5>
						<span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <InputText v-model="filters['global'].value" placeholder="Search..." />
                        </span>
					</div>
                </template>

                <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                <Column field="first_name" header="Name" :sortable="true" style="min-width:16rem">
					<template #body="slotProps">
                        <span>{{slotProps.data.first_name}} {{slotProps.data.last_name}}</span>
                    </template>
				</Column>
                <Column field="email" header="Email" :sortable="true" style="min-width:16rem"></Column>
				<Column field="inventoryStatus" header="Rol" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">Administrador</span>
                    </template>
                </Column>
                <Column field="inventoryStatus" header="Estado" :sortable="true" style="min-width:12rem">
                    <template #body="slotProps">
                        <span :class="'product-badge status-' + (slotProps.data.inventoryStatus ? slotProps.data.inventoryStatus.toLowerCase() : '')">Activo</span>
                    </template>
                </Column>                
                <Column :exportable="false" style="min-width:8rem">
                    <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-warning mr-2" @click="editProduct(slotProps.data)" />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-danger" @click="confirmDeleteProduct(slotProps.data)" />
                    </template>
                </Column>
            </DataTable>
        </div>

        <Dialog v-model:visible="productDialog" :style="{width: '450px'}" header="Usuario" :modal="true" class="p-fluid">
            <img src="https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png" :alt="product.image" class="product-image" v-if="product.image" />
            <div class="field">
                <label for="name">Nombres</label>
                <InputText id="name" v-model.trim="user.first_name" required="true" autofocus :class="{'p-invalid': submitted && !user.first_name}" />
                <small class="p-error" v-if="submitted && !user.first_name">Name is required.</small>
            </div>
            <div class="field">
                <label for="name">Apellidos</label>
                <InputText id="name" v-model.trim="user.last_name" required="true" autofocus :class="{'p-invalid': submitted && !user.last_name}" />
                <small class="p-error" v-if="submitted && !user.last_name">Name is required.</small>
            </div>
            <div class="field">
                <label for="email">Correo</label>
                <InputText id="email" v-model.trim="user.email" required="true" autofocus :class="{'p-invalid': submitted && !user.email}" />
                <small class="p-error" v-if="submitted && !user.email">Name is required.</small>
            </div>
            <div class="field" v-if="user.id">
                <label for="password">password</label>
                <Password id="password" v-model.trim="user.password" required="true" autofocus :class="{'p-invalid': submitted && !user.password}" />
                <small class="p-error" v-if="submitted && !user.password">Password is required.</small>
            </div>

            <div class="field">
                <label class="mb-3">Rol</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <Checkbox id="rol1" name="roles" value="ROLE_UNICAES_ADMINISTRATOR" v-model="user.roles" />
                        <label for="rol1">Administrador</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <Checkbox id="rol2" name="roles" value="ROLE_UNICAES_MODERATOR" v-model="user.roles" />
                        <label for="rol2">Moderador</label>
                    </div>
                </div>
            </div>
            <div class="field">
                <label class="mb-3">regions</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <Checkbox id="region1" name="category" value="REGION_UNICAES_SANTA_ANA" v-model="user.regions" />
                        <label for="region1">SANTA_ANA</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <Checkbox id="region2" name="category" value="REGION_UNICAES_ILOBASCO" v-model="user.regions" />
                        <label for="region2">ILOBASCO</label>
                    </div>
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Save" icon="pi pi-check" class="p-button-text" @click="saveProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Estás seguro de que quieres eliminar a: <b>{{user.first_name}} {{user.last_name}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductDialog = false"/>
                <Button label="Yes" icon="pi pi-check" class="p-button-text" @click="deleteProduct" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteProductsDialog" :style="{width: '450px'}" header="Confirm" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">¿Está seguro de que desea eliminar los usuarios seleccionados?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteProductsDialog = false"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="deleteSelectedProducts" />
            </template>
        </Dialog>
	</div>
</template>

<script>
import { FilterMatchMode } from 'primevue/api';
import ApiService from '@/services/ApiService';
import NavBar from "../../components/NavBar.vue";

export default {
	components: {
        NavBar,
    },
    data() {
        return {
            products: null,
            users: null,
            user: {},
            productDialog: false,
            deleteProductDialog: false,
            deleteProductsDialog: false,
            product: {},
            selectedProducts: null,
            filters: {},
            submitted: false,
            statuses: [
				{label: 'Activo', value: '1'},
				{label: 'Inactivo', value: '0'},
            ]
        }
    },
    ApiService: null,
    created() {
        this.ApiService = new ApiService();
        this.initFilters();
    },
    async mounted() {
        this.ApiService.getUsers().then(data => this.products = data);

        const response = await this.ApiService.getWithToken('user');

		this.users = response
		console.log(this.users);
    },
    methods: {
        formatCurrency(value) {
            if(value)
				return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
			return;
        },
        openNew() {
            this.user = {};
            this.product = {};
            this.submitted = false;
            this.productDialog = true;
        },
        hideDialog() {
            this.productDialog = false;
            this.submitted = false;
        },
        async saveProduct() {
            this.submitted = true;
			console.log(this.user);

			if (this.user?.first_name.trim()) {
                if (this.user.id != null) {
                }
                else {
                    console.log(this.user);
                    
					try {
						await this.ApiService.postWithToken('user', {
							firstName: this.user.first_name,
							lastName: this.user.last_name,
							email: this.user.email,
							roles: this.user.roles,
							regions: this.user.regions,
							password: this.user.password,
						});

						this.$toast.add({severity:'success', summary: 'Usuario creado', detail: 'Product Created', life: 3000});
					} catch (error) {
						this.$toast.add({severity:'error', summary: 'Error al crear el usuario', life: 3000});
					}
                }

                this.productDialog = false;
                this.product = {};
                this.user = {};


            }
        },
        editProduct(product) {
            this.product = {...product};
            this.user = {...product};
            this.productDialog = true;
        },
        confirmDeleteProduct(product) {
            this.product = product;
            this.user = product;
            this.deleteProductDialog = true;
        },
        deleteProduct() {
            this.products = this.products.filter(val => val.id !== this.product.id);
            this.deleteProductDialog = false;
            this.product = {};
            this.user = {};
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        },
        findIndexById(id) {
            let index = -1;
            for (let i = 0; i < this.products.length; i++) {
                if (this.products[i].id === id) {
                    index = i;
                    break;
                }
            }

            return index;
        },
        createId() {
            let id = '';
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            for ( var i = 0; i < 5; i++ ) {
                id += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return id;
        },
        exportCSV() {
            this.$refs.dt.exportCSV();
        },
        confirmDeleteSelected() {
            this.deleteProductsDialog = true;
        },
        deleteSelectedProducts() {
            this.products = this.products.filter(val => !this.selectedProducts.includes(val));
            this.deleteProductsDialog = false;
            this.selectedProducts = null;
            this.$toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
        },
        initFilters() {
            this.filters = {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.table-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media screen and (max-width: 960px) {
        align-items: start;
	}
}

.product-image {
    width: 50px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.p-dialog .product-image {
    width: 50px;
    margin: 0 auto 2rem auto;
    display: block;
}

.confirmation-content {
    display: flex;
    align-items: center;
    justify-content: center;
}
@media screen and (max-width: 960px) {
	::v-deep(.p-toolbar) {
		flex-wrap: wrap;
        
		.p-button {
            margin-bottom: 0.25rem;
        }
	}
}
</style>