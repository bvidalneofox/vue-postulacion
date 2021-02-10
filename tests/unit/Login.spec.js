import { mount } from '@vue/test-utils'
import Login from '@/pages/public/Login.vue'

describe('Login.vue', () => {

  it('Comprueba que se muestre el texto para el registro', () => {
    const wrapper = mount(Login)
    expect(wrapper.find('.link-modal').text()).toEqual("Registrate aquí")
  })

  it('Comprueba que el texto del boton Iniciar Sesión cambie a Cargando al hacer click', async () => {
    const wrapper = mount(Login)

    expect(wrapper.find(".button-login").text()).toBe('Iniciar Sesión');

    await wrapper.find("#form-login").trigger("submit.prevent")

    expect(wrapper.find(".button-login").text()).toBe('Cargando');

  })

})
