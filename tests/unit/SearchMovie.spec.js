import { shallowMount } from '@vue/test-utils'
import SearchMovie from '@/components/private/SearchMovie.vue'

describe('SearchMovie.vue', () => {


    it('Comprobar que de inicio no se muestra el mensaje de pelicula no encontrada', () => {
        const wrapper = shallowMount(SearchMovie, {
            mocks: {
                paginated: () => null
            },
            stubs: ['paginate']
        })

        expect(wrapper.find(".alert").isVisible()).toBe(false)
    })

})