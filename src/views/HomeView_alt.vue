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
import ClassBreaksRenderer from "@arcgis/core/renderers/ClassBreaksRenderer";
import SimpleLineSymbol from "@arcgis/core/symbols/SimpleLineSymbol";
import SimpleRenderer from "@arcgis/core/renderers/SimpleRenderer";

onMounted(() => {
  esriConfig.apiKey = "AAPK874f9a5243c44c5f901ef20d4fb33b78IwDIbNkuHGvnYIUtc9i85A1lyJ-xbxoeRGHzwwsCvc_6VJPdIPSQfQLfwKhlxB-t";

  const map = new Map({
    basemap: "arcgis-dark-gray", //Basemap layer service
    ground: "world-elevation",
  });

  const view = new SceneView({
    map: map,
    center: [-74.006, 40.7128], // Longitude, latitude
    zoom: 12, // Zoom level
    container: "mapContainer", // Div element
  });

  function createSymbol(color) {
    return {
      type: "simple-fill",
      color,
      style: "solid",
      outline: {
        width: 0.2,
        color: [255, 255, 255, 0.2],
      },
    };
  }

  const renderer = new ClassBreaksRenderer({
    field: "area_p_19",
    normalizationField: "area",
    legendOptions: {
      title: "Available sidewalk area",
    },
    defaultSymbol: {
      type: "simple-fill",
      color: "black",
      style: "backward-diagonal",
      outline: {
        width: 0.5,
        color: [50, 50, 50, 0.6],
      },
    },
    defaultLabel: "no data",
    classBreakInfos: [
      {
        minValue: 50,
        maxValue: 1500,
        symbol: createSymbol("#edf8fb"),
        label: "< 5%",
      },
      {
        minValue: 1501,
        maxValue: 5000,
        symbol: createSymbol("#88419d"),
        label: "> 25%",
      },
    ],
  });

  renderer.visualVariables = [
    {
      type: "size",
      valueExpression: "$view.scale",
      target: "outline",
      stops: [
        { size: 2, value: 56187 },
        { size: 1, value: 175583 },
        { size: 0.5, value: 702332 },
        { size: 0, value: 1404664 },
      ],
    },
  ];

  const transitLayer = new FeatureLayer({
    url: "https://services2.arcgis.com/jncy3eo3WNLeJkJB/arcgis/rest/services/modnyc_covid_sidewalk_density_wgs84/FeatureServer/0",
    renderer: renderer,
    opacity: 1,
    effect: "bloom(8.6, 1px, 5%)",
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
