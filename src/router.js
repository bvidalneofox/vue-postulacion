import Vue from 'vue'
import Router from 'vue-router'
import Login from './pages/public/Login.vue'
import Home from './pages/private/Home.vue'
import MovieDetail from "./pages/private/MovieDetail.vue";

Vue.use(Router)

export default new Router({

    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/home',
            name: 'Home',
            component: Home,
            beforeEnter: guardMyroute
        },
        {
            path: '/movieDetail/:id',
            name: 'MovieDetail',
            component: MovieDetail,
            beforeEnter: guardMyroute
        }
    ]

});

function guardMyroute(to, from, next) {
    var isAuthenticated = false;
    //this is just an example. You will have to find a better or 
    // centralised way to handle you localstorage data handling 
    if (localStorage.getItem('token'))
        isAuthenticated = true;
    else
        isAuthenticated = false;
    if (isAuthenticated) {
        next(); // allow to enter route
    }
    else {
        next('/'); // go to '/login';
    }
}