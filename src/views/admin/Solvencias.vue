<template>
	<div class="relative">
		<Toast />
        <ConfirmDialog></ConfirmDialog>

		<div class="" style="height: 60px;">
            <NavBar :title="Solvencias" />
        </div>

		<div class="overflow-auto px-3 mt-5" style="max-width: 1478px; margin: 0 auto;">
			<resume-cards />

			<div class="card mt-8">
				<tabla-solvencias />
			</div>

			<div class="grid">
				<div class="col">
					<div class="card">
						<h3>Solvencias por mes</h3>
						<Chart type="line" :data="basicData" :options="basicOptions" />
					</div>
				</div>
				<div class="col">
					<div class="card">
						<h3>Solvencias por estado</h3>
						<Chart type="pie"  :data="chartData" :options="lightOptions" />
					</div>					
				</div>
			</div>			
        </div>
	</div>
</template>

<script>
import NavBar from "../../components/NavBar.vue";
import Chart from 'primevue/chart'
import TablaSolvencias from '@/components/TablaSolvencias.vue';
import ResumeCards from '@/components/ResumeCards.vue';
import ApiService from '@/services/ApiService';

export default {
	components: {
        NavBar,
		Chart,
		TablaSolvencias,
		ResumeCards,
    },
	data(){
		return {
			basicData: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio'],
                datasets: [
                    {
                        label: 'Solicitadas',
                        backgroundColor: 'rgba(255, 205, 41, 0.2)',
                        data: [65, 59, 80, 81, 56, 55, 40],
						cubicInterpolationMode: 'monotone',
						borderColor: '#ffcd29',
						pointRadius: 7,
						pointHoverRadius: 12,
						tension: 0.6
                    },
                ]
            },
			basicOptions: {
				responsive: true,
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        },
						easing: 'linear',
                    },
                    y: {
                        ticks: {
                            color: '#495057'
                        },
                        grid: {
                            color: '#ebedef'
                        },
						easing: 'linear',
                    }
                }
            },
			chartData: {
                labels: ['Solicitadas','Entregadas','Pendientes'],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: ["#FFA726", "#3b87f7","#a855f7",],
                        hoverBackgroundColor: ["#FFA726","#3b87f7","#a855f7"]
                    }
                ]
            },
            lightOptions: {
                plugins: {
                    legend: {
                        labels: {
                            color: '#495057'
                        }
                    }
                }
            },
		}
	},
	ApiService: null,
	created() {
		this.ApiService = new ApiService();
	},
	async mounted() {
		const response = await this.ApiService.getWithToken('user/me');
		const statistics = await this.ApiService.getWithToken('statistics/solvencies');

		this.$store.state.user = response;
		this.$store.state.statistics = statistics;		
	},
	watch: {
        '$store.state.statistics': function () {
            if (this.$store.state.statistics != undefined) {
                const labels = Object.keys(this.$store.state.statistics.total_per_month);
				const solicitadas = Object.values(this.$store.state.statistics.total_per_month);

				const total_solicitadas = this.$store.state.statistics.total_requested
				const pendientes = this.$store.state.statistics.pending_to_delivery
				const entregadas = this.$store.state.statistics.solvencies_delivered

				this.basicData.labels = labels;
				this.basicData.datasets[0].data = solicitadas;



				this.chartData.datasets[0].data = [total_solicitadas, entregadas, pendientes];
            }
        },
    },
}
</script>