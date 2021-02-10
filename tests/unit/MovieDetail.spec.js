import { shallowMount, createLocalVue } from '@vue/test-utils'
import MovieDetail from '@/pages/private/MovieDetail.vue'
import Vue from "vue";
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(VueRouter)
const router = new VueRouter()

describe('MovieDetail.vue', () => {

    Vue.filter('detectImage', () => 'foo')


    it('Comprobar que exista el boton de volver a home y su texto sea Volver', () => {

        jest.spyOn(MovieDetail.methods, 'getMovieById')

        const wrapper = shallowMount(MovieDetail, {
            localVue,
            router
        })


        expect(wrapper.find(".btn-volver").text()).toBe('Volver');

        expect(wrapper.find('.btn-volver').exists()).toBe(true)

    })

})