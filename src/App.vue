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
.cursor {
  cursor: pointer;
}

/* Efecto poster peliculas */
.poster-zoom {
  transition: transform 0.2s;
  transform: scale(0.9);
  border-radius: 20px;
}

.poster-zoom:hover {
  transform: scale(1);
}

/* Botones Primarios */
.btn-primary {
  background-color: #1687a7;
  border: none;
  font-weight: bold;
}

.btn-primary:hover {
  background-color: #276678;
}

input, button {
  border-radius: 20px !important;
}

input:focus {
  box-shadow: none !important;
  border: solid 1px #1687a7 !important;
}
</style>
