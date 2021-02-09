<template>
  <div class="card mb-4">
    <!-- <img src="@/assets/no-image.png" alt=""> -->
    <div class="card-header text-center">
      <h3>Buscador Peliculas</h3>
    </div>
    <div class="card-body">
      <input
        type="text"
        v-model="inputSearch"
        v-on:keyup="submitSearch"
        placeholder="Ingrese nombre de pelicula o serie a buscar"
        class="form-control"
      />
      <paginate ref="paginator" name="movies" :list="movies" :per="4">
        <div class="row mt-2">
          <div
            class="col-3 mt-2 cursor"
            v-for="item in paginated('movies')"
            :key="item.imdbID"
          >
            <img class="img-result-filter poster-zoom" :src="item.Poster | detectImage" width="100%" @click="$router.push({ path: `/movieDetail/${item.imdbID}`})"/>
            <p class="text-center">
              <b>{{ item.Title }}</b>
            </p>
          </div>
        </div>
      </paginate>
      <paginate-links class="mt-4" v-if="movies.length>0"
        for="movies"
        :limit="50"
        :show-step-links="true"
      ></paginate-links>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      inputSearch: "",
      movies: [],
      page: 1,
      paginate: ["movies"],
    };
  },
  components: {},
  methods: {
    submitSearch() {
      if (this.inputSearch.length >= 3) {
        axios
          .get(`http://www.omdbapi.com/?apikey=12a4becc&s=${this.inputSearch}`)
          .then((res) => {
            this.movies = res.data.Search;
            console.log(this.movies);
          })
          .catch((error) => {
            Swal.fire("error", "Ha ocurrido un error en la busqueda", "error");
            console.log(error);
          })
          .finally(() => {});
      }
    },
    updateResource(data) {
      this.movies = data;
    },
  },
};
</script>

<style>
.paginate-links {
  width: 100%;
  list-style: none;
  text-align: center;
}
.paginate-links li {
  display: inline;
  background-color: rgb(77, 137, 226);
  color: white;
  padding: 0.5rem;
  margin-left: 0.3rem;
  margin-right: 0.3rem;
  cursor: pointer;
  border-radius: 3px;
}
.paginate-result {
  width: 100%;
  text-align: center;
  margin-bottom: 1rem;
}

.img-result-filter{
  height: 80%;
}
</style>