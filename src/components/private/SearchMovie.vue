<template>
  <section id="section-searcher">
    <div class="container">
      <div class="card mb-4 border-0">
        <div class="card-header text-center border-0">
          <h3>
            Buscador Peliculas
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
          </h3>
        </div>
        <div class="card-body">
          <input
            type="text"
            v-model="inputSearch"
            v-on:keyup="delayKeyUp(1000)"
            placeholder="Ingrese nombre de pelicula o serie a buscar"
            class="form-control"
          />
          <paginate ref="paginator" name="movies" :list="movies" :per="4">
            <div class="row mt-2">
              <div
                class="col-md-3 mt-2 cursor"
                v-for="item in paginated('movies')"
                :key="item.imdbID"
              >
                <img
                  class="img-result-filter poster-zoom"
                  :src="item.Poster | detectImage"
                  width="100%"
                  @click="$router.push({ path: `/movieDetail/${item.imdbID}` })"
                />
                <p class="text-center">
                  <b>{{ item.Title }}</b>
                </p>
              </div>

              <div v-show="noResults" class="alert alert-success" role="alert">
                <h4 class="alert-heading">No se han encontrado resultados</h4>
                <p>
                  Puede que el nombre este mal escrito o no exista en nustra
                  base de datos
                </p>
                <hr />
                <p class="mb-0">
                  Prueba buscando otra pelicula o comprueba que lo hayas escrito
                  bien
                </p>
              </div>
            </div>
          </paginate>
          <paginate-links
            class="mt-4 d-flex justify-content-center"
            v-if="movies.length > 0"
            for="movies"
            :limit="50"
            :show-step-links="true"
            :classes="{ ul: 'pagination', li: 'page-item', a: 'page-link' }"
          ></paginate-links>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      inputSearch: "",
      noResults: false,
      movies: [],
      paginate: ["movies"],
      loading: false,
    };
  },
  methods: {
    submitSearch() {
      this.noResults = false;
      // Se condiciona el numero de caracteres ingresados para realizar una busqueda
      axios
        .get(`http://www.omdbapi.com/?apikey=12a4becc&s=${this.inputSearch}`)
        .then((res) => {
          // Se pregunta si existen datos en la respuesta para no generar conflicto con el paginador
          if (res.data.Search) {
            this.movies = res.data.Search;
          } else {
            this.movies = [];
            this.noResults = true;
          }

          // Bajar automaticamente al encontrar respuesta del servidor (set time out para evitar que quede a mitad del div al no estar generado a tiempo)
          setTimeout(() => {
            window.scrollTo(0, document.body.scrollHeight);
          }, 250);
        })
        .catch((error) => {
          Swal.fire("error", "Ha ocurrido un error en la busqueda", "error");
          this.noResults = true;
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          // Arreglar bug del paginador al momento de limpiar el array movies
          if (this.$refs.paginator) {
            this.$refs.paginator.goToPage(1);
          }
        });
    },
    // Función necesaria para el paginador
    updateResource(data) {
      this.movies = data;
    },
    // Delay al keyup para no realizar demasiadas peticiones con cada key up
    delayKeyUp(ms) {
      this.loading = true;

      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.submitSearch();
      }, ms);
    },
  },
};
</script>

<style>

/* Arreglo a la etiqueta paginate que trae un padding por defecto */
ul{
      padding-inline-start: 0px;
}

/* Diseño adicional del paginador */
.paginate-links li {
  cursor: pointer;
}

.img-result-filter {
  height: 80%;
}

/* Diseño mensaje alerta not found movies */
.alert {
  border-radius: 20px;
  background-color: #1687a7;
  color: white;
}
</style>