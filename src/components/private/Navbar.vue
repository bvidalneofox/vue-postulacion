<template>
  <nav class="navbar fixed-top navbar-expand-lg navbar-dark">
    <div class="container">
      <a class="navbar-brand" href="#"
        ><b>{{ $route.name }}</b></a
      >
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fas fa-user-circle fa-lg"></i> Usuario
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item cursor" @click="cerrarSesion()"
                  >Cerrar Sesión</a
                >
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    cerrarSesion() {
      localStorage.clear("token");
      this.$router.push({ path: "/" });
    },
  },
};
</script>

<style>
/* Estilos para el navbar */
.navbar {
  background-color: #1687a7;
}

.navbar-brand {
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
}

.navbar-brand > b {
  color: #1687a7;
  margin: 20px;
}

.nav-link {
  color: rgb(255, 255, 255) !important;
}

/* Abrir drop al detectar hover */
.navbar .nav-item:hover .dropdown-menu {
  display: block;
}
/* Evitar margen entre nav y drop para que al deslizar mouse despacio no se cierre */
.navbar .nav-item .dropdown-menu {
  margin-top: 0;
}
</style>