<template>
  <div>
    <!-- Componente navbar -->
    <Navbar />

    <div class="container movie-details">
      <div class="row">
        <div class="col-6 text-center">
          <img
            :src="movie.Poster | detectImage"
            alt="Movie Cover"
          />
        </div>
        <div class="col-6">
          <p><b>Título: </b>{{movie.Title}}</p>
          <p><b>Año: </b>{{movie.Year}}</p>
          <p><b>Género: </b>{{movie.genre}}</p>
          <p><b>Lenguaje: </b>{{movie.Language}}</p>
          <p><b>Actores: </b>{{movie.Actors}}</p>
          <p><b>País: </b>{{movie.Country}}</p>
        </div>
      </div>
      <button class="btn btn-primary"  @click="$router.push('/home')">Volver</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from 'sweetalert2'
import Navbar from "../../components/private/Navbar";

export default {
  components: {
    Navbar
  },
  data() {
    return {
      movie: {}
    };
  },
  mounted() {
    this.getMovieById(this.$route.params.id);
  },
  methods: {
    getMovieById(id) {
        axios
        .get(`http://www.omdbapi.com/?apikey=12a4becc&i=${id}`)
        .then((res) => {
          this.movie = res.data;
          console.log(this.movie);
        })
        .catch((error) => {
          Swal.fire("error", "Ha ocurrido un error en la busqueda", "error");
          console.log(error);
        })
        .finally(() => {
        });
    }
  },
};
</script>

<style>
/* Margen para no ser tapado por navbar fixed */
.movie-details{
  margin-top: 6rem;
}
</style>