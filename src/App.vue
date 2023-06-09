<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');
* {
  box-sizing: border-box;
}

:root {
  --anaranjado: #ed6c10;
  --anaranjadoHover: #b65821;
  --azulfuerte: #041e41;
  --celestemedio: #62aaa7;
  --azulbajo: #052850;
  --celestefuerte: #018093;
  --white: #ffffff;
  --fondoBG: #f8f4fc;
}

body {
  font-family: 'Poppins', sans-serif;
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Poppins', sans-serif;
  color: #2c3e50;
}

main {
  height: 100%;
  width: 100%;
  display: flex;
}

</style>
