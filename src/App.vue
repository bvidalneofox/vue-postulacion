<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
/* Arreglos del modal para backdrop */
.modal {
  background-color: rgba(0, 0, 0, 0.425);
}

.modal-open {
  overflow: inherit;
}

/* Cursor para elementos */
.cursor{
  cursor: pointer;
}

/* Efecto poster peliculas */
.poster-zoom {
  transition: transform .2s;
  transform: scale(0.9);
}

.poster-zoom:hover {
  transform: scale(1); 
}

</style>
