<template>
	<div>
		<Toolbar class="mb-4">
			<template #start>
			</template>

			<template #end>
				<Button label="Export" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
			</template>
		</Toolbar>

        <DataTable ref="dt" :value="solvencies" :paginator="true" class="p-datatable-customers" :rows="10"
            dataKey="id" :rowHover="true" v-model:selection="selectedCustomers" v-model:filters="filters" filterDisplay="menu" :loading="loading"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown" :rowsPerPageOptions="[10,25,50]"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
            :globalFilterFields="['name','country.name','date','representative.name','status']" responsiveLayout="scroll">
            <template #header>
                 <div class="flex justify-content-between align-items-center">
                    <h5 class="m-0">Solvencias</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search" />
                        <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                    </span>
                 </div>
            </template>

            <template #empty>
                No customers found.
            </template>

            <template #loading>
                Loading customers data. Please wait.
            </template>

            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
            <Column field="Borrower" header="Nombre" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.Borrower.first_name}} {{data.Borrower.last_name}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>
			<Column field="Borrower" header="Carnet" sortable style="min-width: 14rem" class="uppercase">
                <template #body="{data}">
                    {{data.Borrower.carnet_code}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>
            <Column field="requested_at" header="Fecha" sortable dataType="date" style="min-width: 8rem">
                <template #body="{data}">
                    {{formatDate(data.requested_at)}}
                </template>
                <template #filter="{filterModel}">
                    <Calendar v-model="filterModel.value" dateFormat="mm/dd/yy" placeholder="mm/dd/yyyy" />
                </template>
            </Column>
            <Column field="reason" header="Razon" sortable style="min-width: 14rem">
                <template #body="{data}">
                    {{data.reason}}
                </template>
                <template #filter="{filterModel}">
                    <InputText type="text" v-model="filterModel.value" class="p-column-filter" placeholder="Search by name"/>
                </template>
            </Column>
            <Column field="requested_by" headerStyle="width: 4rem; text-align: center" bodyStyle="text-align: center; overflow: visible">
                <template #body="{data}">
                    <div class="flex">
						<Button icon="pi pi-eye" @click="showDetails(data?.requested_by)" class="p-button-text p-button-secondary mr-3" />
                    	<Button type="button" label="Imprimir" class="p-button-outlined" @click="downloadPDF(data.id)" icon="pi pi-print"></Button>
					</div>
                </template>
            </Column>
        </DataTable>

		<Dialog header="Detalle" v-model:visible="$store.state.borrowerDetailsModalStatus" :breakpoints="{'960px': '75vw', '640px': '90vw'}" :style="{width: '50vw'}" :maximizable="true" :modal="true">
			<div class="flex flex-column field mt-2">
				<p><strong>Nombre Completo:</strong> {{ selected_borrower?.first_name }} {{ selected_borrower?.last_name }}</p>
				<p><strong>Carnet:</strong> {{ selected_borrower?.carnet_code }}</p>
				<p><strong>Correo:</strong> {{ selected_borrower?.email }}</p>
				<p><strong>Carrera:</strong> {{ selected_borrower?.career }}</p>
				<p><strong>Facultad:</strong> {{ selected_borrower?.faculty }}</p>
				<p><strong>Region:</strong> {{ selected_borrower?.region_id }}</p>
			</div>

			<h4>Prestamos</h4>
			<DataTable :value="selected_borrower?.Borrowed_Book" responsiveLayout="scroll" class="p-datatable-sm mb-3" v-if="selected_borrower?.Borrowed_Book.length">
                <Column field="book_id" header="Libro"></Column>
                <Column field="sanctioned_at" header="Fecha prestamo">
					<template #body="{data}">
						{{formatDate(Date(data.start_date))}}
					</template>
				</Column>
                <Column field="sanctioned_at" header="Fecha expiracion">
					<template #body="{data}">
						{{formatDate(Date(data.expiry_date))}}
					</template>
				</Column>
                <Column field="sanction_expiration" header="Fecha retorno">
					<template #body="{data}">
						{{formatDate(Date(data.returned_at))}}
					</template>
				</Column>
            </DataTable>

			<h4>Sanciones</h4>
			<DataTable :value="selected_borrower?.Borrower_Sanction" responsiveLayout="scroll" class="p-datatable-sm mb-3" v-if="selected_borrower?.Borrower_Sanction.length">
                <Column field="reason" header="Razon"></Column>
                <Column field="sanctioned_at" header="Fecha Sancion">
					<template #body="{data}">
						{{formatDate(Date(data.sanctioned_at))}}
					</template>
				</Column>
                <Column field="sanction_expiration" header="Expiracion Sancion">
					<template #body="{data}">
						{{formatDate(Date(data.sanction_expiration))}}
					</template>
				</Column>
            </DataTable>
			
			<template #footer>
				<Button label="Ok" icon="pi pi-times" @click="$store.state.borrowerDetailsModalStatus = false" class="p-button-text"/>
			</template>
		</Dialog>
	</div>
</template>

<script>               //optional for row
import ApiService from '../services/ApiService';
import {FilterMatchMode,FilterOperator} from 'primevue/api';

export default {
    data() {
        return {
			solvencies: [],
            customers: null,
            selectedCustomers: null,
			apiService: null,
			selected_borrower: null,
            filters: {
                'global': {value: null, matchMode: FilterMatchMode.CONTAINS},
                'name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'country.name': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
                'representative': {value: null, matchMode: FilterMatchMode.IN},
                'date': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.DATE_IS}]},
                'balance': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                'status': {operator: FilterOperator.OR, constraints: [{value: null, matchMode: FilterMatchMode.EQUALS}]},
                'activity': {value: null, matchMode: FilterMatchMode.BETWEEN},
                'verified': {value: null, matchMode: FilterMatchMode.EQUALS}
            },
            loading: true,
            representatives: [
                {name: "Amy Elsner", image: 'amyelsner.png'},
                {name: "Anna Fali", image: 'annafali.png'},
                {name: "Asiya Javayant", image: 'asiyajavayant.png'},
                {name: "Bernardo Dominic", image: 'bernardodominic.png'},
                {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
                {name: "Ioni Bowcher", image: 'ionibowcher.png'},
                {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
                {name: "Onyama Limba", image: 'onyamalimba.png'},
                {name: "Stephen Shaw", image: 'stephenshaw.png'},
                {name: "XuXue Feng", image: 'xuxuefeng.png'}
            ],
            statuses: [
                'unqualified', 'qualified', 'new', 'negotiation', 'renewal', 'proposal'
            ]
        }
    },
    created() {
        this.apiService = new ApiService();
    },
    async mounted() {		
        const response = await this.apiService.getWithToken('solvencies')

		this.solvencies = response
		console.log(this.solvencies);

		this.solvencies.forEach(el => el.requested_at = new Date(el.requested_at));
		this.loading = false;
    },
    methods: {
        formatDate(value) {
            return new Date(value).toLocaleDateString('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });
        },
        formatCurrency(value) {
            return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
        },
		getRandomArbitrary(min, max) {
			return (Math.random() * (max - min) + min).toFixed(0);
		},
		getRandomLetter(name) {
			let letters = name.split(' ');

			return `${letters[0].charAt(0)}${letters[1].charAt(0)}`;
		},
		exportCSV() {
            this.$refs.dt.exportCSV();
        },

		async showDetails(data) {
			const response = await this.apiService.getWithToken('borrower/' + data + '?withBorrows=true&withSanction=true')

			this.selected_borrower = response
			console.log(this.selected_borrower);

			this.$store.commit('changeBorrowerDetailsModalStatus', true)
		},

		downloadPDF(id){
			let routeData = this.$router.resolve({name: 'admin.pdf', params: {id: id}});
			window.open(routeData.href, '_blank');
		}
    }
}
</script>

<style lang="scss" scoped>
::v-deep(.p-paginator) {
    .p-paginator-current {
        margin-left: auto;
    }
}

::v-deep(.p-progressbar) {
    height: .5rem;
    background-color: #D8DADC;

    .p-progressbar-value {
        background-color: #607D8B;
    }
}

::v-deep(.p-datepicker) {
    min-width: 25rem;

    td {
        font-weight: 400;
    }
}

::v-deep(.p-datatable.p-datatable-customers) {
    .p-datatable-header {
        padding: 1rem;
        text-align: left;
        font-size: 1.5rem;
    }

    .p-paginator {
        padding: 1rem;
    }

    .p-datatable-thead > tr > th {
        text-align: left;
    }

    .p-datatable-tbody > tr > td {
        cursor: auto;
    }

    .p-dropdown-label:not(.p-placeholder) {
        text-transform: uppercase;
    }
}
</style>