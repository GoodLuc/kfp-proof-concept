<script setup>
import { onMounted, ref, defineProps, watch } from "vue"
import Map from "@arcgis/core/Map"
import SceneView from "@arcgis/core/views/SceneView"
import esriConfig from "@arcgis/core/config"
import FeatureLayer from "@arcgis/core/layers/FeatureLayer"
import LineSymbol3D from "@arcgis/core/symbols/LineSymbol3D"
import PathSymbol3DLayer from "@arcgis/core/symbols/PathSymbol3DLayer"
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer"

const props = defineProps({
	dataField: {
		type: String,
		required: false,
		default: "area_p_19",
	},
	mapStyle: {
		type: String,
		required: false,
		default: "arcgis-dark-gray",
	},
})

esriConfig.apiKey =
	"AAPK874f9a5243c44c5f901ef20d4fb33b78IwDIbNkuHGvnYIUtc9i85A1lyJ-xbxoeRGHzwwsCvc_6VJPdIPSQfQLfwKhlxB-t"

onMounted(() => {
	const map = new Map({
		basemap: props.mapStyle, //Basemap layer service
		ground: "world-elevation",
	})

	const view = new SceneView({
		map: map,
		//center: [-74.006, 40.7128], // Longitude, latitude
		//zoom: 23, // Zoom level
		camera: {
			position: {
				x: -73.92999959392118,
				y: 40.747037420327885,
				z: 2000, // meters
			},
			tilt: 45,
		},

		qualityProfile: "high",
		environment: {
			lighting: {
				directShadowsEnabled: true,
				ambientOcclusionEnabled: true,
			},
			atmosphere: {
				quality: "high",
			},
		},

		container: "mapContainer", // Div element
	})

	const trailsRenderer = new SimpleRenderer({
		symbol: new LineSymbol3D({
			symbolLayers: [
				new PathSymbol3DLayer({
					profile: "quad",
					material: {
						color: [46, 255, 238],
					},
					width: 5,
					height: 7,
					join: "miter",
					cap: "round",
					anchor: "bottom",
					profileRotation: "all",
				}),
			],
		}),

		visualVariables: [
			{
				type: "color",
				field: props.dataField,
				stops: [
					{ value: 50, color: "#eb4034" },
					{ value: 2000, color: "#34eb71" },
				],
				legendOptions: {
					title: "Available sidewalk area",
				},
			},
		],
	})

	const transitLayer = new FeatureLayer({
		url: "https://services2.arcgis.com/jncy3eo3WNLeJkJB/arcgis/rest/services/modnyc_covid_sidewalk_density_wgs84/FeatureServer/0",
		//url: "https://services2.arcgis.com/jncy3eo3WNLeJkJB/arcgis/rest/services/nyc_covid_sidewalk_density_wgs84/FeatureServer/0",
		opacity: 0.75,
		renderer: trailsRenderer,
		elevation: 10,
	})
	map.add(transitLayer, 0)

	transitLayer.when().then(() => {
		const renderer = transitLayer.renderer.clone()
		renderer.visualVariables = [
			{
				type: "color",
				field: props.dataField,
				stops: [
					{ value: 50, color: "#eb4034" },
					{ value: 2000, color: "#34eb71" },
				],
				legendOptions: {
					title: "Available sidewalk area",
				},
			},
		]
		transitLayer.renderer = renderer
	})

	watch(
		() => props.dataField,
		() => {
			console.log("props changed")
			const renderer = transitLayer.renderer.clone()
			renderer.visualVariables = [
				{
					type: "color",
					field: props.dataField,
					stops: [
						{ value: 50, color: "#eb4034" },
						{ value: 2000, color: "#34eb71" },
					],
					legendOptions: {
						title: "Available sidewalk area",
					},
				},
			]
			transitLayer.renderer = renderer
		}
	)
})
</script>

<template>
	<div class="home">
		<div id="mapContainer" ref="mapContainer"></div>
	</div>
</template>

<style lang="scss" scoped>
@import "@arcgis/core/assets/esri/themes/dark/main.css";
body {
	height: 100vh;
	width: 100%;
}
#mapContainer {
	width: 100%;
	height: 100%;
	min-height: 100vh;
}
</style>
