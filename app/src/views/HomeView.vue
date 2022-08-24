<script setup>
import { ref } from "vue";
import MapView from "../components/MapView.vue";

let currentView = ref("area_p_9");
let requestStreet = ref("");
let requestEmail = ref("");

const dataViews = {
  area_p_9: { label: "Sidewalk area at 9am" },
  area_p_19: { label: "Sidewalk area at 7pm" },
  area_p_12: { label: "Sidewalk area at 12pm" },
};
</script>

<template>
  <el-container>
    <el-header class="main-header">
      <h1>Permit Request for Filming in Public Spaces</h1>
    </el-header>
    <main class="main-content">
      <div class="flex">
        <article class="selector">
          <h2>State resolution regarding the use of public space for film production activities</h2>
          <p>When submiting your Permit Request, sidewalk availability must be taken into account. This is based on the busyness of a given street during different times of the day.</p>
          <p>Use the map widget to visualize available street space based on time of day.</p>
          <div class="controller flex column">
            <div class="flex align-center justify-between">
              <p>Select time of day:</p>
              <div>
                <el-button :type="currentView === 'area_p_9' ? 'primary' : null" @click="currentView !== 'area_p_9' ? (currentView = 'area_p_9') : null" plain>9 am</el-button>
                <el-button :type="currentView === 'area_p_12' ? 'primary' : null" @click="currentView !== 'area_p_12' ? (currentView = 'area_p_12') : null" plain>12 pm</el-button>
                <el-button :type="currentView === 'area_p_19' ? 'primary' : null" @click="currentView !== 'area_p_19' ? (currentView = 'area_p_19') : null" plain>7 pm</el-button>
              </div>
            </div>
            <p>Only <strong>green designated</strong> street areas will be approved.</p>
          </div>
          <div class="controller flex column request">
            <h3>Enter the desired street and your email to submit your permit request</h3>
            <p>Requested street:</p>
            <el-input v-model="requestStreet" placeholder="Name street and define intersections" />
            <p>Your email:</p>
            <el-input v-model="requestEmail" placeholder="yourname@example.com" />
            <el-button size="large" class="submit" type="primary">Submit request</el-button>
          </div>
        </article>
        <MapView :dataField="currentView" />
      </div>
    </main>
  </el-container>
</template>

<style lang="scss">
body {
  height: 100vh;
  width: 100%;
  margin: 0;
}
p,
h1,
h2,
h3 {
  text-align: left;
}

.flex {
  display: flex;
  &.column {
    flex-direction: column;
  }
  &.justify-between {
    justify-content: space-between;
  }
  &.align-center {
    align-items: center;
  }
}

.main-header {
  background: #80ed99;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  figure {
    padding: 0.5rem;
    height: 100%;
    margin: 0;
    box-sizing: border-box;
    img {
      height: 100%;
      width: auto;
    }
  }
}
.main-content {
  position: relative;
  padding: 0;
  background: #3f444d;
  align-items: stretch;
  display: flex;
  > div {
    width: 100%;
  }
  .selector {
    width: 40%;
    min-width: 300px;
    background: #f2f2f2;
    padding: 2rem;
    h2,
    h3 {
      margin-top: 0;
    }
    h3 {
      margin-bottom: 0;
    }
    .controller {
      border-radius: 0.5rem;
      margin-bottom: 2rem;
      background: white;
      padding: 1rem;
    }
    .request p {
      margin-bottom: 0.5rem;
    }
    .submit {
      margin: 1rem 0;
    }
  }
}
</style>
