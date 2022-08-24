<template>
  <el-container>
    <el-header class="main-header">
      <h1>City Authority Permits for Filming in Public Spaces</h1>
      <nav class="main-menu">
        <el-button-group>
          <el-button :type="$route.path === '/' ? 'primary' : null" round plain @click="$router.push('/')">Request Permit</el-button>
          <el-button :type="$route.path === '/submissions' ? 'primary' : null" round plain @click="$router.push('/submissions')">View Permit Submissions</el-button>
        </el-button-group>
      </nav>
    </el-header>

    <router-view />
  </el-container>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.main-header {
  background: #80ed99;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
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
}
</style>
