<template>
    <router-view></router-view>
</template>

<script>
export default {
	async beforeMount() {
		if (localStorage.getItem('token') == null || localStorage.getItem('token') == 'undefined') {
			console.log(window.location.pathname);
			if (window.location.pathname != '/admin/login' && window.location.pathname != '/' && window.location.pathname != '') {
				window.location.replace('/admin/login')
				return
			}

			
		}
	},
}
</script>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 0px;
	overflow: hidden;
}
body{
	margin: 0;
}
.card {
    background-color: var(--surface-card);
    padding: 1.5rem;
    color: var(--surface-900);
    margin-bottom: 1rem;
    border-radius: 12px;
    box-shadow: 0 3px 5px rgba(0,0,0,.02),0 0 2px rgba(0,0,0,.05),0 1px 4px rgba(0,0,0,.08)!important;
}
</style>
