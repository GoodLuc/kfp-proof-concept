<script setup>
import { ref } from "vue"
import MapView from "../components/MapView.vue"

let currentView = ref("area_p_9")
let requestStreet = ref("")
let requestEmail = ref("")

const dataViews = {
	area_p_9: { label: "Sidewalk area at 9am" },
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
					When submiting your Permit Request, sidewalk availability must be
					taken into account. This is based on the busyness of a given street
					during different times of the day.
				</p>

				<p>
					Use the map widget to visualize available street space based on time
					of day.
				</p>

				<p>
					Only <strong>green designated</strong> street areas will be approved.
				</p>

				<div class="controller">
					<p>Time of day:</p>
					<div>
						<el-button
							:type="currentView === 'area_p_9' ? 'primary' : null"
							@click="
								currentView !== 'area_p_9' ? (currentView = 'area_p_9') : null
							"
							plain
							>9 am</el-button
						>
						<el-button
							:type="currentView === 'area_p_12' ? 'primary' : null"
							@click="
								currentView !== 'area_p_12' ? (currentView = 'area_p_12') : null
							"
							plain
							>12 pm</el-button
						>
						<el-button
							:type="currentView === 'area_p_19' ? 'primary' : null"
							@click="
								currentView !== 'area_p_19' ? (currentView = 'area_p_19') : null
							"
							plain
							>7 pm</el-button
						>
					</div>
				</div>

				<div class="controller">
					<p>Requested street:</p>
					<el-input
						v-model="requestStreet"
						placeholder="Name street and define intersections"
					/>
				</div>

				<div class="controller">
					<p>Your email:</p>
					<el-input v-model="requestEmail" placeholder="yourname@example.com" />
				</div>

				<el-button type="primary">Submit request</el-button>

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
		background: #f2f2f2;
		border-radius: 0.5rem;
		padding: 2rem;
		.controller {
			background: white;
			padding: 1rem;
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
	}
}
</style>
