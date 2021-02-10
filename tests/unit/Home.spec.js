import { shallowMount } from '@vue/test-utils'
import Home from '@/pages/private/Home.vue'

describe('Home.vue', () => {

    it('Comprueba que se muestre el componente hijo Navbar en pantalla', () => {
      const wrapper = shallowMount(Home)
      
      expect(wrapper.findComponent({ name: "Navbar" }).exists()).toBe(true)
    })
  
  })