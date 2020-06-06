import CadastroReservas from '../views/CadastroReservas'
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';
import React from 'react';
import { reservaValida } from './MockObjects'

configure({adapter: new Adapter()});

test('Deve instanciar a Page Cadastro Reserva',() => {
    let cadastroReservas = new CadastroReservas();
    expect(cadastroReservas).toBeDefined();
})

test('Deve cadastrar uma nova reserva', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    wrapper.instance().cadastrarReserva()
})

test('Deve validar uma reserva', async () => {
    const wrapper = shallow(<CadastroReservas/>);
    let instance = wrapper.instance()

    instance.state.reserva = reservaValida
    instance.validarReserva()
    expect(instance.validarReserva()).toBe(true);
})



