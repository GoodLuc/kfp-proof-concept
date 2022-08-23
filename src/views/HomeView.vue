<script setup>
import MapView from "../components/MapView.vue";
</script>

<template>
  <el-container>
    <el-header class="main-header"><h1>Permit Request for Filming in Public Spaces</h1></el-header>
    <el-main>
      <article>
        <h2>State resolution regarding the use of public space for film production activities</h2>
        <p>When submiting your Permit Request, available sidewalk area must be taken into account.</p>
        <p></p>
      </article>
    </el-main>
  </el-container>
  <el-button type="primary">Primary</el-button>
  <!--  <MapView /> -->
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
</style>
