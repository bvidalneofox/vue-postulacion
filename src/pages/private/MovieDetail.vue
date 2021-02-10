<template>
  <div>
    <!-- Componente navbar -->
    <Navbar />

    <div class="container movie-details">
      <div v-if="loading" class="row">
        <div class="col-12 text-center">
          <p class="h2 fw-bold">Cargando... <i class="fas fa-spinner fa-spin"></i></p>
        </div>
      </div>
      <div v-if="!loading" class="row">
        <div class="col-md-6 text-center">
          <img
            class="img-detail"
            :src="movie.Poster | detectImage"
            alt="Movie Cover"
          />
        </div>
        <div class="col-md-6">
          <h1 class="fw-bold">{{ movie.Title }}</h1>
          <p class="text-muted">{{ movie.Year }}</p>
          <p>{{ movie.Plot }}</p>
          <p><b class="text-muted">Director: </b>{{ movie.Director }}</p>
          <p><b class="text-muted">Género: </b>{{ movie.Genre }}</p>
          <p><b class="text-muted">Actores: </b>{{ movie.Actors }}</p>
          <div class="d-grid mb-auto">
            <button class="btn btn-primary btn-volver" @click="$router.push('/home')">
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Navbar from "../../components/private/Navbar";

export default {
  components: {
    Navbar,
  },
  data() {
    return {
      movie: {},
      loading: false
    };
  },
  mounted() {
    this.getMovieById(this.$route.params.id);
  },
  methods: {
    getMovieById(id) {
      this.loading = true;
      axios
        .get(`http://www.omdbapi.com/?apikey=12a4becc&i=${id}`)
        .then((res) => {
          this.movie = res.data;
          console.log(this.movie);
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
};
</script>

<style>
/* Margen para no ser tapado por navbar fixed */
.movie-details {
  margin-top: 6rem;
}

.img-detail {
  border-radius: 20px;
}
</style>