<template>
	<div class="grid">
		<div class="col-12 lg:col-6 xl:col-4">
			<div class="card shadow-2 mb-0 text-left h-9rem">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Solvencias solicitadas</span>
						<div class="text-900 font-medium text-xl">{{ $store.state.statistics.total_requested }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-yellow-100 border-round" style="width:2.5rem;height:2.5rem;">
						<i class="pi pi-folder text-yellow-500 text-xl"></i>
					</div>
				</div>
				<span class="text-green-500 font-medium ">{{ $store.state.statistics.requested_today }} solicitadas </span>
				<span class="text-500">El dia de hoy</span>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-4">
			<div class="card shadow-2 mb-0 text-left h-9rem">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Solvencias entregadas</span>
						<div class="text-900 font-medium text-xl">{{ $store.state.statistics.solvencies_delivered }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-blue-100 border-round" style="width:2.5rem;height:2.5rem;">
						<i class="pi pi-verified text-blue-500 text-xl"></i>
					</div>
				</div>
			</div>
		</div>
		<div class="col-12 lg:col-6 xl:col-4">
			<div class="card shadow-2 mb-0 text-left h-9rem">
				<div class="flex justify-content-between mb-3">
					<div>
						<span class="block text-500 font-medium mb-3">Solvencias pendientes</span>
						<div class="text-900 font-medium text-xl">{{ $store.state.statistics.pending_to_delivery }}</div>
					</div>
					<div class="flex align-items-center justify-content-center bg-purple-100 border-round" style="width:2.5rem;height:2.5rem;">
						<i class="pi pi-file text-purple-500 text-xl"></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
}
</script>