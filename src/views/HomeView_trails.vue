<script setup>
import { onMounted, ref } from "vue";
//import ArcGISMap from "@arcgis/core/WebMap";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import SceneView from "@arcgis/core/views/SceneView";
import esriConfig from "@arcgis/core/config";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import Graphic from "@arcgis/core/Graphic";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import UniqueValueRenderer from "@arcgis/core/renderers/UniqueValueRenderer";
import ColorVariable from "@arcgis/core/renderers/visualVariables/ColorVariable";
import HeatmapRenderer from "@arcgis/core/renderers/HeatmapRenderer";

onMounted(() => {
  esriConfig.apiKey = "AAPK874f9a5243c44c5f901ef20d4fb33b78IwDIbNkuHGvnYIUtc9i85A1lyJ-xbxoeRGHzwwsCvc_6VJPdIPSQfQLfwKhlxB-t";

  const map = new Map({
    basemap: "arcgis-topographic", //Basemap layer service
    ground: "world-elevation",
  });

  const view = new SceneView({
    map: map,
    //center: [-74.006, 40.7128], // Longitude, latitude
    //zoom: 23, // Zoom level
    camera: {
      position: {
        x: -73.745960445516843,
        y: 40.776544700609463,
        z: 2000, // meters
      },
      tilt: 75,
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
  });

  const trailsRenderer = {
    type: "simple",
    symbol: {
      color: "#BA55D3",
      type: "simple-line",
      style: "solid",
    },

    visualVariables: [
      {
        type: "color",
        field: "area_p_19",
        stops: [
          { value: 50, color: "#00FF00" },
          { value: 2000, color: "#FF0000" },
        ],
        legendOptions: {
          title: "Available sidewalk area",
        },
      },
    ],
  };

  const transitLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/jncy3eo3WNLeJkJB/arcgis/rest/services/modnyc_covid_sidewalk_density_wgs84/FeatureServer/0",
    //url: "https://services2.arcgis.com/jncy3eo3WNLeJkJB/arcgis/rest/services/nyc_covid_sidewalk_density_wgs84/FeatureServer/0",
    opacity: 0.75,
    renderer: trailsRenderer,
    elevation: 10,
  });
  map.add(transitLayer, 0);
});
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
