<template>
  <div>
    <!-- Formulario Inicio Sesión e imagenes -->
    <div class="container vertical-center">
      <div class="row">
        <div class="col-md-6">
          <img
            class="poster-zoom"
            src="@/assets/login-1.jpg"
            width="100%"
          />
          <form id="form-login" @submit.prevent="submitLogin()">
            <input
              type="text"
              placeholder="E-mail"
              class="form-control mt-2"
              v-model="form.email"
            />
            <input
              type="password"
              placeholder="Contraseña"
              class="form-control mt-2"
              v-model="form.password"
            />
            <div class="d-grid mt-2">
              <button
                type="submit"
                class="btn btn-primary button-login"
                :disabled="loading"
              >
                <span v-if="!loading">Iniciar Sesión</span>
                <span v-if="loading">Cargando</span>
                <i v-if="loading" class="fas fa-spinner fa-spin"></i>
              </button>
            </div>
          </form>
          <p class="mt-2 text-center">
            ¿No tienes cuenta?
            <a
              class="link-modal cursor"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
              data-bs-backdrop="false"
              >Registrate aquí</a
            >
          </p>
        </div>
        <div class="col-md-6">
          <img
            class="poster-zoom"
            src="@/assets/login-2.png"
            width="100%"
          />
        </div>
      </div>
    </div>

    <!-- Modal de Registro -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header text-center">
            <h5 class="modal-title w-100" id="exampleModalLabel">
              Registrarse
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form v-on:submit.prevent="submitRegister">
              <input
                type="text"
                placeholder="E-mail"
                class="form-control"
                v-model="form.email"
              />
              <input
                type="password"
                placeholder="Contraseña"
                class="form-control mt-2"
                v-model="form.password"
              />
              <hr />
              <div class="d-grid">
                <button type="submit" class="btn btn-success">
                  Crear Cuenta
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Login",
  data() {
    return {
      // Loading para bloquear el boton de logina al hacer click y mostrar animacion
      loading: false,
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    // Peticiones Axios a la Api
    submitLogin() {
      this.loading = true;

      axios
        .post("https://reqres.in/api/login", this.form)
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          Swal.fire("error", "Credenciales incorrectas", "error");
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    submitRegister() {
      axios
        .post("https://reqres.in/api/register", this.form)
        .then((res) => {
          //Perform Success Action
          Swal.fire(
            "OK!",
            "Cuenta creada correctamente, se redirigira a la pantalla de inicio",
            "success"
          );
          localStorage.setItem("token", res.data.token);
          this.$router.push({ path: "home" });
        })
        .catch((error) => {
          // error.response.status Check status code
          console.log(error);
        })
        .finally(() => {
          //Perform action in always
        });
    },
  },
};
</script>

<style>
.vertical-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal-content{
  border-radius: 20px;
}
</style>