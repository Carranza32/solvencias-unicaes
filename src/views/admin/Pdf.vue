<template>
 <div class="App container mt-5">

 	<BlockUI :blocked="true" :fullScreen="true"></BlockUI>
     
    <div id="divToPrint">
        <h5>UNIVERSIDAD CATÓLICA DE EL SALVADOR</h5>
        <h6>Biblioteca Miguel de Cervantes</h6>
		<!-- <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/UNICAES_Logo.png/588px-UNICAES_Logo.png" height="60" alt=""> -->
		<hr>
		<br>
		<h6 class="text-center">SOLVENCIA</h6>
		<br>

		<p>Por medio de la presente se hace constar que:</p>
		<br>

		<!-- Nombre de la persona -->
		<h6>{{ solvencia?.borrower?.first_name }} {{ solvencia?.borrower?.last_name }}</h6>
		<br>

		<p>con el carnet de estudiante: <strong>{{ solvencia?.borrower?.carnet_code }}</strong></p>
		<br>
		<p>y de la carrera: <strong>{{ solvencia?.borrower?.faculty }}</strong></p>
		<br>
		<p v-if="solvencia?.pending_books?.total == 0 && solvencia?.active_sanctions?.total == 0">está solvente con la Biblioteca de esta Universidad, hasta la presente fecha.</p>
		<p v-else>está con prestamos pendientes</p>
		<br>

		<p>Santa Ana, {{ solvencia?.date }}</p>
		<br>

		<strong>Msc. Celina del Rosario Baires</strong><br>
		<strong>Directora de la Biblioteca Miguel de Cervantes</strong>
	</div>
</div>    
</template>

<script>
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import ApiService from '@/services/ApiService';

export default {
	data() {
		return {
			solvencia: null,
		}
	},
	ApiService: null,
	async created() {
		this.ApiService = new ApiService();
		
	},
	async mounted() {
		const response = await this.ApiService.getWithToken('solvencies/'+ this.$route.params.id);

		this.solvencia = response
		console.log(this.solvencia);
	},

	watch: {
        'solvencia': function () {
            if (this.solvencia != null) {
				setTimeout(() => {
					this.printDocument(this.solvencia?.borrower?.first_name)
				}, 1000)
            }
        },
    },

	methods: {		
       printDocument(nombre = '') {	
			//get table html
			const pdfTable = document.getElementById('divToPrint');
			//html to pdf format
			var html = htmlToPdfmake(pdfTable.innerHTML);
			
			const documentDefinition = {content: html};

			pdfMake.vfs = pdfFonts.pdfMake.vfs;
			pdfMake.createPdf(documentDefinition).download(`solvencia_${nombre}.pdf`);
			
			setTimeout(() => {
				window.close()
			}, 1000)
		}
	}
}
</script>