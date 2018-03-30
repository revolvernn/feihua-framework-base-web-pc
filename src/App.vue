<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
  export default {
    name: 'app'
  }
</script>
<style>
  html,body,#app{
    height:100%;
    margin: 0;
    padding: 0;
  }
  html {
    font-size: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
</style>
