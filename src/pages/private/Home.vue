<template>
  <div>
    <!-- Componente navbar -->
    <Navbar />

    <section class="section-carousel">
      <div class="container" style="padding-top: 5rem">
        <!-- Carrusel -->
        <!-- Se crea un condicional para renderizar el componente carousel unicamente cuando la variables movies ya ha recibido datos en la peticion -->
        <div v-if="movies.length > 0">
          <carousel
            :autoplay="true"
            :items="4"
            :margin="20"
            :loop="true"
            :mouseDrag="false"
            :autoHeight="true"
          >
            <img
              class="images poster-zoom"
              v-for="item in movies"
              :key="item.imdbID"
              :src="item.Poster"
              @click="$router.push({ path: `/movieDetail/${item.imdbID}` })"
            />
          </carousel>
        </div>
      </div>
    </section>

    <div class="mt-4">
      <SearchMovie />
    </div>
  </div>
</template>

<script>
import Navbar from "../../components/private/Navbar";
import SearchMovie from "../../components/private/SearchMovie";
import carousel from "vue-owl-carousel2";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Home",
  components: {
    Navbar,
    SearchMovie,
    carousel,
  },
  data() {
    return {
      movies: [],
    };
  },
  mounted() {
    this.getRecomendados();
  },
  methods: {
    getRecomendados() {
      axios
        .get(`http://www.omdbapi.com/?apikey=12a4becc&s=jason`)
        .then((res) => {
          this.movies = res.data.Search;
          console.log(this.movies);
        })
        .catch((error) => {
          Swal.fire("error", "Ha ocurrido un error en la busqueda", "error");
          console.log(error);
        })
        .finally(() => {});
    },
  },
};
</script>

<style>
/* Arreglos para las imagenes en owl carousel del mismo tamaño */

.owl-carousel .owl-stage {
  display: flex;
  /* height: 18rem; */
}

.owl-carousel .owl-item img {
  width: 100%;
  height: 100%;
}

.section-carousel {
  background-color: #f6f5f5;
}

/* Cambio de texto y diseño en botones owl carousel */
.owl-prev {
  visibility: hidden;
  position: relative;
}
.owl-prev:after {
  display: inline-block;
  background: #1687a7;
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  visibility: visible;
  content: "Anterior";
}

.owl-next {
  visibility: hidden;
  position: relative;
}
.owl-next:after {
  display: inline-block;
  background: #1687a7;
  border-radius: 4px;
  color: #fff;
  padding: 8px 12px;
  visibility: visible;
  content: "Siguiente";
}
</style>