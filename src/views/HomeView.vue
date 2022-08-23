<script setup>
import { ref } from "vue"
import MapView from "../components/MapView.vue"
let currentView = ref("area_p_19")
const dataViews = {
	area_p_19: { label: "Sidewalk area at 7pm" },
	area_p_12: { label: "Sidewalk area at 12pm" },
}
</script>

<template>
	<el-container>
		<el-header class="main-header"
			><h1>Permit Request for Filming in Public Spaces</h1></el-header
		>
		<el-main class="main-content">
			<article class="selector">
				<h2>
					State resolution regarding the use of public space for film production
					activities
				</h2>
				<p>
					When submiting your Permit Request, available sidewalk area must be
					taken into account.
				</p>
				<p></p>
				<p>Currently displaying: {{ dataViews[currentView].label }}</p>
				<el-button @click="currentView = 'area_p_12'" type="primary"
					>See area_p_12</el-button
				>
			</article>
			<MapView :dataField="currentView" />
		</el-main>
	</el-container>
</template>

<style lang="scss" scoped>
body {
	height: 100vh;
	width: 100%;
}
.main-header {
	background: #80ed99;
	padding: 1rem;
	border-radius: 0.5rem;
	display: flex;
	justify-content: center;
	align-items: center;
}
.main-content {
	position: relative;
	.selector {
		position: absolute;
		top: 2rem;
		left: 2rem;
		width: 30%;
		z-index: 9;
		background: white;
		border-radius: 0.5rem;
	}
}
</style>
