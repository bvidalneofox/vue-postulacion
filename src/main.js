import Vue from 'vue'
import App from './App.vue'
// Importacion paquete para paginacion
import VuePaginate from 'vue-paginate'
// Importacion para usar rutas
import router from './router'

Vue.config.productionTip = false;
Vue.use(VuePaginate)

// Pipe para detectar si en la peticion viene una imagen (se usa require para que al compilar no retorne como string el path)
Vue.filter('detectImage', function (value) {
  if(value === 'N/A'){
    return require("@/assets/no-image.png");
  }else{
    return value;
  }
})

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app')
